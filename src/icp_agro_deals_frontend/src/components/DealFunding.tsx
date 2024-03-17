import DealLogs from "./DealLogs";
import ProgressBar from "./ProgressBar";

type DealFundingMilestone= {
  label: string;
  location?: string;
  date: string;
}

type DealFundingProperties = {
  dealId: string;
  progressPercentage: number;
  finalCall: string;
  contractAmount: string;
  contractId: string;  
  fundedAmount: string;
  duration: string;
  profit: string;
  risk: string;
  supplierMessage: string;
  productName: string;
  origin: string;
  destination: string;
  milestones: DealFundingMilestone[];
}

const DealFunding = ({dealId, progressPercentage, finalCall, contractAmount, contractId, fundedAmount, duration, profit, risk, supplierMessage, productName, origin, destination, milestones}: DealFundingProperties) => {
  return (
    <div className="lg:min-w-[800px] rounded-md shadow-lg p-4 bg-zinc-100 border">
      <p className="text-[25px] font-bold mt-12">Currently funded: <span className="px-5 text-lime-600 text-[20px]">{progressPercentage}% completed</span></p>
      <ProgressBar />
      <p className="text-[20px] mt-4 mb-2">Finall Call: {finalCall}</p>
      <p className="text-[20px] my-2">Amount of contract: {contractAmount}</p>
      <p className="text-[20px] my-2">Currently funded: {fundedAmount}</p>
      <div className="flex items-center space-x-10">
        <p className="text-[20px]">Duration: {duration}</p>
        <div className="w-0.5 h-6 bg-lime-600 mx-5"></div>
        <p className="text-[20px]">Profit: {profit}</p>
        <div className="w-0.5 h-6 bg-lime-600 mx-5"></div>
        <p className="text-[20px]">Risk: {risk}</p>
      </div>
      <p className="text-[25px] mt-10">Message from supplier:</p>
      <p className="text-[20px] mt-0.5 mb-8">{supplierMessage}</p>


      <DealLogs dealId={dealId} />
    </div>

  )
}

export default DealFunding
