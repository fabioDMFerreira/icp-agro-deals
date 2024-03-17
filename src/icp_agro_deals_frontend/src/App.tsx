import { ReactHTMLElement, useEffect, useState } from 'react';
import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import {
  CreateDealDTO,
  Deal,
} from 'declarations/icp_agro_deals_backend/icp_agro_deals_backend.did';
import DealPreview from './components/DealPreview';

function App() {
  const [deals, setDeals] = useState<Deal[]>([]);

  const refreshDeals = () => {
    icp_agro_deals_backend.list(BigInt(0)).then((result: any) => {
      setDeals(result.ok);
    });
  };

  const changeStatus = (index: number, deal: Deal) => {
    icp_agro_deals_backend
      .changeStatus(BigInt(index), BigInt(+deal.status.toString() + 1))
      .then((result: any) => {
        setDeals(result.ok);
      });
  };

  function createDeal() {
    const payload: CreateDealDTO = {
      destination: 'Lisbon, Portugal',
      features: [
        { description: 'Presentations:', values: ['8.2 Kg carton'] },
        { description: 'Sizes:', values: ['Sizes L - XL', 'Sizes L - J'] },
        { description: 'Variety:', values: ['Red Globe'] },
      ],
      duration: '4 weeks',
      origin: 'Callao, Peru',
      risk: 'A',
      productName: 'strawberries',
      supplierMessage: 'consignee: xxxx',
      finalCall: '03/11/2023',
      prices: [
        { description: 'Sizes L - J', price: '$2.30', unit: '/ Kg' },
        { description: 'Sizes XL - J', price: '$2.44', unit: '/ Kg' },
      ],
      profit: '20%',
      contractAmount: '$90000 USD',
      price: '2.3',
      productDescription: '',
      contractId: '27102023-00010',
      hsCode: '080610',
      milestones: [
        {
          description: 'Production',
          location: 'Callao, Peru',
          date: '27/10/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
        {
          description: 'Packing house',
          location: 'Callao, Peru',
          date: '28/10/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
        {
          description: 'Finished product',
          location: 'Callao, Peru',
          date: '29/10/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
        {
          description: 'Port of loading',
          location: 'Callao, Peru',
          date: '29/10/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
        {
          description: 'Transit',
          location: '',
          date: '30/10/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
        {
          description: 'Port of destination',
          location: 'Lisbon, Portugal',
          date: '15/11/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
        {
          description: 'Arrival',
          location: 'Lisbon, Portugal',
          date: '17/11/2023',
          unlockedFundsPercentage: BigInt('0'),
        },
      ],
    };

    icp_agro_deals_backend
      .createDeal(payload)
      .then(() => {
        console.log('deal created');
      })
      .catch((err) => {
        console.error(err);
      });
    return false;
  }

  useEffect(() => {
    refreshDeals();
  }, []);

  return (
    <main>
      <div className="flex flex-col md:flex-row justify-center items-center pt-10 space-y-2 md:space-y-0 md:space-x-6">
        <button
          onClick={createDeal}
          className={
            'bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 px-20 rounded-md min-w-[250px] max-w-[300px]'
          }
        >
          Create Deal
        </button>
        <button
          onClick={refreshDeals}
          className={
            'bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 px-20 rounded-md min-w-[250px] max-w-[300px]'
          }
        >
          Refresh List
        </button>
      </div>

      <div className="container mx-auto px-4 m-10 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
          {deals &&
            deals.map((deal, index) => (
              <DealPreview
                key={index}
                code={deal.id.toString()}
                title={deal.productName}
                price="2.3"
                description={deal.productDescription}
                milestones={deal.milestones}
                currentMilestone={deal.status.toString()}
                nextMilestone={() => changeStatus(index, deal)}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
