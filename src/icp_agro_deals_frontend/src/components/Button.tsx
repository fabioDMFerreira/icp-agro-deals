type ButtonProps = {
  title: string;
}

const Button = ({title}: ButtonProps) => {
  return (
    <button className={"bg-lime-400 hover:bg-lime-700 text-white text-[18px] font-bold py-3 px-20 rounded-md"}>
      {title}
    </button>
  )
}

export default Button