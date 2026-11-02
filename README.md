# Verifica · NutriLab

Archivo interactivo de fichas de verificación sobre alimentación.
Estático: solo HTML, CSS y JavaScript.

```
index.html
css/estilos.css
js/fichas.js      ← el banco de fichas (esto es lo que se edita)
js/app.js         ← la lógica
assets/logo-ua.svg
```

## Publicar

Sube todo al repositorio respetando las carpetas y activa
**Settings → Pages → Branch: main / root**.

## Cómo funciona

Las fichas parten tapadas, con un signo de interrogación. Al abrir una, lo primero
que aparece no es la respuesta sino la pregunta "¿qué crees tú?": el visitante elige
mito, dato o depende y recién entonces se estampa el veredicto con la explicación
y la fuente.

Cada ficha revisada suma a la barra de progreso y queda marcada con su color.
Las acertadas llevan un visto verde. El avance se guarda en el navegador de cada
persona, no en un servidor, y el botón "Empezar de nuevo" lo borra.

El filtro **Por revisar** deja a la vista solo las que faltan, y el botón
"Siguiente sin revisar" permite recorrerlas todas de corrido.

## Editar las fichas

Todo está en `js/fichas.js`. Copia un bloque y cámbialo:

```js
{
  afirmacion: "¿...?",
  veredicto: "mito",          // mito, dato o depende
  explicacion: "...",
  fuente: "MINSAL, Guías Alimentarias",
  enlace: "",                 // opcional
  categoria: "Mitos y creencias"
}
```

Las categorías se generan solas a partir de lo que escribas: si inventas una nueva,
aparece como filtro sin tocar nada más. Lo mismo con las cifras de la portada.

## Una recomendación

Con 9 fichas la colección se recorre en pocos minutos. Si el grupo alcanza a sumar
unas pocas más antes de la presentación, conviene priorizar las categorías que hoy
están vacías —redes sociales, imagen corporal, alimentación escolar— porque hacen
que los filtros tengan sentido y muestran que el taller cubrió todos sus temas.
