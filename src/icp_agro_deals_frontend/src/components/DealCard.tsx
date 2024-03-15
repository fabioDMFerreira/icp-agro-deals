import Button from "./Button";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type DealCardProperties = {
  code: string;
  title: string;
  price: string;
  description: string
}
const DealCard = ({code, title, price, description}: DealCardProperties) => {
  return (
    <div className="min-w-[500px] rounded overflow-hidden shadow-lg p-4 bg-white border">
      <div className="flex items-center space-x-1">
        <p className="text-sm">HS Code: {code}</p>
        <ContentCopyIcon className="text-lime-400" style={{ fontSize: 15 }} />
      </div>
      <h2 className="text-[35px] font-bold text-lime-600 mb-2">{title}</h2>
      <p className="text-xl text-gray-900 font-semibold">Price ${price} /USD /kg</p>
      <p className="text-gray-500 text-[15px] mb-4">{description}</p>
      {/* <ul className="list-disc pl-5 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600 text-sm">{feature}</li>
        ))}
      </ul> */}
      <div className="flex space-x-2">
        <Button title="Get a Quote"/>
        <Button title="Create Smart Contract"/>
      </div>
    </div>
  )
}

export default DealCard