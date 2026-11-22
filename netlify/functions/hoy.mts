// /api/hoy — notas diarias del calendario, guardadas en Netlify Blobs.
//
//   GET  /api/hoy?mes=2026-11          → { notas: { "2026-11-22": "texto", ... } }   (público)
//   POST /api/hoy  { fecha, texto }    → guarda la nota de ese día; texto vacío la borra
//        Header: Authorization: Bearer <HOY_CLAVE>
//
// Variable de entorno en Netlify: HOY_CLAVE (la clave para escribir desde /hoy).

import { getStore } from '@netlify/blobs';

type Notas = Record<string, string>;

const MAX_LARGO = 120;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const MES = /^\d{4}-\d{2}$/;

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
	});

const store = () => getStore({ name: 'calendario', consistency: 'strong' });

async function leerMes(mes: string): Promise<Notas> {
	return ((await store().get(mes, { type: 'json' })) as Notas | null) ?? {};
}

/** Compara la clave sin filtrar cuánto coincide por el tiempo de respuesta. */
function claveValida(recibida: string, esperada: string): boolean {
	const a = new TextEncoder().encode(recibida);
	const b = new TextEncoder().encode(esperada);
	let diff = a.length ^ b.length;
	for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
	return diff === 0;
}

export default async (req: Request) => {
	if (req.method === 'GET') {
		const mes = new URL(req.url).searchParams.get('mes') ?? '';
		if (!MES.test(mes)) return json({ error: 'Parámetro mes inválido (YYYY-MM)' }, 400);
		return json({ notas: await leerMes(mes) });
	}

	if (req.method === 'POST') {
		const esperada = Netlify.env.get('HOY_CLAVE');
		if (!esperada) return json({ error: 'Falta configurar HOY_CLAVE en Netlify' }, 500);
		const recibida = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
		if (!claveValida(recibida, esperada)) return json({ error: 'Clave incorrecta' }, 401);

		let body: { fecha?: unknown; texto?: unknown };
		try {
			body = await req.json();
		} catch {
			return json({ error: 'JSON inválido' }, 400);
		}
		const fecha = typeof body.fecha === 'string' ? body.fecha : '';
		const texto = typeof body.texto === 'string' ? body.texto.trim().replace(/\s+/g, ' ') : '';
		if (!FECHA.test(fecha)) return json({ error: 'Fecha inválida (YYYY-MM-DD)' }, 400);
		if (texto.length > MAX_LARGO) return json({ error: `Máximo ${MAX_LARGO} caracteres` }, 400);

		const mes = fecha.slice(0, 7);
		const notas = await leerMes(mes);
		if (texto) notas[fecha] = texto;
		else delete notas[fecha];
		await store().setJSON(mes, notas);
		return json({ ok: true, notas });
	}

	return json({ error: 'Método no permitido' }, 405);
};

export const config = { path: '/api/hoy' };
