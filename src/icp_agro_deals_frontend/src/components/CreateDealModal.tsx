import React, {useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import InputField from './InputField';

interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDeal: (dealData: any) => void;
}

const CreateDealModal: React.FC<CreateDealModalProps> = ({ isOpen, onClose, onCreateDeal }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [hsCode, setHsCode] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [risk, setRisk] = useState('');
  const [supplierMessage, setSupplierMessage] = useState('');
  const [finalCall, setFinalCall] = useState('');
  const [profit, setProfit] = useState('');
  const [contractAmount, setContractAmount] = useState('');
  const [contractId, setContractId] = useState('');
  
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
      contractId
    };
    onCreateDeal(dealData);
    // Reset the form
    setDescription(''); 
    setPrice('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-h-full overflow-y-auto w-full max-w-xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold pb-8">Create a Deal</h2>
          <CloseIcon onClick={onClose} className="text-slate-400 hover:text-slate-500 cursor-pointer" style={{ fontSize: 30 }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <InputField id="name" label="Product name" type="text" setter={setName} />
            <InputField id="description" label="Description" type="text" setter={setDescription} />
            <InputField id="hsCode" label="HS Code" type="text" setter={setHsCode} />
            <InputField id="price" label="Price" type="number" setter={setPrice} />
            <InputField id="origin" label="Origin" type="text" setter={setOrigin} />
            <InputField id="destination" label="Destination" type="text" setter={setDestination} />
            <InputField id="duration" label="Duration" type="text" setter={setDuration} />
            <InputField id="risk" label="Risk" type="text" setter={setRisk} />
            <InputField id="supplierMessage" label="Supplier Message" type="text" setter={setSupplierMessage} />
            <InputField id="finalCall" label="Final Call" type="text" setter={setFinalCall} />
            <InputField id="profit" label="Profit" type="text" setter={setProfit} />
            <InputField id="contractAmount" label="Contract Amount" type="text" setter={setContractAmount} />
            <InputField id="contractId" label="Contract Id" type="text" setter={setContractId} />

            
            <div className="flex lg:space-x-4 lg:space-y-0 space-y-4 justify-center items-center flex-col lg:flex-row xl:flex-row 2xl:flex-row">
              <button type="submit" className={"bg-indigo-400 hover:bg-indigo-700 text-white text-[18px] font-bold py-3 rounded-md min-w-[250px] max-w-[300px]"}>
                Create Deal
              </button>
              <button onClick={onClose} className={"bg-red-400 hover:bg-red-700 text-white text-[18px] font-bold py-3 rounded-md min-w-[250px] max-w-[300px]"}>
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