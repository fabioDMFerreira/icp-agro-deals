import { ReactHTMLElement, useEffect, useState } from 'react';
import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import { Deal } from 'declarations/icp_agro_deals_backend/icp_agro_deals_backend.did';
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
    icp_agro_deals_backend
      .createDeal(
        'Peru - Fresh Grapes',
        'Fresh Red Globe grapes from Peru',
        [{ description: '1', number: BigInt(100) }],
        BigInt(1000)
      )
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
        <button onClick={createDeal} className={"bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 px-20 rounded-md min-w-[250px] max-w-[300px]"}>
          Create Deal
        </button>
        <button onClick={refreshDeals} className={"bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 px-20 rounded-md min-w-[250px] max-w-[300px]"}>
          Refresh List
        </button>
      </div>
      

      <div className="container mx-auto px-4 m-10 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
          {deals &&
            deals.map((deal, index) => (                   
              <DealPreview key={index} code={deal.id.toString()} title={deal.name} price="2.3" description={deal.description} milestones={deal.milestones} currentMilestone={deal.status.toString()} nextMilestone={() => changeStatus(index, deal)} />
            ))}
        </div>
      </div>

    </main>
  );
}

export default App;
