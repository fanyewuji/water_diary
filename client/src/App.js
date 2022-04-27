
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';

import WaterState from './context/water/WaterState';
import './App.css';

const App = () => {
  return (
    <WaterState>
      <Router>
        <>
        <Navbar title={' Water Diary'}/> 
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
          </Routes>
        </div>
        </>
      </Router>
    </WaterState>
  );
}

export default App;
