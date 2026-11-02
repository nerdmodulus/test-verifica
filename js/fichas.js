/* ═══════════════════════════════════════════════════════════════════
   VERIFICA · Banco de fichas
   NutriLab · Universidad Autónoma de Chile + Liceo 7 de Providencia

   Para agregar una ficha, copia un bloque y cámbialo.
   "veredicto" es una de estas tres palabras: mito, dato o depende.
   "enlace" es opcional: si lo dejas vacío, la fuente aparece sin link.
   ═══════════════════════════════════════════════════════════════════ */

const FICHAS = [
{
  afirmacion: "¿Dejando de comer bajas de peso?",
  veredicto: "mito",
  explicacion: "El cuerpo necesita alimentos para funcionar correctamente. Dejando de comer no solo bajas de peso, sino que también pierdes masa muscular y nutrientes esenciales.",
  fuente: "BBC",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "¿La fruta engorda?",
  veredicto: "mito",
  explicacion: "El azúcar natural de la fruta entera no es igual al azúcar añadido de los procesados: la fruta también aporta fibra, vitaminas y minerales, y sacia.",
  fuente: "BBC",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "¿Tomar jugo de fruta tiene los mismos efectos que la fruta entera?",
  veredicto: "mito",
  explicacion: "Tomar jugo de fruta no tiene los mismos beneficios que comer la fruta entera. Los jugos, incluso los naturales y recién exprimidos, contienen azúcares libres que el organismo absorbe rápidamente, elevando la glucosa en la sangre. Además, se pierde gran parte de la fibra y algunos nutrientes de la pulpa y la piel, y su acidez puede dañar el esmalte dental.",
  fuente: "BBC",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "¿Los diabéticos pueden comer fruta?",
  veredicto: "dato",
  explicacion: "Las personas con diabetes sí pueden comer fruta, ya que aporta fibra, vitaminas y minerales. Deben controlar las porciones y distribuir su consumo durante el día, y preferir la fruta entera en lugar de los jugos.",
  fuente: "BBC",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "¿Los productos light son más saludables?",
  veredicto: "mito",
  explicacion: "Pueden tener menos sodio, grasas, azúcar o colesterol que la versión original, pero eso no los hace saludables por sí solos.",
  fuente: "Clínica Alemana",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "¿Es malo comer fruta por la noche?",
  veredicto: "mito",
  explicacion: "El horario de la ingesta de frutas no afecta ni determina directamente si aumentas de peso.",
  fuente: "OMS",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "¿Las vitaminas engordan?",
  veredicto: "mito",
  explicacion: "Las vitaminas no aportan calorías ni provocan aumento de peso. Las necesidades varían según cada persona y una alimentación equilibrada y variada suele cubrir los requerimientos sin necesidad de suplementos.",
  fuente: "Clínica Alemana",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "Comer de noche engorda",
  veredicto: "depende",
  explicacion: "Depende de cada organismo y de cómo el cuerpo procesa cada caloría en distintos momentos del día.",
  fuente: "National Geographic, ¿Aumentamos de peso si comemos antes de dormir?",
  enlace: "",
  categoria: "Mitos y creencias"
},
{
  afirmacion: "Ingerir grasas es igual de importante que ingerir otros macronutrientes",
  veredicto: "dato",
  explicacion: "Las grasas son igual de importantes que otros nutrientes para el cuerpo, ya que algunas son vitales para el correcto funcionamiento del organismo.",
  fuente: "Cleveland Clinic, ¿Qué son las grasas?",
  enlace: "",
  categoria: "Alimentación saludable"
}
];
