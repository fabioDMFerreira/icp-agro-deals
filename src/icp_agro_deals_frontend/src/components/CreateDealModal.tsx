import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import InputField from './InputField';
import InputMilestone from './InputMilestone';

interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDeal: (dealData: any) => void;
}

const CreateDealModal: React.FC<CreateDealModalProps> = ({
  isOpen,
  onClose,
  onCreateDeal,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('Fresh Grapes');
  const [description, setDescription] = useState('Fresh Grapes');
  const [price, setPrice] = useState('$2,45 / Kg');
  const [hsCode, setHsCode] = useState('495734');
  const [origin, setOrigin] = useState('Peru');
  const [destination, setDestination] = useState(
    'Port of Rotterdam, The Netherlands'
  );
  const [duration, setDuration] = useState('');
  const [risk, setRisk] = useState('B');
  const [supplierMessage, setSupplierMessage] = useState('');
  const [finalCall, setFinalCall] = useState('');
  const [profit, setProfit] = useState('10%');
  const [contractAmount, setContractAmount] = useState('$45,805.20');
  const [contractId, setContractId] = useState('');
  const [milestones, setMilestones] = useState([
    {
      description: 'Production fields',
      location: '',
      date: '2024-03-20',
      unlockedFundsPercentage: BigInt('0'),
    },
    {
      description: 'Packaging & Process',
      location: '',
      date: '2024-03-25',
      unlockedFundsPercentage: BigInt('0'),
    },
    {
      description: 'Finished product & Storage',
      location: '',
      date: '2024-03-30',
      unlockedFundsPercentage: BigInt('0'),
    },
    {
      description: 'Transport to Port of origin',
      location: '',
      date: '2024-04-05',
      unlockedFundsPercentage: BigInt('0'),
    },
    {
      description: 'Port of Origin',
      location: '',
      date: '2024-04-06',
      unlockedFundsPercentage: BigInt('0'),
    },
    {
      description: 'On transit',
      location: '',
      date: '2024-04-06',
      unlockedFundsPercentage: BigInt('0'),
    },
    {
      description: 'Port of Destination',
      location: '',
      date: '2024-04-08',
      unlockedFundsPercentage: BigInt('0'),
    },
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dealData = {
      name,
      description,
      price,
      hsCode,
      origin,
      destination,
      duration,
      risk,
      supplierMessage,
      finalCall,
      profit,
      contractAmount,
      contractId,
      milestones,
    };
    onCreateDeal(dealData);

    // Reset the form
    setName('');
    setDescription('');
    setPrice('');
    setHsCode('');
    setOrigin('');
    setDestination('');
    setDuration('');
    setRisk('');
    setSupplierMessage('');
    setFinalCall('');
    setProfit('');
    setContractAmount('');
    setContractId('');
    setMilestones([
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
      {
        description: '',
        location: '',
        date: '',
        unlockedFundsPercentage: BigInt('0'),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-h-full overflow-y-auto w-full max-w-xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold pb-8">Create a Deal</h2>
          <CloseIcon
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500 cursor-pointer"
            style={{ fontSize: 30 }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <InputField
              id="name"
              label="Product name"
              type="text"
              setter={setName}
              value={name}
            />
            <InputField
              id="description"
              label="Description"
              type="text"
              setter={setDescription}
              value={description}
            />
            <InputField
              id="hsCode"
              label="HS Code"
              type="text"
              setter={setHsCode}
              value={hsCode}
            />
            <InputField
              id="price"
              label="Price"
              type="number"
              setter={setPrice}
              value={price}
            />
            <InputField
              id="origin"
              label="Origin"
              type="text"
              setter={setOrigin}
              value={origin}
            />
            <InputField
              id="destination"
              label="Destination"
              type="text"
              setter={setDestination}
              value={destination}
            />
            <InputField
              id="duration"
              label="Duration"
              type="text"
              setter={setDuration}
              value={duration}
            />
            <InputField
              id="risk"
              label="Risk"
              type="text"
              setter={setRisk}
              value={risk}
            />
            <InputField
              id="supplierMessage"
              label="Supplier Message"
              type="text"
              setter={setSupplierMessage}
              value={supplierMessage}
            />
            <InputField
              id="finalCall"
              label="Final Call"
              type="text"
              setter={setFinalCall}
              value={finalCall}
            />
            <InputField
              id="profit"
              label="Profit"
              type="text"
              setter={setProfit}
              value={profit}
            />
            <InputField
              id="contractAmount"
              label="Contract Amount"
              type="text"
              setter={setContractAmount}
              value={contractAmount}
            />
            <InputField
              id="contractId"
              label="Contract Id"
              type="text"
              setter={setContractId}
              value={contractId}
            />

            <h2 className="text-xl font-bold py-3">Milestones</h2>
            {milestones.map((val, index) => (
              <InputMilestone
                key={index}
                index={index.toString()}
                setter={setMilestones}
                value={val}
              />
            ))}

            <div className="flex pt-10 lg:space-x-4 lg:space-y-0 space-y-4 justify-center items-center flex-col lg:flex-row xl:flex-row 2xl:flex-row">
              <button
                type="submit"
                className={
                  'bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 rounded-md min-w-[250px] max-w-[300px]'
                }
              >
                Create Deal
              </button>
              <button
                onClick={onClose}
                className={
                  'bg-red-400 hover:bg-red-700 text-white text-[18px] font-bold py-3 rounded-md min-w-[250px] max-w-[300px]'
                }
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDealModal;
