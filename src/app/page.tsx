import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'
import { SendTransactionPrepared } from '../components/SendTransactionPrepared'

export function Page() {
  return (
    <>
      <h1>wagmi + RainbowKit + Next.js</h1>

      <ConnectButton />

      <Connected>
        <h2>Send Transaction (Prepared)</h2>
        <SendTransactionPrepared />
      </Connected>
    </>
  )
}

export default Page
