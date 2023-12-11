/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
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

			}
		},
	},
	plugins: [],
}
