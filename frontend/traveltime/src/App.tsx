import {Route, BrowserRouter as Router, Routes} from 'react-router';
import Layout from './components/Layout';
import Mainpage from './views/Mainpage';
import Login from './views/Login';
import {UserProvider} from './contexts/UserContext';
import Profile from './views/Profile';

const App = () => {
  return (
    <Router basename="">
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};
export default App;
