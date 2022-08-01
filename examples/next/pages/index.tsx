import * as React from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import styled from 'styled-components';
import { Account } from '@phuture/account';
import { BigNumber, ContractTransaction, utils } from 'ethers';
import { ZeroExAggregator } from '@phuture/0x-aggregator';
import { IndexRouter } from '@phuture/index-router';
import { Index } from '@phuture/index';
import { AutoRouter } from '@phuture/auto-router';
import { Erc20 } from '@phuture/erc-20';
import { signERC2612Permit } from 'eth-permit';
import { constants } from 'ethers';

function useIsMounted() {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	return mounted;
}

const Connect = styled.div`
	position: fixed;
	top: 16px;
	right: 16px;
`;

const Input = styled.input`
	display: block;
	width: 256px;
	height: 32px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin: 16px;
	padding: 4px 8px;
	box-sizing: border-box;
`;

const Select = styled.select`
	display: block;
	width: 256px;
	height: 32px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin: 16px;
	padding: 4px 8px;
	box-sizing: border-box;
`;

const Button = styled.button`
	display: block;
	width: 256px;
	height: 32px;
	background-color: darkblue;
	margin: 16px;
	border-radius: 4px;
	color: white;
	padding: 4px 8px;
`;

function Page() {
	const [selectedToken, setSelectedToken] = React.useState<string>('ETH');
	const [inputValue, setInputValue] = React.useState('');
	const [tx, setTx] = React.useState<string | ContractTransaction>();

	const { chain } = useNetwork();
	const isMounted = useIsMounted();
	const { connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();

	const zeroEx = new ZeroExAggregator();

	const handleMint = async () => {
		if (!isConnected) return;

		const account = new Account(await connector.getSigner());

		const indexRouter = new IndexRouter(account);

		const autoRouter = new AutoRouter(indexRouter, zeroEx);

		if (selectedToken === 'USDC') {
			const usdc = new Erc20(
				account,
				'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
			);

			const value = BigNumber.from(
				utils.parseUnits(inputValue, await usdc.decimals())
			);

			const permit = await signERC2612Permit(
				window.ethereum,
				usdc.address,
				await account.address(),
				indexRouter.address,
				value.toString()
			);

			setTx(
				await autoRouter.autoBuy(
					new Index(account, '0x632806bf5c8f062932dd121244c9fbe7becb8b48'),
					value,
					usdc,
					{
						deadline: permit.deadline,
						r: permit.r,
						s: permit.s,
						v: permit.v,
					}
				)
			);
		} else if (selectedToken === 'ETH')
			setTx(
				await autoRouter.autoBuy(
					new Index(account, '0x632806bf5c8f062932dd121244c9fbe7becb8b48'),
					BigNumber.from(utils.parseEther(inputValue))
				)
			);
	};

	return (
		<div>
			<Connect>
				<div>
					{isConnected && (
						<button onClick={() => disconnect()}>
							Disconnect from {connector?.name} on {chain?.name}
						</button>
					)}

					{connectors
						.filter((x) => isMounted && x.ready && x.id !== connector?.id)
						.map((x) => (
							<button key={x.id} onClick={() => connect({ connector: x })}>
								{x.name}
								{isLoading && x.id === pendingConnector?.id && ' (connecting)'}
							</button>
						))}
				</div>

				{error && <div>{error.message}</div>}
			</Connect>
			<Input
				type="number"
				inputMode="decimal"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<Select
				value={selectedToken}
				onChange={(e) => setSelectedToken(e.target.value)}
			>
				<option value={'ETH'}>ETH</option>
				<option value={'USDC'}>USDC</option>
			</Select>
			<Button onClick={handleMint}>Mint</Button>

			{tx && <div>{tx.toString()}</div>}
		</div>
	);
}

export default Page;
