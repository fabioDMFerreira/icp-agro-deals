type DealPriceProperties = {
  label: string;
  price: string;
  unit: string;
}


const DealPrice = ({label, price, unit}: DealPriceProperties) => {
  return (
    <div className="flex justify-between items-center mt-5">
      <p className="text-[17px] font-bold mb-1">{label}</p>
      <div className="flex space-x-2">
        <p className="text-[20px] font-bold text-lime-600">{price}</p>
        <p className="text-[20px] font-bold">{unit}</p>
      </div>
    </div>
  )
}

export default DealPrice