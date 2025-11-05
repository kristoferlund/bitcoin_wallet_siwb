import ReceiveButton from './receive-button';
import SendButton from './send-button';
import { BtcLocalAddress } from './btc-local-address';
import { Balance } from './balance';
import Logout from './logout';
import { Bitcoin } from 'lucide-react';
import { BtcCanisterAddress } from './btc-canister-address';

export default function Wallet() {

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="rounded-full bg-primary p-1">
            <Bitcoin />
          </div>
          <h3>Wallet</h3>
        </div>
        <Logout />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <div className="text-muted-foreground">Canister controlled addresss:</div>
          <BtcCanisterAddress />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-muted-foreground">Connected wallet address:</div>
          <BtcLocalAddress />
        </div>
      </div>


      <Balance />
      <div className="flex gap-5">
        <ReceiveButton />
        <SendButton />
      </div>
    </section>
  );
}
