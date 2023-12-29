/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
				primarycolor: 'rgb(var(--color-primarycolor) / <alpha-value>)',
				secondarycolor: 'rgb(var(--color-secondarycolor) / <alpha-value>)',
				ternarycolor: 'rgb(var(--color-ternarycolor) / <alpha-value>)'

			},
			gridTemplateColumns: {
					'projectos': 'repeat(auto-fit, minmax(min(300px,100%), 1fr))',
			},
			boxShadow: {
				outline: '0 0 0 2px #ECA4BC, 0 0 10px #ECA4BC',
				outlinedark: '0 0 0 2px #B3BBE4, 0 0 10px #B3BBE4',
			},
		},
	},
	plugins: [],
}
