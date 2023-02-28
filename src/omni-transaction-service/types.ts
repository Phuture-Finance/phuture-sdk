import { Message } from '@layerzerolabs/scan-client'

export interface MessageProps {
  hash: string
  chainId: number
  status: 'INFLIGHT' | 'DELIVERED' | 'FAILED'
}

export interface TxStatusProps {
  homeToRemote: MessageProps[]
  remoteToHome: MessageProps[]
}

export interface RemoteApiResponse {
  message: string
  result: { status: string }
  status: string
}

export interface RequiredDstMessage extends Omit<Message, 'dstTxHash'> {
  dstTxHash: string
}
