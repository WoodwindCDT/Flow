import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

export function SignIn(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleClick = () => {
        navigate('/');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // send login info for verification!
        try {
            // access signIn function from this point!
            // await props.signIn(email, password);
            await props.signIn("admin@mymdselect.com", "test123"); // auto filled for development
            // send user back to home
            handleClick();
        } catch (error) {
            console.log(error);
        }
    };
    
    // prevent user from accessing this page, as it's unnecessary
    useEffect(() => {
        if (props.LOGGED_STATE.LOGGEDIN) {
            handleClick();
        }
    }, [navigate]);

    return (
        <div className="sign-wrapper">
        <h2 className="sign-title">Please Sign-In!</h2>
        <div className="sign-input">
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="your email"
                className='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
            />
            <input
                type="password"
                placeholder="your password"
                className='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
            />
            <button type="submit" className='sign-btn'>Sign In</button>
        </form>
        </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { LOGGED_STATE } = state;
    return { LOGGED_STATE };
};

export default connect(mapStateToProps, null)(SignIn);