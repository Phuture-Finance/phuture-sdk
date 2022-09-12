import prepare from "./prepare";
import * as yesno from "yesno";

export async function harvest() {
	const { savingsVault, harvestingJob } = await prepare();

	const canHarvest = await harvestingJob.contract.canHarvest(savingsVault.address);
	if (!canHarvest) {
		console.log('Timeout is not exceeded!');
	}
	const ok = await yesno({ question: 'Continue with harvesting?' });
	await harvestingJob.contract.harvest(savingsVault.address);

	return;
}
