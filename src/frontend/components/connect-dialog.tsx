import { useEffect, useState } from 'react';
import { useSiwbIdentity } from 'ic-use-siwb-identity';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ConnectDialog() {
  const { prepareLogin, isPrepareLoginIdle, prepareLoginError, loginError, setWalletProvider, login, getAddress, connectedBtcAddress, identity } =
    useSiwbIdentity();

  const [loading, setLoading] = useState<boolean>(false);
  const [manually, setManually] = useState<boolean>(false);
  /**
   * Preload a Siwb message on every address change.
   */
  useEffect(() => {
    if (!isPrepareLoginIdle) return;
    const address = getAddress();
    if (address) {
      prepareLogin();
      if (connectedBtcAddress && !identity && manually) {
        (async () => {
          setLoading(true);
          const res = await login();
          setLoading(false);
          if (res) {
            setManually(false);
          }
        })();
      }
    }
  }, [prepareLogin, isPrepareLoginIdle, getAddress, login, connectedBtcAddress, identity, manually]);

  /**
   * Show an error toast if the prepareLogin() call fails.
   */
  useEffect(() => { }, [prepareLoginError]);

  /**
   * Show an error toast if the login call fails.
   */
  useEffect(() => { }, [loginError]);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full'>Sign in with Bitcoin</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select wallet</DialogTitle>
          </DialogHeader>
          <Button
            key="xverse"
            onClick={async () => {
              setManually(true);
              await setWalletProvider('BitcoinProvider');
            }}
            disabled={loading}
          >
            Xverse Wallet
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
