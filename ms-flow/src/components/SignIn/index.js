import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';

export function SignIn(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await props.signIn(email, password);
      if (!res) {
        setLoading(false)
        console.log("LOOKS LIKE YOU HAVE NO ACCESS");
        return;
      }
      handleClick();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (props.LOGGED_STATE.LOGGEDIN) {
      handleClick();
    }
  }, [navigate]);

  return (
    <div className="sign-wrapper">
      <h2 className="sign-title">Sign In</h2>
      <div className="sign-input">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="your password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            disabled={isLoading}
          />
          <button type="submit" className="sign-btn" disabled={isLoading}>
            {isLoading ? (
              <BeatLoader color="black" loading={isLoading} size={10} />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { LOGGED_STATE } = state;
  return { LOGGED_STATE };
};

export default connect(mapStateToProps, null)(SignIn);