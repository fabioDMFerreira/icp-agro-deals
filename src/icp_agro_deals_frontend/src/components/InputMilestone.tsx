import { useEffect, useState } from "react";

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
  };

  // Use useEffect to call the setter function with a debounce effect.
  useEffect(() => {
    // Create a timeout to debounce the setter call
    const timeoutId = setTimeout(() => {
      setter((arr: any) => {arr[index] = milestone; return arr;})
    }, 500); // Adjust debounce time as needed

    // Cleanup function to clear the timeout if the effect is re-run before the timeout is reached
    return () => clearTimeout(timeoutId);
  }, [milestone, setter]); 

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