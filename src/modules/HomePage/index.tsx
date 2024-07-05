import { BaseLog } from '@prisma/client';
import { Interface } from 'ethers';

import SofamonWearablesV2ABI from 'contracts/sofamon/SofamonWearablesV2.abi.json';

import { Link } from '../../common/components/Link';

export const HomePage = ({ baseLogs }: { baseLogs: Array<BaseLog> }) => {
  const SofamonWearables = new Interface(SofamonWearablesV2ABI);
  const TradeEvent = SofamonWearables.getEvent('Trade') ?? '';

  return (
    <div>
      <h3>Sofamon Events</h3>
      <ul>
        {baseLogs.map((logEvent) => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [trader, subject, isBuy] = SofamonWearables.decodeEventLog(TradeEvent, logEvent.data);

            return (
              <li key={logEvent.id}>
                <Link href={`https://basescan.org/tx/${logEvent.transaction_hash}`}>{trader}</Link>-{' '}
                {isBuy ? 'BUY' : 'SELL'}
              </li>
            );
          } catch (error) {
            return null;
          }
        })}
      </ul>
    </div>
  );
};
