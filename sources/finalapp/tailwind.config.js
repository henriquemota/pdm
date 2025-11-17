/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: '#2E7D32',
				secondary: '#66BB6A',
				background: '#E8F5E9',
				gray: {
					custom: '#9E9E9E',
				},
				black: {
					custom: '#212121',
				},
			},
			fontFamily: {
				poppins: ['Poppins'],
			},
		},
	},
	plugins: [],
}
