import React, { useState } from 'react';
import { PINE_GET } from '../../utils/Definitions';

export default function C3(props) {
  const { funk, levels } = props; 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevelAccess, setSelectedLevelAccess] = useState(levels[0].title);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleSearch = async () => {
    const params = {
      text: searchQuery,
      access: selectedLevelAccess
    };
    const res = await funk(PINE_GET, params);
    setModalContent(JSON.stringify(res));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="section-3-wrapper">
      <h2 className="section-3-title">Search for Information</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Start your search..."
        />
        <select value={selectedLevelAccess} onChange={(e) => setSelectedLevelAccess(e.target.value)}>
          {levels.map((levelAccess) => (
            <option key={new Date()} value={levelAccess.id}>
              {levelAccess.title}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
            <div className="modal-body">{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};