import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
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


  );
}

export default App;
