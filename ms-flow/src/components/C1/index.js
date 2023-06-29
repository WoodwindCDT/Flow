import React, {useState} from 'react';

export default function C1(props) {
  const {firstname, organization, signOut} = props;
  const [isLoading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <div className="section-1-wrapper">
      <div className='section-1-heading-wrapper'>
        <h2 className="section-1-title">Welcome to Flow, {firstname}</h2>
        <span className='organization-text'><i>Access to {organization}</i></span>
      </div>
      <button className="signout-btn" onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  );
};