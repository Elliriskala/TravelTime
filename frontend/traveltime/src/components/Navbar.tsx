import {Link} from 'react-router';
import Burger from './Burger';
import {useState} from 'react';
import HamburgerNav from './HamburgerNav';

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
