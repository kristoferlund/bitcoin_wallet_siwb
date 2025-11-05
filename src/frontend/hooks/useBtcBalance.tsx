import { useQuery } from '@tanstack/react-query';
import useHandleAgentError from './useHandleAgentError';
import { useBackendActor } from '@/main';
import { useSiwbIdentity } from 'ic-use-siwb-identity';

export default function useBtcBalance() {
  const { actor: backend } = useBackendActor();
  const { handleAgentError } = useHandleAgentError();
  const { identity } = useSiwbIdentity();
  const principal = identity?.getPrincipal();

  return useQuery({
    queryKey: ['balance', principal],
    queryFn: async () => {
      if (!principal) {
        throw new Error('Principal is required.');
      }

      try {
        const result = await backend?.get_balance([principal]);

        if (result === undefined) {
          throw new Error('Undefined balance returned.');
        }

        if ('Err' in result) {
          throw new Error(result.Err);
        }

        const balance = result.Ok;

        return balance;
      } catch (e) {
        handleAgentError(e);
        console.error(e);
        throw new Error('Invalid balance returned.');
      }
    },
    enabled: !!backend && !!principal,
  });
}
