/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
				aboutmecolor: 'rgb(var(--color-aboutmecolor) / <alpha-value>)',
				curriculumcolor: 'rgb(var(--color-curriculumcolor) / <alpha-value>)',
				discordcolor: 'rgb(var(--color-discordcolor) / <alpha-value>)',
				tecnocolor: 'rgb(var(--color-tecnocolor) / <alpha-value>)',
				changecolor: 'rgb(var(--color-changecolor) / <alpha-value>)',
				hourcolor: 'rgb(var(--color-hourcolor) / <alpha-value>)',
				contact: 'rgb(var(--color-contact) / <alpha-value>)',
				buttoncontact:'rgb(var(--color-buttoncontact) / <alpha-value>)',

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
