import axios, { type AxiosInstance } from "axios";

interface Fee {
  amount: string;
  token: string;
  type: "volume" | "gas";
}

interface Fees {
  integratorFee?: Fee | null;
  zeroExFee?: Fee | null;
  gasFee?: Fee | null;
}

interface AllowanceIssue {
  actual: string;
  spender: string;
}

interface BalanceIssue {
  token: string;
  actual: string;
  expected: string;
}

interface Issues {
  allowance?: AllowanceIssue | null;
  balance?: BalanceIssue | null;
  simulationIncomplete: boolean;
  invalidSourcesPassed: string[];
}

interface Fill {
  from: string;
  to: string;
  source: string;
  proportionBps: string;
}

interface Token {
  address: string;
  symbol: string;
}

interface Route {
  fills: Fill[];
  tokens: Token[];
}

interface TokenMetadata {
  buyTaxBps?: string | null;
  sellTaxBps?: string | null;
}

interface TokensMetadata {
  buyToken: TokenMetadata;
  sellToken: TokenMetadata;
}

interface EIP712TypeProperty {
  name: string;
  type: string;
}

interface EIP712Domain {
  name?: string;
  version?: string;
  chainId?: number;
  verifyingContract?: string;
  salt?: string;
}

interface EIP712Data {
  types: { [key: string]: EIP712TypeProperty[] };
  domain: EIP712Domain;
  message: { [key: string]: unknown };
  primaryType: string;
}

export interface Permit2 {
  type: "Permit2";
  hash: string;
  eip712: EIP712Data;
}

export interface Transaction {
  to: string;
  data: string;
  gas?: string | null;
  gasPrice: string;
  value: string;
}

interface ZeroExReponseData {
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: Fees;
  gas?: string | null;
  gasPrice: string;
  issues: Issues;
  liquidityAvailable: boolean;
  minBuyAmount: string;
  route: Route;
  sellAmount: string;
  sellToken: string;
  tokenMetadata: TokensMetadata;
  totalNetworkFee?: string | null;
  zid: string;
}

interface AllowanceHolderQuoteReponseData extends ZeroExReponseData {
  transaction: Transaction;
}

interface Permit2QuoteReponseData extends AllowanceHolderQuoteReponseData {
  permit2?: Permit2 | null;
}

export interface ZeroExRequest {
  chainId: number;
  buyToken: string;
  sellToken: string;
  sellAmount: string;
  taker?: string;
  txOrigin?: string;
  swapFeeRecipient?: string;
  swapFeeBps?: number;
  swapFeeToken?: string;
  tradeSurplusRecipient?: string;
  gasPrice?: string;
  slippageBps?: number;
  excludedSources?: string;
}

export class ZeroExAggregator2 {
  private client: AxiosInstance;

  constructor(apiUrl: string, apiKey: string) {
    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-Type": "application/json",
        "0x-version": "v2",
        ...{ "0x-api-key": apiKey },
      },
      validateStatus: (status) => status < 500,
    });
  }

  public permit2Price(params: ZeroExRequest): Promise<ZeroExReponseData> {
    return this.makeRequest<ZeroExReponseData>("swap/permit2/price", params);
  }

  public permit2Quote(params: ZeroExRequest): Promise<Permit2QuoteReponseData> {
    return this.makeRequest<Permit2QuoteReponseData>(
      "swap/permit2/quote",
      params
    );
  }

  public allowanceHolderPrice(
    params: ZeroExRequest
  ): Promise<ZeroExReponseData> {
    return this.makeRequest<ZeroExReponseData>(
      "swap/allowance-holder/price",
      params
    );
  }

  public allowanceHolderQuote(
    params: ZeroExRequest
  ): Promise<AllowanceHolderQuoteReponseData> {
    return this.makeRequest<AllowanceHolderQuoteReponseData>(
      "swap/allowance-holder/quote",
      params
    );
  }

  private async makeRequest<T>(
    endpoint: string,
    params: ZeroExRequest
  ): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint, { params });

      if (response.status >= 400) {
        throw new Error(
          `API request failed with status ${response.status}: ${response.data}`
        );
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `API request failed: ${error.response.status} ${error.response.data}`
          );
        } else if (error.request) {
          throw new Error("No response received from the API");
        } else {
          throw new Error(`Error setting up the request: ${error.message}`);
        }
      }
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}
