// Contribuciones de GitHub del último año.
// Usa la API pública https://github-contributions-api.jogruber.de (sin token, con CORS),
// que lee el mismo calendario que muestra el perfil de GitHub.

export interface Day {
	date: string; // YYYY-MM-DD
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
	total: number;
	days: Day[];
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function usernameFrom(url: string): string {
	return new URL(url).pathname.split('/').filter(Boolean)[0] ?? '';
}

export async function fetchContributions(user: string, timeoutMs = 8000): Promise<Contributions | null> {
	try {
		const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`, {
			signal: AbortSignal.timeout(timeoutMs),
		});
		if (!res.ok) return null;
		const data = await res.json();
		const days: Day[] = data.contributions ?? [];
		if (!days.length) return null;
		return { total: data.total?.lastYear ?? days.reduce((n, d) => n + d.count, 0), days };
	} catch {
		return null;
	}
}

/** Celdas del mapa: columnas = semanas (domingo a sábado), como en GitHub. */
export function heatmapHtml(days: Day[]): string {
	if (!days.length) return '';
	const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
	const pad = '<i class="pad"></i>'.repeat(firstWeekday);
	const cells = days
		.map((d) => {
			const [y, m, dd] = d.date.split('-').map(Number);
			const n = d.count === 1 ? '1 contribución' : `${d.count} contribuciones`;
			return `<i class="level-${d.level}" title="${n} · ${dd} ${MESES[m - 1]} ${y}"></i>`;
		})
		.join('');
	return pad + cells;
}

export function totalLabel(total: number): string {
	return `${total.toLocaleString('es-CL')} en el último año`;
}
