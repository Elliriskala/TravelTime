import {Route, BrowserRouter as Router, Routes} from 'react-router';
import Layout from './components/Layout';
import Mainpage from './views/Mainpage';

const App = () => {
  return (
    <Router basename="">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Mainpage />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
