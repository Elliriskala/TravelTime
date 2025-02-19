import {Outlet} from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <div>
        <div className="flex flex-col">
          <Navbar />
        </div>
        <main className="flex justify-center items-center flex-col mx-4 my-5 lg:mx-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
