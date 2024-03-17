const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-r-2 border-lime-500"></div>
    </div>
  );
};

export default Spinner;