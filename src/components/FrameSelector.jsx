import React from 'react';
import './FrameSelector.css';

const frames = [
  { id: 'classic', name: 'Cổ điển', style: { border: '8px solid white', boxShadow: '0 0 15px rgba(0,0,0,0.2)' } },
  { id: 'vintage', name: 'Vintage', style: { border: '10px solid #8B4513', boxShadow: '0 0 15px rgba(139,69,19,0.3)' } },
  { id: 'modern', name: 'Hiện đại', style: { border: '2px solid #333', boxShadow: '0 0 20px rgba(0,0,0,0.3)' } },
  { id: 'candy', name: 'Kẹo ngọt', style: { border: '8px solid #FF69B4', boxShadow: '0 0 15px rgba(255,105,180,0.3)', background: 'linear-gradient(45deg, #FFB6C1, #FFC0CB)' } },
  { id: 'pastel', name: 'Pastel', style: { border: '8px solid #E6E6FA', boxShadow: '0 0 15px rgba(230,230,250,0.3)', background: 'linear-gradient(45deg, #E6E6FA, #F8F8FF)' } },
  { id: 'sunset', name: 'Hoàng hôn', style: { border: '8px solid #FFB6C1', boxShadow: '0 0 15px rgba(255,182,193,0.3)', background: 'linear-gradient(45deg, #FFB6C1, #FFC0CB)' } },
  { id: 'rainbow', name: 'Cầu vồng', style: { 
    border: '8px solid white',
    boxShadow: '0 0 25px rgba(255,255,255,0.5)',
    background: 'linear-gradient(45deg, #FF9A9E, #FAD0C4, #FEE140, #FA709A, #FEE140, #FAD0C4, #FF9A9E)',
    backgroundSize: '200% 200%',
    animation: 'gradient 15s ease infinite'
  }},
  { id: 'elegant', name: 'Thanh lịch', style: {
    border: '8px solid #F5F5F5',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    background: 'linear-gradient(45deg, #E6E6FA, #F8F8FF, #E6E6FA)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'rose', name: 'Hồng nhạt', style: {
    border: '8px solid #FFF0F5',
    boxShadow: '0 0 20px rgba(255,192,203,0.2)',
    background: 'linear-gradient(45deg, #FFF0F5, #FFE4E1, #FFF0F5)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'lavender', name: 'Oải hương', style: {
    border: '8px solid #E6E6FA',
    boxShadow: '0 0 20px rgba(230,230,250,0.3)',
    background: 'linear-gradient(45deg, #E6E6FA, #F8F8FF, #E6E6FA)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'ocean', name: 'Đại dương', style: {
    border: '8px solid #E0FFFF',
    boxShadow: '0 0 20px rgba(0,191,255,0.2)',
    background: 'linear-gradient(45deg, #87CEEB, #B0E0E6, #87CEEB)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'sky', name: 'Bầu trời', style: {
    border: '8px solid #F0F8FF',
    boxShadow: '0 0 20px rgba(135,206,235,0.2)',
    background: 'linear-gradient(45deg, #F0F8FF, #E0FFFF, #F0F8FF)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'peach', name: 'Đào', style: {
    border: '8px solid #FFDAB9',
    boxShadow: '0 0 20px rgba(255,218,185,0.3)',
    background: 'linear-gradient(45deg, #FFDAB9, #FFE4C4, #FFDAB9)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'sapphire', name: 'Sapphire', style: {
    border: '8px solid #B0C4DE',
    boxShadow: '0 0 20px rgba(70,130,180,0.3)',
    background: 'linear-gradient(45deg, #4682B4, #87CEEB, #4682B4)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'royal', name: 'Hoàng gia', style: {
    border: '8px solid #D8BFD8',
    boxShadow: '0 0 20px rgba(147,112,219,0.3)',
    background: 'linear-gradient(45deg, #9370DB, #D8BFD8, #9370DB)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }},
  { id: 'emerald', name: 'Ngọc lục bảo', style: {
    border: '8px solid #98FB98',
    boxShadow: '0 0 20px rgba(50,205,50,0.2)',
    background: 'linear-gradient(45deg, #32CD32, #98FB98, #32CD32)',
    backgroundSize: '200% 200%',
    animation: 'gradient 10s ease infinite'
  }}
];

const icons = [
  { id: 'heart', emoji: '❤️', name: 'Trái tim' },
  { id: 'star', emoji: '⭐', name: 'Ngôi sao' },
  { id: 'crown', emoji: '👑', name: 'Vương miện' },
  { id: 'rainbow', emoji: '🌈', name: 'Cầu vồng' },
  { id: 'sparkles', emoji: '✨', name: 'Lấp lánh' },
  { id: 'butterfly', emoji: '🦋', name: 'Bướm' },
  { id: 'flower', emoji: '🌸', name: 'Hoa' },
  { id: 'sun', emoji: '☀️', name: 'Mặt trời' },
  { id: 'moon', emoji: '🌙', name: 'Mặt trăng' },
  { id: 'cloud', emoji: '☁️', name: 'Mây' },
  { id: 'unicorn', emoji: '🦄', name: 'Kỳ lân' },
  { id: 'panda', emoji: '🐼', name: 'Gấu trúc' },
  { id: 'cat', emoji: '🐱', name: 'Mèo' },
  { id: 'dog', emoji: '🐶', name: 'Chó' },
  { id: 'rabbit', emoji: '🐰', name: 'Thỏ' },
  { id: 'bear', emoji: '🐻', name: 'Gấu' },
  { id: 'fox', emoji: '🦊', name: 'Cáo' },
  { id: 'owl', emoji: '🦉', name: 'Cú' },
  { id: 'dolphin', emoji: '🐬', name: 'Cá heo' }
];

const FrameSelector = ({ selectedFrame, selectedIcon, onFrameSelect, onIconSelect }) => {
  return (
    <div className="frame-selector">
      <div className="selector-section">
        <h3>Chọn khung ảnh</h3>
        <div className="frames-grid">
          {frames.map(frame => (
            <div
              key={frame.id}
              className={`frame-option ${selectedFrame === frame.id ? 'selected' : ''}`}
              onClick={() => onFrameSelect(frame)}
            >
              <div className="frame-preview" style={frame.style}>
                <div className="preview-image"></div>
              </div>
              <span>{frame.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="selector-section">
        <h3>Chọn icon</h3>
        <div className="icons-grid">
          {icons.map(icon => (
            <div
              key={icon.id}
              className={`icon-option ${selectedIcon?.emoji === icon.emoji ? 'selected' : ''}`}
              onClick={() => onIconSelect(icon)}
            >
              <span className="icon-emoji">{icon.emoji}</span>
              <span>{icon.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameSelector; 