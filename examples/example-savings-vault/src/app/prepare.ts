import { ethers } from 'ethers';
import {
	Account,
	HarvestingJob,
	SavingsVault,
	SavingsVaultRouter,
} from '@phuture/sdk';
import 'dotenv/config';
import { getEnv } from './utils';

const prepare = async () => {
	const account = new Account(
		new ethers.Wallet(
			getEnv('PRIVATE_KEY'),
			new ethers.providers.JsonRpcProvider(getEnv('NODE_URL'))
		)
	);

	const savingsVault = new SavingsVault(
		account,
		getEnv('SAVINGS_VAULT_ADDRESS')
	);

	const savingsVaultRouter = new SavingsVaultRouter();

	const harvestingJob = new HarvestingJob(
		account,
		getEnv('PHUTURE_JOB_ADDRESS')
	);

	return { account, savingsVault, savingsVaultRouter, harvestingJob };
};

export default prepare;
