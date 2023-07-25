module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: [
		// ...
		'lit',
	],
	extends: [
		'eslint:recommended',
		'plugin:lit/recommended',
		"prettier",
		'plugin:vue/vue3-recommended',
		"plugin:vue/vue3-essential",
		'standard',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// ...
		'lit/no-legacy-template-syntax': 'error',
		'lit/no-template-arrow': 'warn',
	},
};
