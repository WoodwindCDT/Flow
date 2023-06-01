// import React, { useState } from 'react';

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform sign-in or sign-up logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div className="sign-wrapper">
//       <h2 className="sign-title">Sign Up!</h2>
//       <div className="sign-input-wrapper">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="your email"
//             className='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="your password"
//             className='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className='sign-btn'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
//         </form>
//         <p onClick={() => setIsSignIn(!isSignIn)}>
//           {isSignIn ? 'Create an account' : 'Already have an account?'}
//         </p>
//       </div>
//     </div>
//   );
// };