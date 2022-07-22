import type {NextPage} from 'next'
import * as React from "react";
import {usePhuture} from "@phuture/sdk";
import {useEffect} from "react";

const Home: NextPage = () => {
	const [address, setAddress] = React.useState('');
	const {account} = usePhuture()

	useEffect(() => {
		const getAddress = async () => account && setAddress(await account.address())

		if(!address)
			getAddress().catch(console.error)
	}, [account])

	return (
		<div className="bg-gray-50 dark:bg-[#003] p-6 rounded-xl shadow-2xl max-w-screen-sm w-96">
			{address && `hello, ${address}`}
			{/*<h2 className="text-lg font-medium">*/}
			{/*	{indexName}*/}
			{/*</h2>*/}

			{/*<input type="number" placeholder="burn amount" onChange={async ({target}) => {*/}
			{/*	Number(target.value) > 0 && index && indexRouter && setBurnAmount(await indexRouter.burnAmount(index.address, BigNumber.from(target.value).mul(BigNumber.from(10).pow(await index.decimals()))))*/}
			{/*}}/>*/}

			{/*{burnAmounts && <ul>*/}
			{/*	{*/}
			{/*		burnAmounts.map((amount) => {*/}
			{/*			return <li>{amount.div(BigNumber.from(10).pow(18)).toString()}</li>*/}
			{/*		})*/}
			{/*	}*/}
			{/*			</ul>}*/}
		</div>
	)
}

export default Home
