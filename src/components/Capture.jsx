import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FrameSelector from './FrameSelector';
import './Capture.css';

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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Kích thước canvas cho 4 ảnh
    canvas.width = 800;
    canvas.height = 600;
    
    // Vẽ background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ từng ảnh
    const promises = capturedImages.map((imageUrl, index) => {
      if (!imageUrl) return Promise.resolve();
      
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const x = (index % 2) * 400;
          const y = Math.floor(index / 2) * 300;
          
          // Vẽ khung ảnh
          ctx.save();
          if (selectedFrame === 'classic') {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 8;
            ctx.strokeRect(x + 4, y + 4, 392, 292);
          } else if (selectedFrame === 'polaroid') {
            ctx.fillStyle = '#fff';
            ctx.fillRect(x, y, 400, 300);
            ctx.fillStyle = '#000';
            ctx.fillRect(x + 10, y + 10, 380, 280);
          } else if (selectedFrame === 'vintage') {
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 10;
            ctx.strokeRect(x + 5, y + 5, 390, 290);
          } else if (selectedFrame === 'modern') {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 1, y + 1, 398, 298);
          }
          
          // Vẽ ảnh
          ctx.drawImage(img, x + 10, y + 10, 380, 280);
          
          // Vẽ icon nếu có
          if (selectedIcon) {
            const iconSize = 40;
            const iconX = x + 340;
            const iconY = y + 20;
            ctx.font = `${iconSize}px Arial`;
            ctx.fillText(selectedIcon.emoji, iconX, iconY + iconSize);
          }
          
          ctx.restore();
          resolve();
        };
        img.src = imageUrl;
      });
    });
    
    // Khi tất cả ảnh đã được vẽ
    Promise.all(promises).then(() => {
      const link = document.createElement('a');
      link.download = `photobooth-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
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
            onFrameSelect={(frame) => setSelectedFrame(frame.id)}
            onIconSelect={(icon) => setSelectedIcon(icon)}
          />
        )}

        <div className="mode-indicator">
          Chế độ: {mode === 'normal' ? 'Chụp thường' : 'Chụp với AI'}
        </div>
      </div>

      <div className={`photo-frame-display ${selectedFrame?.id || ''}`}>
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