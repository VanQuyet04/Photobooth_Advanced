import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import FrameSelector from './FrameSelector';
import './Capture.css';

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

const Capture = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const videoRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImages, setCapturedImages] = useState([null, null, null, null]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState('classic');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const streamRef = useRef(null);
  const countdownRef = useRef(null);
  const frameRef = useRef(null);
  
  // Sử dụng ref để lưu currentPhoto index để tránh stale closure
  const currentPhotoRef = useRef(0);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraReady(true);
        setCameraError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Không thể truy cập camera. Vui lòng kiểm tra lại quyền truy cập camera của trình duyệt.");
      setIsCameraReady(false);
    }
  };

  const startCapture = () => {
    if (!isCameraReady) {
      setCameraError("Camera chưa sẵn sàng. Vui lòng thử lại.");
      return;
    }
    
    console.log('Bắt đầu chụp ảnh');
    setIsCapturing(true);
    setCurrentPhoto(0);
    currentPhotoRef.current = 0; // Reset ref
    setCapturedImages([null, null, null, null]);
    
    // Delay một chút để đảm bảo state đã được reset
    setTimeout(() => {
      startCountdown();
    }, 100);
  };

  const startCountdown = () => {
    // Kiểm tra nếu đã chụp đủ 4 ảnh
    if (currentPhotoRef.current >= 4) {
      console.log('Đã đủ 4 ảnh, dừng countdown');
      setIsCapturing(false);
      return;
    }

    console.log(`Bắt đầu countdown cho ảnh thứ ${currentPhotoRef.current + 1}`);
    
    // Clear interval cũ nếu có
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    // Bắt đầu từ 5 giây
    let timeLeft = 5;
    setCountdown(timeLeft);

    countdownRef.current = setInterval(() => {
      timeLeft -= 1;
      console.log(`Countdown: ${timeLeft}`);
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        console.log('Countdown kết thúc, sẽ chụp ảnh');
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        takePhoto();
      }
    }, 1000);
  };

  const takePhoto = () => {
    // Đảm bảo chỉ chụp 1 ảnh tại 1 thời điểm
    if (!videoRef.current || currentPhotoRef.current >= 4) {
      console.log('Không thể chụp ảnh - điều kiện không thỏa mãn');
      return;
    }

    const photoIndex = currentPhotoRef.current;
    console.log(`Chụp ảnh thứ ${photoIndex + 1} và lưu vào slot ${photoIndex}`);
    
    // Tăng counter NGAY để tránh chụp nhiều ảnh cùng lúc
    currentPhotoRef.current = photoIndex + 1;
    setCurrentPhoto(currentPhotoRef.current);
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    const imageUrl = canvas.toDataURL('image/jpeg');
    
    // Cập nhật ảnh vào vị trí cụ thể - chỉ log 1 lần
    setCapturedImages(prev => {
      const newImages = [...prev];
      newImages[photoIndex] = imageUrl;
      return newImages;
    });
    
    console.log(`Đã lưu ảnh ${photoIndex + 1}, counter hiện tại: ${currentPhotoRef.current}`);
    
    // Nếu chưa đủ 4 ảnh thì tiếp tục countdown sau 1 giây
    if (currentPhotoRef.current < 4) {
      console.log(`Sẽ chụp ảnh tiếp theo sau 1 giây (${currentPhotoRef.current + 1}/4)`);
      setTimeout(() => {
        startCountdown();
      }, 1000);
    } else {
      // Đã chụp đủ 4 ảnh
      console.log('🎉 Đã hoàn thành chụp 4 ảnh!');
      setIsCapturing(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const retryCamera = () => {
    startCamera();
  };

  const downloadFrame = () => {
    // Lấy phần tử frame đang hiển thị
    const frameElement = document.querySelector('.photo-frame-display');
    const frameRect = frameElement.getBoundingClientRect();
    
    // Tính toán kích thước canvas để chứa đủ toàn bộ khung
    const padding = 40; // Thêm padding để tránh cắt khung
    const canvasWidth = frameRect.width + (padding * 2);
    const canvasHeight = frameRect.height + (padding * 2);
    
    // Sử dụng html2canvas để chụp chính xác phần tử
    html2canvas(frameElement, {
      scale: 4, // Tăng độ phân giải
      useCORS: true,
      allowTaint: true,
      backgroundColor: null, // Để nền trong suốt
      logging: false,
      width: canvasWidth,
      height: canvasHeight,
      x: -padding,
      y: -padding,
      onclone: (clonedDoc) => {
        // Đảm bảo các phần tử được clone có style giống hệt
        const clonedFrame = clonedDoc.querySelector('.photo-frame-display');
        if (clonedFrame) {
          // Giữ nguyên kích thước và style như preview
          clonedFrame.style.width = `${frameRect.width}px`;
          clonedFrame.style.height = `${frameRect.height}px`;
          clonedFrame.style.transform = 'none';
          clonedFrame.style.position = 'relative';
          clonedFrame.style.left = `${padding}px`;
          clonedFrame.style.top = `${padding}px`;
          clonedFrame.style.backgroundColor = 'transparent'; // Đảm bảo nền trong suốt
          
          // Đảm bảo các icon có vị trí chính xác
          const icons = clonedFrame.querySelectorAll('.frame-icon');
          icons.forEach(icon => {
            icon.style.position = 'absolute';
            icon.style.zIndex = '2';
          });

          // Đảm bảo các ảnh giữ nguyên kích thước như preview
          const images = clonedFrame.querySelectorAll('img');
          images.forEach(img => {
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = '100%';
          });

          // Giữ nguyên style của brand như preview
          const brand = clonedFrame.querySelector('.frame-brand');
          if (brand) {
            // Không thay đổi bất kỳ style nào của brand
            const computedStyle = window.getComputedStyle(brand);
            Object.assign(brand.style, {
              position: computedStyle.position,
              bottom: computedStyle.bottom,
              left: computedStyle.left,
              transform: computedStyle.transform,
              width: computedStyle.width,
              padding: computedStyle.padding,
              backgroundColor: computedStyle.backgroundColor,
              borderRadius: computedStyle.borderRadius,
              zIndex: computedStyle.zIndex,
              fontSize: computedStyle.fontSize,
              fontWeight: computedStyle.fontWeight,
              color: computedStyle.color,
              textShadow: computedStyle.textShadow
            });
          }
        }
      }
    }).then(canvas => {
      // Tạo link tải về với chất lượng cao và nền trong suốt
      const link = document.createElement('a');
      link.download = `photobooth-${Date.now()}.png`; // Đổi sang PNG để giữ nền trong suốt
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    });
  };

  const resetCapture = () => {
    setCurrentPhoto(0);
    currentPhotoRef.current = 0;
    setCapturedImages([null, null, null, null]);
    setIsCapturing(false);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
  };

  const isComplete = capturedImages.every(img => img !== null);

  const getFrameStyle = (frameId) => {
    const frame = frames.find(f => f.id === frameId);
    if (!frame) return {};
    
    return {
      ...frame.style,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '8px',
      padding: '10px',
      background: frame.style.background || 'white',
      backgroundSize: frame.style.backgroundSize || 'cover',
      animation: frame.style.animation || 'none'
    };
  };

  const handleFrameSelect = (frame) => {
    console.log('Selected frame:', frame);
    setSelectedFrame(frame.id);
  };

  const handleIconSelect = (icon) => {
    console.log('Selected icon:', icon);
    setSelectedIcon(icon);
  };

  return (
    <div className="capture-container">
      <div className="content-section">
        <div className="camera-view">
          {cameraError ? (
            <div className="camera-error">
              <p>{cameraError}</p>
              <button onClick={retryCamera} className="retry-btn">
                Thử lại
              </button>
            </div>
          ) : (
            <>
              {isCapturing && countdown > 0 && (
                <div className="countdown-overlay">
                  <span className="countdown-number">{countdown}</span>
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="camera-feed"
              />
            </>
          )}
        </div>

        <div className="controls">
          {!isCapturing ? (
            <>
              <button 
                className="capture-btn"
                onClick={startCapture}
                disabled={!isCameraReady}
              >
                {isComplete ? 'Chụp lại' : 'Bắt đầu chụp'}
              </button>
              {isComplete && (
                <>
                  <button className="download-btn" onClick={downloadFrame}>
                    Tải về
                  </button>
                  <button className="reset-btn" onClick={resetCapture}>
                    Làm mới
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="capturing-indicator">
              Đang chụp ảnh {currentPhoto}/4
              {countdown > 0 && ` - ${countdown}s`}
            </div>
          )}
          <button className="back-btn" onClick={handleBack}>
            Quay lại
          </button>
        </div>

        {isComplete && (
          <FrameSelector
            selectedFrame={selectedFrame}
            selectedIcon={selectedIcon}
            onFrameSelect={handleFrameSelect}
            onIconSelect={handleIconSelect}
          />
        )}

        <div className="mode-indicator">
          Chế độ: {mode === 'normal' ? 'Chụp thường' : 'Chụp với AI'}
        </div>
      </div>

      <div className={`photo-frame-display ${selectedFrame}`} ref={frameRef}>
        <div className="frame-decoration"></div>
        {capturedImages.map((slot, index) => (
          <div key={index} className="frame-slot">
            {slot ? (
              <img src={slot} alt={`Frame ${index + 1}`} />
            ) : (
              <div className="empty-slot">+</div>
            )}
          </div>
        ))}
        {selectedIcon && (
          <>
            <div className="frame-icon frame-icon-1">{selectedIcon.emoji}</div>
            <div className="frame-icon frame-icon-2">{selectedIcon.emoji}</div>
            <div className="frame-icon frame-icon-3">{selectedIcon.emoji}</div>
          </>
        )}
        <div className="frame-brand">
          Flashback Films
        </div>
      </div>
    </div>
  );
};

export default Capture;