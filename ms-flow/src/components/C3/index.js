import React, { useState } from 'react';
import { PINE_GET } from '../../utils/Definitions';
import { BeatLoader } from 'react-spinners';

export default function C3(props) {
  const { funk, levels } = props; 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevelAccess, setSelectedLevelAccess] = useState(levels[0].title);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const params = {
      text: searchQuery,
      access: selectedLevelAccess
    };
    const res = await funk(PINE_GET, params);
    setModalContent(res);
    setModalOpen(true);
    
    setLoading(false);
    // clean up
    setSearchQuery('')
    setSelectedLevelAccess(levels[0].title)
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="section-3-wrapper card">
      <div className='card-content'>
        <h2 className="section-3-title">- Query Some Info -</h2>
        <div className="search-bar">
          <label htmlFor="searchQuery-query">Lookup</label>
          <textarea
          id='searchQuery-query'
            maxLength={100}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="type here"
            required
            disabled={isLoading}
          />
          <label htmlFor="selectedLevelAccess">Storage</label>
          <select value={selectedLevelAccess} onChange={(e) => setSelectedLevelAccess(e.target.value)} disabled={isLoading}>
            {levels.map((levelAccess) => (
              <option key={new Date()} value={levelAccess.id}>
                {levelAccess.title}
              </option>
            ))}
          </select>
          <button className='query-btn' onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <BeatLoader color="black" loading={isLoading} size={10} />
            ) : (
              'Search'
            )}
          </button>
        </div>

        {modalOpen && (
        <div className="modal">
          <div className="card">
            <div className="modal-content">
              <h3>Query: {modalContent.query} </h3>
              <br />
              <h3>Answer: {modalContent.summary}</h3>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};