type DealFeatureProperties = {
  label: string;
  values: string[];
}


const DealFeature = ({label, values}: DealFeatureProperties) => {
  return (
    <div className="flex justify-between items-center mt-5">
      <p className="text-[17px] font-bold mb-1">{label}</p>
      <div className="flex space-x-2">
        {values.map((value, index) => (
          <div key={index} className="rounded-md bg-white px-2 py-1 border-2 border-lime-400 inline-block">
            <p className="text-[15px] font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DealFeature