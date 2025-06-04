import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Capture from './components/Capture';
import PhotoGallery from './components/PhotoGallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <PhotoGallery position="left" />
              <div className="main-content">
                <Home />
              </div>
              <PhotoGallery position="right" />
            </>
          } />
          <Route path="/capture/:mode" element={
            <div className="main-content">
              <Capture />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
