module.exports = (api) => {
	api.cache(true)
	return {
		presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'@': './',
						'@/components': './components',
						'@/assets': './assets',
						'@/css': './css',
						'@/app': './app',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	}
}
