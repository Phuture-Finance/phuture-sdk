import * as yesno from 'yesno'
import prepare from './prepare'

export async function harvest() {
	const { savingsVault, harvestingJob } = await prepare()

	const canHarvest = await harvestingJob.contract.canHarvest(
		savingsVault.address,
	)
	if (!canHarvest) {
		console.log('Timeout is not exceeded!')
	}
	const ok = await yesno({ question: 'Continue with harvesting?' })
	if (ok) {
		const estimatedGas = await harvestingJob.contract.estimateGas.harvest(
			savingsVault.address,
		)
		await harvestingJob.contract.harvest(savingsVault.address, {
			gasLimit: estimatedGas,
		})
	}
	return
}
