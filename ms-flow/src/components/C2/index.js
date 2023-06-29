import React, { useState } from 'react';
import { PINE_POST } from '../../utils/Definitions';
import { BeatLoader } from 'react-spinners';

export default function C2(props) {
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
      access: selectedLevelAccess,
    };

    const res = await funk(PINE_POST, params);
    setModalContent(JSON.stringify(res));
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
    <div className="section-2-wrapper card">
      <div className='card-content'>
        <h2 className="section-2-title">- Store Some Info -</h2>
        <div className="search-bar">
          <label htmlFor="searchQuery-upsert">Insert</label>
            <textarea
            id='searchQuery-upsert'
              maxLength={100}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="type here"
              required
              disabled={isLoading}
            />
            <label htmlFor="selectedLevelAccess">Storage</label>
            <select
              id="selectedLevelAccess"
              value={selectedLevelAccess}
              onChange={(e) => setSelectedLevelAccess(e.target.value)}
              disabled={isLoading}
            >
              {levels.map((levelAccess) => (
                <option key={new Date()} value={levelAccess.id}>
                  {levelAccess.title}
                </option>
              ))}
            </select>
            <button className='upsert-btn' onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <BeatLoader color="black" loading={isLoading} size={10} />
              ) : (
                'Add'
              )}
            </button>
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
    </div>
  );
}
