/* ═══ VERIFICA · lógica ═══ */

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g,
  c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

const VEREDICTOS = ["mito", "dato", "depende"];

let filtro = "Todas", busqueda = "", abierta = -1;
let vistas = cargar("verifica_vistas", []);     // índices de fichas ya reveladas
let aciertos = cargar("verifica_aciertos", []); // índices donde el veredicto se acertó

function cargar(clave, porDefecto) {
  try { return JSON.parse(localStorage.getItem(clave)) || porDefecto; }
  catch (e) { return porDefecto; }
}
function guardar(clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { }
}

/* ─── Cifras de la portada ─── */
function cifras() {
  const cuenta = v => FICHAS.filter(f => f.veredicto === v).length;
  document.getElementById("cTotal").textContent   = FICHAS.length;
  document.getElementById("cMito").textContent    = cuenta("mito");
  document.getElementById("cDato").textContent    = cuenta("dato");
  document.getElementById("cDepende").textContent = cuenta("depende");
}

/* ─── Barra de progreso ─── */
function progreso() {
  const pc = Math.round(vistas.length / FICHAS.length * 100);
  document.getElementById("riel").style.width = pc + "%";
  document.getElementById("cuenta").innerHTML =
    `<b>${vistas.length}</b> de ${FICHAS.length} fichas revisadas`;
  document.getElementById("tino").innerHTML = vistas.length
    ? `Veredictos acertados: <b>${aciertos.length} de ${vistas.length}</b>`
    : "Antes de abrir cada ficha, pon tu veredicto.";
}

/* ─── Filtros ─── */
function filtros() {
  const cats = ["Todas"].concat(FICHAS.map(f => f.categoria)
    .filter((c, i, a) => c && a.indexOf(c) === i));
  const extras = ["Por revisar"];
  document.getElementById("filtros").innerHTML =
    cats.concat(extras).map(c =>
      `<button class="f${c === filtro ? " on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`
    ).join("");
  [].forEach.call(document.querySelectorAll(".f"), b => {
    b.onclick = () => { filtro = b.dataset.c; filtros(); rejilla(); };
  });
}

/* ─── Rejilla ─── */
function visibles() {
  const t = busqueda.toLowerCase();
  return FICHAS.map((f, i) => ({ f, i })).filter(({ f, i }) => {
    if (filtro === "Por revisar" && vistas.indexOf(i) > -1) return false;
    if (filtro !== "Todas" && filtro !== "Por revisar" && f.categoria !== filtro) return false;
    return (f.afirmacion + " " + f.explicacion).toLowerCase().indexOf(t) > -1;
  });
}

function rejilla() {
  const v = visibles();
  document.getElementById("rejilla").innerHTML = v.length
    ? v.map(({ f, i }) => {
        const abierto = vistas.indexOf(i) > -1;
        const ok = aciertos.indexOf(i) > -1;
        return `<button class="ficha ${abierto ? "vista " + esc(f.veredicto) : ""}" data-i="${i}">
          ${abierto && ok ? '<span class="tic">✓</span>' : ""}
          <span class="texto">${esc(f.afirmacion)}</span>
          <span class="pie">
            <span class="cat">${esc(f.categoria)}</span>
            ${abierto
              ? `<span class="marca">${esc(f.veredicto)}</span>`
              : `<span class="incognita">?</span>`}
          </span>
        </button>`;
      }).join("")
    : `<p class="sinnada">No hay fichas que coincidan con esa búsqueda.</p>`;

  [].forEach.call(document.querySelectorAll(".ficha"), b => {
    b.onclick = () => abrir(parseInt(b.dataset.i, 10));
  });
}

/* ─── Ventana de ficha ─── */
function abrir(i) {
  abierta = i;
  const f = FICHAS[i];
  const yaVista = vistas.indexOf(i) > -1;

  document.getElementById("ventana").innerHTML = `
    <button class="cerrar" id="cerrar" aria-label="Cerrar">✕</button>
    <div class="etiqueta">${esc(f.categoria)}</div>
    <p class="frase">${esc(f.afirmacion)}</p>
    <div id="zona"></div>`;

  document.getElementById("telon").classList.add("abierto");
  document.getElementById("cerrar").onclick = cerrar;

  yaVista ? revelar(i, null) : apostar(i);
}

function apostar(i) {
  document.getElementById("zona").innerHTML = `
    <div class="apuesta">
      <p>¿Qué crees tú? Elige antes de ver la respuesta.</p>
      <div class="opciones">
        ${VEREDICTOS.map(v => `<button class="op" data-v="${v}">${v}</button>`).join("")}
      </div>
    </div>`;
  [].forEach.call(document.querySelectorAll(".op"), b => {
    b.onclick = () => {
      const elegido = b.dataset.v;
      if (vistas.indexOf(i) === -1) {
        vistas.push(i); guardar("verifica_vistas", vistas);
        if (elegido === FICHAS[i].veredicto && aciertos.indexOf(i) === -1) {
          aciertos.push(i); guardar("verifica_aciertos", aciertos);
        }
      }
      revelar(i, elegido);
      progreso(); rejilla();
    };
  });
}

function revelar(i, elegido) {
  const f = FICHAS[i];
  const bien = elegido === f.veredicto;
  const juicio = elegido === null ? ""
    : bien
      ? `<p class="juicio bien">Le achuntaste.</p>`
      : `<p class="juicio mal">Dijiste “${esc(elegido)}”. Mira por qué no.</p>`;

  const fuente = f.enlace
    ? `<a href="${esc(f.enlace)}" target="_blank" rel="noopener">${esc(f.fuente)}</a>`
    : esc(f.fuente);

  const pendientes = FICHAS.map((x, n) => n).filter(n => vistas.indexOf(n) === -1);

  document.getElementById("zona").innerHTML = `
    <div class="revelado">
      <div class="sello ${esc(f.veredicto)}">${esc(f.veredicto)}</div>
      ${juicio}
      <p class="detalle">${esc(f.explicacion)}</p>
      <p class="origen">Fuente: <b>${fuente}</b></p>
      <div class="navegar">
        <button id="volver">Volver a las fichas</button>
        <button class="principal" id="siguiente" ${pendientes.length ? "" : "disabled"}>
          ${pendientes.length ? "Siguiente sin revisar" : "Ya las revisaste todas"}
        </button>
      </div>
    </div>`;

  document.getElementById("volver").onclick = cerrar;
  const sig = document.getElementById("siguiente");
  if (pendientes.length) sig.onclick = () => abrir(pendientes[0]);
}

function cerrar() {
  document.getElementById("telon").classList.remove("abierto");
  abierta = -1;
}

/* ─── Eventos generales ─── */
document.getElementById("q").oninput = e => { busqueda = e.target.value; rejilla(); };

document.getElementById("telon").onclick = e => {
  if (e.target.id === "telon") cerrar();
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && abierta > -1) cerrar();
});

document.getElementById("reinicia").onclick = () => {
  vistas = []; aciertos = [];
  guardar("verifica_vistas", vistas); guardar("verifica_aciertos", aciertos);
  progreso(); rejilla();
};

cifras(); progreso(); filtros(); rejilla();
