type ButtonProps = {
  title: string;
}

const Button = ({title}: ButtonProps) => {
  return (
    <button className={"bg-lime-400 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"}>
      {title}
    </button>
  )
}

export default Button