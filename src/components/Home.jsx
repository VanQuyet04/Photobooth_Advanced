import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleModeSelect = (mode) => {
    navigate(`/capture/${mode}`);
  };

  return (
    <div className="home-container">
      <h1>PhotoBooth</h1>
      <div className="mode-selection">
        <div className="mode-card" onClick={() => handleModeSelect('normal')}>
          <h2>Chụp thường</h2>
          <p>Chụp 4 ảnh liên tiếp với hiệu ứng đẹp mắt</p>
        </div>
        <div className="mode-card" onClick={() => handleModeSelect('ai')}>
          <h2>Chụp với AI</h2>
          <p>Chụp ảnh với sự hỗ trợ của AI để có kết quả tốt nhất</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 