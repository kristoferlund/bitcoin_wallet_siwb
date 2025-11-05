import { Copy } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { Button } from './ui/button';
import { useSiwbIdentity } from 'ic-use-siwb-identity';

export function BtcLocalAddress() {

  const { identityAddress } = useSiwbIdentity();

  if (!identityAddress) return null;

  return (
    <div className="flex gap-1 items-center">
      <a
        href={`https://mempool.space/address/${identityAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {identityAddress.slice(0, 5)}...{identityAddress.slice(-5)}
      </a>
      <Button
        variant="ghost"
        onClick={() => copyToClipboard(identityAddress)}
        size="icon"
      >
        <Copy className="inline-block h-4 w-4" />
      </Button>
    </div>
  );
}
