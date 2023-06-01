import React, { useState } from 'react';
import { redirect } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectToHome = () => {
        redirect('/');
    };

    // issue with redirect
    const handleSubmit = (e) => {
        e.preventDefault();
        // send login info for verification!
        localStorage.setItem('successSign', 'true');
        console.log('Email:', email);
        console.log('Password:', password);

        // send user back to home
        redirectToHome();
    };

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
                required
            />
            <input
                type="password"
                placeholder="your password"
                className='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className='sign-btn'>Sign In</button>
            </form>
        </div>
        </div>
    );
};