import {Outlet} from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <main className="h-200">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
