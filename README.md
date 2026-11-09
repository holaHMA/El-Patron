# El Patrón · Sitio web (React + Vite + Tailwind)

Wireframe navegable de 4 pantallas para **El Patrón**, enchiladas y tacos artesanales.

## Ver sin instalar nada
Abre `vista-rapida.html` con doble clic en tu navegador.

## Abrir y editar en Visual Studio Code
1. Instala **Node.js 20 o más nuevo**: https://nodejs.org
2. Descomprime el zip y abre la carpeta `el-patron` en VS Code (Archivo > Abrir carpeta).
3. Abre la terminal de VS Code (Ctrl + ñ o Ver > Terminal) y corre:
   ```bash
   npm install
   npm run dev
   ```
4. Abre la dirección que aparece (normalmente http://localhost:5173). Los cambios se ven al instante.

Para publicar: `npm run build` genera la carpeta `dist/` lista para subir a Netlify, Vercel o cualquier hosting.

## Dónde cambiar cada cosa
| Qué | Archivo |
| --- | --- |
| Platillos, descripciones y precios | `src/data.js` |
| Número de WhatsApp | `src/App.jsx` (constante `WA`) |
| Redes sociales | `src/App.jsx` (lista `SOCIAL`) |
| Colores y tipografías | `src/index.css` (bloque `@theme`) |
| Papel picado | `src/parts/PapelPicado.jsx` |
| Animaciones (banderitas, brasas) | `src/styles.css` |
| Anotaciones de wireframe | `src/parts/Zone.jsx` (o apágalas con el switch del navbar) |
| Componentes de interfaz (botones, inputs, diálogo) | `src/components/ui/` (shadcn/ui) |

## Imágenes y video
Los recuadros rayados son espacios para fotos. Para poner una foto real, guarda la imagen en `src/assets/`
y reemplaza el `<ImgSlot ... />` por `<img src={foto} className="aspect-[4/3] w-full rounded-md object-cover" />`
(con `import foto from "./assets/tu-foto.jpg"` arriba del archivo). Para el video, cambia el contenedor
de la sección de contacto por `<video src={video} controls className="aspect-video w-full rounded-lg" />`.

## Nota
El botón "Confirmar Pedido por WhatsApp" muestra una vista previa del mensaje. Para que abra WhatsApp de verdad,
en `confirm()` de `src/App.jsx` usa:
`window.open("https://wa.me/525512345678?text=" + encodeURIComponent(msg), "_blank")`

El número, redes y precios son de ejemplo: cámbialos por los reales.
