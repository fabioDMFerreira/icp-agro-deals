import Button from "./Button";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DealFeature from "./DealFeature";
import Divider from "./Divider";
import DealPrice from "./DealPrice";

type DealFeature = {
  label: string;
  values: string[];
}

type DealPrice = {
  label: string;
  price: string;
  unit: string;
}

type DealCardProperties = {
  code: string;
  origin: string;
  title: string;
  price: string;
  description: string;
  features: DealFeature[];
  prices: DealPrice[];
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const DealCard = ({code, origin, title, price, description, features, prices}: DealCardProperties) => {
  return (
    <div className="lg:min-w-[600px] rounded-md shadow-lg p-4 bg-white border">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center space-x-1">
          <p className="text-sm">HS Code: {code}</p>
          <ContentCopyIcon onClick={() => copyToClipboard(code)} className="text-lime-400 hover:text-lime-500 cursor-pointer" style={{ fontSize: 15 }} />
        </div>
        <p className="text-sm">Origin: {origin}</p>
      </div>
      <h2 className="text-[35px] font-bold text-lime-600 mb-2">{title}</h2>
      <p className="text-[31px] text-gray-900">Price <span className="text-lime-600">${price}</span> <span className="text-[15px]">/ USD / kg</span></p>
      <p className="text-gray-500 text-[15px] mb-4 mt-4">{description}</p>
      {features.map((feature, index) => (
        <div key={index}>
          <DealFeature label={feature.label} values={feature.values} />
          <Divider/>
        </div>
      ))}
      <p className="text-[17px] font-bold mt-7">Current Offer Base Prices</p>
      {prices.map((price, index) => (
        <div key={index}>
          <DealPrice label={price.label} price={price.price} unit={price.unit} />
          <Divider/>
        </div>
      ))}
      <div className="flex space-x-2">
        <Button title="Get a Quote"/>
      </div>
    </div>
  )
}

export default DealCard