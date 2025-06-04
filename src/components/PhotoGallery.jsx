import React from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ position }) => {
  // Mảng các ảnh mẫu (bạn có thể thay thế bằng ảnh thật)
  const samplePhotos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      title: 'Cặp đôi hạnh phúc'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      title: 'Khoảnh khắc đáng nhớ'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      title: 'Nụ cười tỏa nắng'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      title: 'Kỷ niệm ngọt ngào'
    }
  ];

  return (
    <div className={`photo-gallery ${position}`}>
      <div className="gallery-container">
        {samplePhotos.map((photo) => (
          <div key={photo.id} className="photo-frame">
            <div className="photo-inner">
              <img src={photo.url} alt={photo.title} />
              <div className="photo-title">{photo.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery; 