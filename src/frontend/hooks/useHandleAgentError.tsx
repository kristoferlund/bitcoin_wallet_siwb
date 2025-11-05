import { useSiwbIdentity } from "ic-use-siwb-identity";
import { toast } from "./use-toast";

export default function useHandleAgentError() {
  const { clear } = useSiwbIdentity();

  const handleAgentError = (e: unknown) => {
    if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string' && e.message.includes('delegation has expired')) {
      clear();
      toast({ title: "Login expired, please login again.", variant: 'destructive' });
    }
  }

  return { handleAgentError };
}
