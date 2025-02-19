import {Link} from 'react-router';

interface HamburgerNavProps {
  open: boolean;
}

const HamburgerNav = ({open}: HamburgerNavProps) => {
  return (
    <div
      className={`fixed z-50 right-0 w-50 float-right bg-lightblue text-darkgreen text-center rounded-bl-lg rounded-tl-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <ul className="mt-10">
        <Link to="/">
          <li className="p-2 cursor-pointer w-full transition-all duration-300 ease-in-out hover:bg-blue">
            Main page
          </li>
        </Link>
        <Link to="/notifications">
          <li className="p-2 cursor-pointer w-full transition-all duration-300 ease-in-out hover:bg-blue">
            Notifications
          </li>
        </Link>
        <Link to="/profile">
          <li className="p-2 cursor-pointer w-full transition-all duration-300 ease-in-out hover:bg-blue">
            Your profile
          </li>
        </Link>
        <Link to="/getstarted">
          <li className="p-2 cursor-pointer w-full transition-all duration-300 ease-in-out hover:bg-blue">
            Get started
          </li>
        </Link>
        <Link to="/contact">
          <li className="p-2 cursor-pointer w-full transition-all duration-300 ease-in-out hover:bg-blue">
            Contact
          </li>
        </Link>
      </ul>
      <Link to="/login">
        <button
          type="button"
          className="mt-15 mb-5 bg-blue rounded-2xl p-1 font-bold text-green shadow-md transition-all duration-300 hover:bg-lightgreen ease-in-out cursor-pointer w-25"
        >
          Log out
        </button>
      </Link>
    </div>
  );
};

export default HamburgerNav;
