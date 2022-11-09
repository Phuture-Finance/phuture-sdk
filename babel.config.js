module.exports = {
	presets: ['@babel/preset-typescript'],
	overrides: [
		{
			include: ['packages/*'],
			presets: [['@babel/preset-env', { targets: 'defaults, not ie 11' }]]
		}
	]
};
