type InputFieldProperties = {
  id: string;
  label: string;
  type: string;
  setter: (value: string) => void;
}


const InputField = ({id, label, type, setter}: InputFieldProperties) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-small text-gray-700">{label}</label>
      <input 
          type={type} 
          id={id} 
          onChange={(e) => setter(e.target.value)}
          className="p-0.5 w-full border border-gray-300 rounded-md shadow-sm"
          placeholder={`${id}`}
          step="0.1"
      />
    </div>
  )
}

export default InputField