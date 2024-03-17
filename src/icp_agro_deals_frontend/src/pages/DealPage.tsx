import DealCard from '../components/DealCard';
import DealFunding from '../components/DealFunding';
import DealLogs from '../components/DealLogs';
import { useParams } from 'react-router-dom';
import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import { Deal } from 'declarations/icp_agro_deals_backend/icp_agro_deals_backend.did';
import { useEffect, useState } from 'react';

const DealPage = () => {
  const [deal, setDeal] = useState<Deal>();
  const [isLoading, setIsLoading] = useState(true);
  const { dealId } = useParams();

  useEffect(() => {
    if (dealId)
      icp_agro_deals_backend.get(BigInt(dealId)).then((result: any) => {
        setDeal(result.ok[0]);
        setIsLoading(false);
      });
  }, []);

  const hsCode = deal?.hsCode || '';
  const productName = deal?.productName || '';
  const productDescription = deal?.productDescription || '';
  const price = deal?.price || '';
  const progressPercentage = 100;
  const finalCall = deal?.finalCall || '';
  const contractAmount = deal?.contractAmount || '';
  const contractId = deal?.contractId || '';
  const fundedAmount = deal?.contractAmount || '';
  const duration = deal?.duration || '';
  const profit = deal?.profit || '';
  const risk = deal?.risk || '';
  const supplierMessage = deal?.supplierMessage || '';
  const origin = deal?.origin || '';
  const destination = deal?.destination || '';

  const milestones = [
    {
      label: 'Production',
      location: 'Callao, Peru',
      date: '27/10/2023',
    },
    {
      label: 'Packing house',
      location: 'Callao, Peru',
      date: '28/10/2023',
    },
    {
      label: 'Finished product',
      location: 'Callao, Peru',
      date: '29/10/2023',
    },
    {
      label: 'Port of loading',
      location: 'Callao, Peru',
      date: '29/10/2023',
    },
    {
      label: 'Transit',
      date: '30/10/2023',
    },
    {
      label: 'Port of destination',
      location: 'Lisbon, Portugal',
      date: '15/11/2023',
    },
    {
      label: 'Arrival',
      location: 'Lisbon, Portugal',
      date: '17/11/2023',
    },
  ];

  const dealFeatures = [
    { label: 'Presentations:', values: ['8.2 Kg carton'] },
    { label: 'Sizes:', values: ['Sizes L - XL', 'Sizes L - J'] },
    { label: 'Variety:', values: ['Red Globe'] },
  ];

  const dealPrices = [
    { label: 'Sizes L - J', price: '$2.30', unit: '/ Kg' },
    { label: 'Sizes XL - J', price: '$2.44', unit: '/ Kg' },
  ];

  return (
    <main className="max-container padding-container flex flex-col items-center">
      <div className="relative z-20 flex flex-1 space-x-10 pt-6">
        {!isLoading && (
          <>
            <>
              <DealCard
                code={hsCode}
                title={productName}
                price={price}
                description={productDescription}
                features={dealFeatures}
                prices={dealPrices}
              />
              <DealFunding
                progressPercentage={progressPercentage}
                finalCall={finalCall}
                contractAmount={contractAmount}
                contractId={contractId}
                fundedAmount={fundedAmount}
                duration={duration}
                profit={profit}
                risk={risk}
                supplierMessage={supplierMessage}
                productName={productName}
                origin={origin}
                destination={destination}
                milestones={milestones}
              />
            </>
            <>
              <DealLogs dealId={dealId} />
            </>
          </>
        )}
      </div>
    </main>
  );
};

export default DealPage;
