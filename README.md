<div align="center">
<img src="public/1F338.svg" height="50px"/> 
<h3>
Portafolio by valnhe
</h3>
<p>My personal website.</p>
</div>

<div align="center">
    <a href="https://valnhe.netlify.app" target="_blank">
        Preview
    </a>
    <span>&nbsp;♥&nbsp;</span>
    <a href="#-getting-started">
        Getting Started
    </a>
    <span>&nbsp;♥&nbsp;</span>
    <a href="#-commands">
        Commands
    </a>
</div>
<p></p>

## 🛠️ Stack

- [**Astro**](https://astro.build/) - The web framework for content-driven websites.

## ✏️ Editar el contenido

Todo el contenido vive en `src/data/`, no hace falta tocar componentes:

| Archivo | Qué contiene |
| :-- | :-- |
| `perfil.json` | Nombre, rol, texto de presentación, links (GitHub, LinkedIn, correo, CV), canción del reproductor, textos de la barra de estado y de la agenda secreta, SEO |
| `trayectoria.json` | Experiencia laboral, académica y educación (pestaña *trayectoria*). `puntos` y `chips` son opcionales |
| `herramientas.json` | Grupos de tecnologías/herramientas (pestaña *herramientas*) |
| `proyectos.json` | Proyectos (pestaña *proyectos*). `anio` y `tags` son opcionales |

En `perfil.intro`, `**texto**` se subraya en rosado y `__texto__` en azul.
El CV que se descarga está en `public/documents/CV_ValentinaCastillo.pdf`.

Las pestañas se pueden enlazar directo: `/#trayectoria`, `/#herramientas`, `/#proyectos`.

## 🎵 Vinilo conectado a Spotify

El vinilo muestra lo que suena en tu Spotify (o lo último que escuchaste) mediante la función
`netlify/functions/now-playing.mts`, publicada en `/api/now-playing`.
Si la función no responde, se muestra la canción de respaldo de `perfil.json` (`cancion`).

Configuración (una sola vez):

1. Crea una app en [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
   con la Redirect URI `http://127.0.0.1:8888/callback` y la API **Web API**.
2. Obtén tu refresh token:

   ```bash
   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy npm run spotify:auth
   ```

3. En Netlify → *Site configuration* → *Environment variables*, agrega
   `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` y `SPOTIFY_REFRESH_TOKEN`, y vuelve a desplegar.

Para probar la función en local usa `npx netlify dev` (con `npm run dev` se ve la canción de respaldo).

## 🚀 Getting Started

1. [Fork](https://github.com/valnhe/portfolio/fork) or clone this repository.

```bash
git clone https://github.com/valnhe/portfolio.git
```

2. Install the dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [**http://localhost:4321**](http://localhost:4321/) with your browser to see the result 🚀

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

