
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from  './components/auth/Login';
import Alerts from './components/layout/Alerts';

import AuthState from './context/auth/AuthState';
import WaterState from './context/water/WaterState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <WaterState>
        <AlertState>
          <Router>
            <>
            <Navbar title={' Water Diary'}/> 
            <div className="container">
              <Alerts />
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
              </Routes>
            </div>
            </>
          </Router>
        </AlertState>
      </WaterState>
    </AuthState>
  );
}

export default App;
