/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secundary: 'rgb(var(--color-secundary) / <alpha-value>)',
				tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
				quaternary: 'rgb(var(--color-quaternary) / <alpha-value>)',
			}
		},
	},
	plugins: [],
}
