import {Link, useLocation} from 'react-router';
import Burger from './Burger';
import {useState, useEffect} from 'react';
import HamburgerNav from './HamburgerNav';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the hamburger menu when the location changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div>
      <nav className="w-full bg-gradient-to-t from-darkgreen to-darkergreen flex list-none m-0 justify-between pt-18 md:p-8 pb-4 px-4 shadow-xl">
        <button type='button' className="cursor-pointer">Darkmode</button>
        <Link to="/">
          <div className="font-bold cursor-pointer">TravelTime!</div>
        </Link>
        <Link to="/login">
          <div>Login</div>
        </Link>
        <div>
          <Burger open={open} setOpen={setOpen} />
        </div>
      </nav>
      <HamburgerNav open={open} />
    </div>
  );
};

export default Navbar;
