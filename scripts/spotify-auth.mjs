// Obtiene el refresh token de Spotify (se hace una sola vez).
//
// 1. Crea una app en https://developer.spotify.com/dashboard
//    - Redirect URI: http://127.0.0.1:8888/callback
//    - API: Web API
// 2. Corre:
//      SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy npm run spotify:auth
// 3. Abre el link que aparece, acepta, y copia el refresh token que se imprime
//    a las variables de entorno de Netlify. No lo subas al repositorio.

import http from 'node:http';
import { randomBytes } from 'node:crypto';

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
	console.error('Falta SPOTIFY_CLIENT_ID o SPOTIFY_CLIENT_SECRET.\n');
	console.error('Uso: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy npm run spotify:auth');
	process.exit(1);
}

const PORT = 8888;
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played';
const state = randomBytes(12).toString('hex');

const authUrl =
	'https://accounts.spotify.com/authorize?' +
	new URLSearchParams({ client_id: id, response_type: 'code', redirect_uri: REDIRECT, scope: SCOPES, state });

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url, REDIRECT);
	if (url.pathname !== '/callback') return res.writeHead(404).end();

	const code = url.searchParams.get('code');
	if (!code || url.searchParams.get('state') !== state) {
		res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Autorización cancelada o inválida.');
		console.error('\nAutorización cancelada o inválida.');
		return server.close();
	}

	const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT }),
	});
	const data = await tokenRes.json();

	if (!tokenRes.ok || !data.refresh_token) {
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No se pudo obtener el token. Mira la terminal.');
		console.error('\nError de Spotify:', data);
	} else {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('¡Listo! Vuelve a la terminal.');
		console.log('\n✅ Tu SPOTIFY_REFRESH_TOKEN es:\n');
		console.log(data.refresh_token);
		console.log('\nGuárdalo en Netlify → Site configuration → Environment variables.');
	}
	server.close();
});

server.listen(PORT, '127.0.0.1', () => {
	console.log('Abre este link en tu navegador e inicia sesión en Spotify:\n');
	console.log(authUrl + '\n');
});
