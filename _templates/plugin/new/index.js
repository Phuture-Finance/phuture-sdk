module.exports = {
	prompt: ({prompter, args: {name}}) => prompter
		.prompt([{
			initial: true,
			type: 'confirm',
			name: 'withTest',
			message: `Generate a test file for the [${name}] package?`,
		}])
}
