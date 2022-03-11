
const Switch = ({ labelOff, labelOn, toggle, setToggle }) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center my-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">
          { labelOff }
        </label>
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          <div
            className={
              "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? " transform translate-x-5" : null)
            }
          ></div>
        </div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 ml-2">
          { labelOn }
        </label>
      </div>
    </>
  );
}

export default Switch;
