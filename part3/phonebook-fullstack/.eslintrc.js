module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true
	},
	extends: [
		'plugin:react/recommended',
		'xo',
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: [
		'react',
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
	},
};
