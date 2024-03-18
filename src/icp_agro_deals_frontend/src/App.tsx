import { useEffect, useState } from 'react';
import {
  icp_agro_deals_backend,
  canisterId,
  createActor,
} from 'declarations/icp_agro_deals_backend';
import { canisterId as iiCanisterID } from 'declarations/internet_identity';
import {
  CreateDealDTO,
  Deal,
  _SERVICE,
} from 'declarations/icp_agro_deals_backend/icp_agro_deals_backend.did';
import DealPreview from './components/DealPreview';
import CreateDealModal from './components/CreateDealModal';
import Spinner from './components/Spinner';

import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

function App() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [actor, setActor] = useState(icp_agro_deals_backend);
  const [user, setUser] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const refreshDeals = async () => {
    actor.list(BigInt(0)).then((result: any) => {
      console.log(result);
      setDeals(result.ok);
    });
  };

  const handleCreateDeal = async (dealData: any) => {
    console.log('Deal created:', dealData);
    setIsLoading(true);
    const payload: CreateDealDTO = {
      destination: dealData.destination,
      features: [],
      duration: dealData.duration,
      origin: dealData.origin,
      risk: dealData.risk,
      productName: dealData.name,
      supplierMessage: dealData.supplierMessage,
      finalCall: dealData.finalCall,
      prices: [],
      profit: dealData.profit,
      contractAmount: dealData.contractAmount,
      price: dealData.price,
      productDescription: dealData.description,
      contractId: dealData.contractId,
      hsCode: dealData.hsCode,
      milestones: dealData.milestones,
    };

    await actor
      .createDeal(payload)
      .then((result: any) => {
        if (result.err) {
          throw new Error(
            result.err + '. Set your principal as canister owner or admin.'
          );
        }
        console.log('created deal', { result });
      })
      .catch((err: Error) => {
        alert(err);
      });

    await refreshDeals();
    setIsLoading(false);
    handleCloseModal();
  };

  const changeStatus = async (deal: Deal) => {
    setIsLoading(true);
    console.log(deal.id, +deal.status.toString() + 1);
    await actor.changeStatus(
      BigInt(deal.id),
      BigInt(+deal.status.toString() + 1)
    );

    await refreshDeals();
    setIsLoading(false);
  };

  // function createDeal() {
  //   const payload: CreateDealDTO = {
  //     destination: 'Lisbon, Portugal',
  //     features: [
  //       { description: 'Presentations:', values: ['8.2 Kg carton'] },
  //       { description: 'Sizes:', values: ['Sizes L - XL', 'Sizes L - J'] },
  //       { description: 'Variety:', values: ['Red Globe'] },
  //     ],
  //     duration: '4 weeks',
  //     origin: 'Callao, Peru',
  //     risk: 'A',
  //     productName: 'strawberries',
  //     supplierMessage: 'consignee: xxxx',
  //     finalCall: '03/11/2023',
  //     prices: [
  //       { description: 'Sizes L - J', price: '$2.30', unit: '/ Kg' },
  //       { description: 'Sizes XL - J', price: '$2.44', unit: '/ Kg' },
  //     ],
  //     profit: '20%',
  //     contractAmount: '$90000 USD',
  //     price: '2.3',
  //     productDescription: '',
  //     contractId: '27102023-00010',
  //     hsCode: '080610',
  //     milestones: [
  //       {
  //         description: 'Production',
  //         location: 'Callao, Peru',
  //         date: '27/10/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //       {
  //         description: 'Packing house',
  //         location: 'Callao, Peru',
  //         date: '28/10/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //       {
  //         description: 'Finished product',
  //         location: 'Callao, Peru',
  //         date: '29/10/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //       {
  //         description: 'Port of loading',
  //         location: 'Callao, Peru',
  //         date: '29/10/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //       {
  //         description: 'Transit',
  //         location: '',
  //         date: '30/10/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //       {
  //         description: 'Port of destination',
  //         location: 'Lisbon, Portugal',
  //         date: '15/11/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //       {
  //         description: 'Arrival',
  //         location: 'Lisbon, Portugal',
  //         date: '17/11/2023',
  //         unlockedFundsPercentage: BigInt('0'),
  //       },
  //     ],
  //   };

  //   icp_agro_deals_backend
  //     .createDeal(payload)
  //     .then(() => {
  //       console.log('deal created');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   return false;
  // }

  async function handleAuthenticated(authClient: AuthClient) {
    const identity = await authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const actor = createActor(canisterId, { agent });

    setActor(actor);
    setUser(identity.getPrincipal().toString());
  }

  useEffect(() => {
    refreshDeals();
  }, []);

  async function login() {
    const authClient = await AuthClient.create();

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: `http://${iiCanisterID}.localhost:4943/`,
        onSuccess: () => {
          resolve(1);
        },
      });
    });

    await handleAuthenticated(authClient);
  }

  return (
    <main>
      {isLoading && <Spinner />}
      <div></div>
      <div className="flex flex-col justify-center items-center pt-10 space-y-2 md:space-x-6">
        {user ? (
          <div className="flex space-x-1 items-center">
            <PersonIcon className="text-slate-800" style={{ fontSize: 20 }} />
            <p>{user}</p>
          </div>
        ) : (
          <button
            className={
              'flex items-center justify-center space-x-1 bg-slate-400 hover:bg-slate-700 text-white text-[18px] font-bold py-3 rounded-md min-w-[100px] max-w-[150px]'
            }
            onClick={login}
          >
            <p>Login</p>
            <ExitToAppIcon
              className="text-slate-100 cursor-pointer"
              style={{ fontSize: 20 }}
            />
          </button>
        )}
        <button
          onClick={handleOpenModal}
          className={
            'bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 px-20 rounded-md min-w-[250px] max-w-[300px]'
          }
        >
          Create Deal
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
                price={deal.price}
                description={deal.productDescription}
                milestones={deal.milestones}
                currentMilestone={deal.status.toString()}
                nextMilestone={() => changeStatus(deal)}
              />
            ))}
        </div>
      </div>
      <CreateDealModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateDeal={handleCreateDeal}
      />
    </main>
  );
}

export default App;
