interface BurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Burger = ({open, setOpen}: BurgerProps) => {
  return (
    <>
      <button type="button"
        onClick={() => {
          setOpen(!open);
        }}
        className="flex justify-around flex-col flex-nowrap pt-1 cursor-pointer"
      >
        <div
          className={`w-7 h-0.5 mb-1.5 bg-amber-50 rounded-xl transition-transform duration-300 ease-in-out ${
            open ? 'transform rotate-45 translate-y-2' : ''
          }`}
        ></div>
        <div
          className={`w-7 h-0.5 mb-1.5 bg-amber-50 rounded-xl transition-opacity duration-300 ease-in-out ${
            open ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-7 h-0.5 mb-1.5 bg-amber-50 rounded-xl transition-transform duration-300 ease-in-out ${
            open ? 'transform -rotate-45 -translate-y-2' : ''
          }`}
        ></div>
      </button>
    </>
  );
};

export default Burger;
