import { BaseLog } from '@prisma/client';
import { Interface } from 'ethers';

import SofamonWearablesV2ABI from 'contracts/sofamon/SofamonWearablesV2.abi.json';

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
              <li>
                {trader} - {isBuy ? 'BUY' : 'SELL'}
              </li>
            );
          } catch (error) {
            console.log(logEvent.data);
            return null;
          }
        })}
      </ul>
    </div>
  );
};
