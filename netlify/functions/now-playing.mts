// GET /api/now-playing
// Devuelve lo que suena ahora en Spotify o, si no suena nada, la última canción escuchada.
// Variables de entorno (Netlify → Site configuration → Environment variables):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// El refresh token se obtiene una vez con `npm run spotify:auth`.

interface Track {
	isPlaying: boolean;
	title: string;
	artist: string;
	album: string;
	image: string | null;
	url: string;
	progressMs: number;
	durationMs: number;
	playedAt: string | null;
}

const json = (body: unknown, status = 200, cacheSeconds = 0) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
			// La CDN de Netlify guarda la respuesta unos segundos para no gastar la cuota de Spotify
			'Netlify-CDN-Cache-Control': cacheSeconds ? `public, s-maxage=${cacheSeconds}` : 'no-store',
		},
	});

async function accessToken(): Promise<string> {
	const id = Netlify.env.get('SPOTIFY_CLIENT_ID');
	const secret = Netlify.env.get('SPOTIFY_CLIENT_SECRET');
	const refresh = Netlify.env.get('SPOTIFY_REFRESH_TOKEN');
	if (!id || !secret || !refresh) throw new Error('Faltan variables de entorno de Spotify');

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
	});
	if (!res.ok) throw new Error(`Spotify token: ${res.status}`);
	return (await res.json()).access_token;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toTrack(item: any, extra: Partial<Track>): Track {
	return {
		isPlaying: false,
		title: item.name,
		artist: item.artists.map((a: { name: string }) => a.name).join(', '),
		album: item.album?.name ?? '',
		image: item.album?.images?.[1]?.url ?? item.album?.images?.[0]?.url ?? null,
		url: item.external_urls?.spotify ?? '',
		progressMs: 0,
		durationMs: item.duration_ms ?? 0,
		playedAt: null,
		...extra,
	};
}

export default async () => {
	try {
		const token = await accessToken();
		const auth = { headers: { Authorization: `Bearer ${token}` } };

		const now = await fetch('https://api.spotify.com/v1/me/player/currently-playing', auth);
		if (now.status === 200) {
			const data = await now.json();
			if (data?.item && data.currently_playing_type === 'track') {
				return json(toTrack(data.item, { isPlaying: data.is_playing, progressMs: data.progress_ms ?? 0 }), 200, 10);
			}
		}

		const recent = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', auth);
		if (recent.ok) {
			const last = (await recent.json()).items?.[0];
			if (last?.track) return json(toTrack(last.track, { playedAt: last.played_at }), 200, 60);
		}
		return json({ error: 'Sin canciones recientes' }, 404);
	} catch (err) {
		console.error(err);
		return json({ error: 'No se pudo consultar Spotify' }, 502);
	}
};

export const config = { path: '/api/now-playing' };
