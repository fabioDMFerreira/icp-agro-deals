import { useNavigate } from 'react-router-dom';

type DealPreviewProperties = {
  code: string;
  title: string;
  price: string;
  description: string;
  milestones: any[];
  currentMilestone: string;
  nextMilestone: () => void;
};

const DealPreview = ({
  code,
  title,
  price,
  description,
  milestones,
  currentMilestone,
  nextMilestone,
}: DealPreviewProperties) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[300px] rounded-md shadow-lg p-4 bg-white border">
      <p className="text-[10px] text-gray-900">id: {code}</p>
      <h2 className="text-[20px] font-bold text-lime-600 mb-2">{title}</h2>
      <p className="text-gray-500 text-[15px] mb-1">{description}</p>
      <p className="text-[17px] text-gray-900 mb-3">
        Price <span className="text-lime-600">{price}</span>{' '}
        <span className="text-[15px]">/ USD / kg</span>
      </p>
      <button
        className={
          'bg-slate-400 hover:bg-slate-700 text-white text-[13px] font-bold py-1 px-2 rounded'
        }
        onClick={() => nextMilestone()}
      >
        Next Milestone
      </button>
      <p className="text-[17px] mb-5">Current milestone: {currentMilestone}</p>
      <button
        onClick={() => navigate(`/deal/${code}`)}
        className={
          'bg-lime-400 hover:bg-lime-700 text-white text-[18px] font-bold py-3 px-20 rounded-md'
        }
      >
        View Deal
      </button>
    </div>
  );
};

export default DealPreview;
