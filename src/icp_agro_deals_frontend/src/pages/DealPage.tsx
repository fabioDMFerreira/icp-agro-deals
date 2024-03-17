import DealCard from '../components/DealCard';
import DealFunding from '../components/DealFunding';
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


  const progressPercentage = Math.floor(Number(deal?.status)/7 * 100);

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
            <DealCard
              code={deal?.hsCode || ''}
              origin={deal?.origin || ''}
              title={deal?.productName || ''}
              price={deal?.price || ''}
              description={deal?.productDescription || ''}
              features={dealFeatures}
              prices={dealPrices}
            />
            <DealFunding
              dealId={dealId || ''}
              progressPercentage={progressPercentage}
              finalCall={deal?.finalCall || ''}
              contractAmount={deal?.contractAmount || ''}
              contractId={deal?.contractId || ''}
              fundedAmount={deal?.contractAmount || ''}
              duration={deal?.duration || ''}
              profit={deal?.profit || ''}
              risk={deal?.risk || ''}
              supplierMessage={deal?.supplierMessage || ''}
              productName={deal?.productName || ''}
              origin={origin}
              destination={deal?.destination || ''}
              currentMilestone={Number(deal?.status) || 0}
              milestones={deal?.milestones || []}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default DealPage;
