import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import { LogEntry } from 'declarations/icp_agro_deals_backend/icp_agro_deals_backend.did';
import { useEffect, useState } from 'react';

type Props = {
  dealId?: string;
};

const DealFunding = ({ dealId }: Props) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (!dealId) {
      return;
    }

    icp_agro_deals_backend.listLogs(BigInt(dealId)).then((result: any) => {
      if (result.ok) {
        setLogs(result.ok);
      }
    });
  }, [dealId]);

  return (
    <div className="lg:min-w-[800px] rounded-md shadow-lg p-4 bg-zinc-50 border">
      <p className="text-[25px] font-bold mb-3">Timeline</p>
      {logs.length &&
        logs.map((logEntry) => {
          const dateTimestamp = +logEntry.timestamp.toString();
          const date = new Date(dateTimestamp / 1000000);
          console.log(dateTimestamp);
          console.log(date);

          return (
            <p className="text-[18px]">
              {date.toISOString()}: {logEntry.message}
            </p>
          );
        })}
    </div>
  );
};

export default DealFunding;
