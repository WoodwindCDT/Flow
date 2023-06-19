import React, { useState } from 'react';
import { PINE_GET } from '../../utils/Definitions';

export default function C3(props) {
  const { organization, funk } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleSearch = async () => {
    const res = await funk(PINE_GET, searchQuery);
    setModalContent(JSON.stringify(res));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="section-2-wrapper">
      <h2 className="section-2-title">Search for Information in {organization}</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query..."
        />
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