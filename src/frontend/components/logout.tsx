import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useSiwbIdentity } from 'ic-use-siwb-identity';

export default function Logout() {
  const { clear } = useSiwbIdentity();

  return (
    <Button variant="ghost" size="icon" onClick={clear}>
      <LogOut className="w-4 h-4" />
    </Button>
  );
}
