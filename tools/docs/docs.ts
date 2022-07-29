import chalk from 'chalk';
import { execSync } from 'child_process';
import { removeSync } from 'fs-extra';
import { join } from 'path';

async function generate() {
	try {
		console.log(`${chalk.blue('i')} Generating Documentation`);

		const outputDirectory = join(__dirname, '../../docs/');
		removeSync(outputDirectory);

		// TODO: Generate documentation

		console.log(`\n${chalk.green('✓')} Generated Documentation\n`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

function checkDocumentation() {
	const output = execSync('git status --porcelain ./docs').toString('utf-8');

	if (output) {
		console.log(
			`${chalk.red(
				'!'
			)} 📄 Documentation has been modified, you need to commit the changes. ${chalk.red(
				'!'
			)} `
		);

		console.log('\nChanged Docs:');
		execSync('git status --porcelain ./docs', { stdio: 'inherit' });

		process.exit(1);
	} else {
		console.log('📄 Documentation not modified');
	}
}

generate().then(() => checkDocumentation());

function printInfo(
	str: string,
	newLine: boolean = true,
	newLineAfter: boolean = true
) {
	console.log(
		`${newLine ? '\n' : ''}${chalk.blue('i')} ${str}${newLineAfter ? '\n' : ''}`
	);
}
