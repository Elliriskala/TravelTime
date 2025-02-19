import {BiChevronDown, BiChevronUp} from 'react-icons/bi';
import {useState} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';

interface SelectorProps {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  hideSearch?: boolean;
  customStyles?: string;
}

const Selector = ({
  options,
  selected,
  setSelected,
  placeholder,
  searchPlaceholder,
  hideSearch = false,
  customStyles = '',
}: SelectorProps) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative h-10 w-75 sm:w-60 m-1 ${customStyles}`}>
      <div
        onClick={() => setOpen(!open)}
        className="bg-offwhite w-full p-2 flex items-center justify-between rounded-lg cursor-pointer "
      >
        {selected ? selected : placeholder}
        {open ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
      </div>
      <ul
        className={`bg-offwhite mt-2 overflow-y-auto absolute z-20 w-full
        ${open ? 'max-h-60' : 'hidden'}`}
      >
        {!hideSearch && (
          <div className="flex items-center px-2 border-b-1 border-transparent-blue sticky top-0 bg-offwhite">
            <AiOutlineSearch size={20} className=" text-darkblue" />
            <input
              type="text"
              value={input}
              onChange={(evt) => setInput(evt.target.value.toLocaleLowerCase())}
              placeholder={searchPlaceholder}
              className="p-2 w-full bg-white border-0 focus:outline-none focus:ring-0"
            />
          </div>
        )}
        <li
          className={`p-2 py-3 text-sm transition-all duration-300 ease-in-out hover:bg-lightblue cursor-pointer
            ${selected === '' && 'bg-blue'}`}
          onClick={() => {
            setSelected('');
            setOpen(false);
            setInput('');
          }}
        >
          none
        </li>

        {options.map((option) => (
          <li
            key={option}
            className={`p-2 py-3 text-sm transition-all duration-300 ease-in-out hover:bg-lightblue cursor-pointer
              ${option.toLocaleLowerCase() === selected.toLocaleLowerCase() && 'bg-blue'}

              ${option.toLocaleLowerCase().startsWith(input) ? '' : 'hidden'}`}
            onClick={() => {
              if (option.toLocaleLowerCase() !== selected.toLocaleLowerCase()) {
                setSelected(option);
                setOpen(false);
                setInput('');
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
