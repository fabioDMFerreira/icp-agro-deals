import { useState } from "react";

type InputMilestoneProperties = {
  index: string;
  setter: (value: any) => void;
}


const InputMilestone = ({index, setter}: InputMilestoneProperties) => {
  const [milestone, setMilestone] = useState({
    description: '',
    location: '',
    date: '',
    unlockedFundsPercentage: BigInt('0'),
  });
  
  const handleChange = (event: any) => {
    const { id, value } = event.target;
    setMilestone((prevState) => ({
      ...prevState,
      [id]: value
    }));

    setter((arr: any) => {arr[index] = milestone; return arr;});
  };

  return (
    <div className="flex flex-col lg:flex-row space-x-2 lg:items-center items-start pt-2">
      <p>{Number(index)+1}.</p>
      <input 
        type="text"
        id="description"
        className="max-w-[200px] border border-gray-300 rounded-md shadow-sm"
        placeholder={"description"}
        value={milestone.description}
        onChange={handleChange}
      />
      <input 
        type="text"
        id="location"
        className="max-w-[150px] border border-gray-300 rounded-md shadow-sm"
        placeholder={"location"}
        value={milestone.location}
        onChange={handleChange}
      />
      <input 
        type="date"
        id="date"
        className="max-w-[150px] border border-gray-300 rounded-md shadow-sm"
        placeholder={"date"}
        value={milestone.date}
        onChange={handleChange}
      />
    </div>
  )
}

export default InputMilestone