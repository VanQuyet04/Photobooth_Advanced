import React from 'react';
import './FilterSelector.css';

const filters = [
  { id: 'normal', name: 'Bình thường', style: {} },
  { id: 'vintage', name: 'Vintage', style: { filter: 'sepia(0.5) contrast(1.2) brightness(0.9)' } },
  { id: 'grayscale', name: 'Đen trắng', style: { filter: 'grayscale(1)' } },
  { id: 'warm', name: 'Ấm áp', style: { filter: 'sepia(0.3) saturate(1.5) brightness(1.1)' } },
  { id: 'cool', name: 'Mát mẻ', style: { filter: 'hue-rotate(30deg) saturate(1.2)' } },
  { id: 'dramatic', name: 'Kịch tính', style: { filter: 'contrast(1.4) saturate(1.2) brightness(0.9)' } },
  { id: 'fade', name: 'Mờ nhạt', style: { filter: 'opacity(0.8) saturate(0.8)' } },
  { id: 'vibrant', name: 'Rực rỡ', style: { filter: 'saturate(1.5) contrast(1.2)' } },
  { id: 'noir', name: 'Noir', style: { filter: 'grayscale(1) contrast(1.4) brightness(0.9)' } },
  { id: 'dreamy', name: 'Mơ mộng', style: { filter: 'brightness(1.1) contrast(0.9) saturate(1.2)' } }
];

const FilterSelector = ({ selectedFilter, onFilterSelect }) => {
  return (
    <div className="filter-selector">
      <h3>Chọn bộ lọc</h3>
      <div className="filters-grid">
        {filters.map(filter => (
          <div
            key={filter.id}
            className={`filter-option ${selectedFilter === filter.id ? 'selected' : ''}`}
            onClick={() => onFilterSelect(filter)}
          >
            <div className="filter-preview" style={filter.style}>
              <div className="preview-image"></div>
            </div>
            <span>{filter.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector; 