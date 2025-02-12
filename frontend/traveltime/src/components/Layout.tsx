import {Link, Outlet} from 'react-router';

const Layout = () => {
  return (
    <>
      <div>
        <nav className="bg-darkgreen p-4 m-0 pt-15">
          <ul className="list-none flex justify-between">
            <li>
              <Link to="/">Hamburger</Link>
            </li>
            <li>
              <Link to="/">TravelTime!</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <main className='h-140'>
          <Outlet />
        </main>
        <footer className='bg-darkgreen'>
          <nav className="sticky bottom-0 p-4 pb-15">
            <ul className="list-none flex justify-between">
              <li>
                <Link to="/">TravelTime!</Link>
              </li>
              <li>
                <Link to="/community">Community</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Layout;
