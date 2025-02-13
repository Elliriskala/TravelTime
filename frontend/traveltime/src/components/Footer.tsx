import {Link} from 'react-router';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-darkgreen to-darkergreen bottom-0 px-4  pt-4 pb-15 flex justify-between">
      <div>
        <ul>
          <li className="font-bold cursor-pointer">
            <Link to="/">TravelTime!</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="list-none flex">
          <li className="px-2 cursor-pointer">
            <Link to="/getstarted">Get started</Link>
          </li>
          <li className="px-2 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
