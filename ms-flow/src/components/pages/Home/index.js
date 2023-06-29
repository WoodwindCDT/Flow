import React from 'react';
// importing canvas parts
import C1 from '../../C1';
import C2 from '../../C2';
import C3 from "../../C3"; 

export default function Home(props) {
  const {firstname} = props.info;
  const {organization, level_access} = props.access;
  const c_submit = props.funk;
  const signOut = props.end_session;
  return (
    <div className="canvas">
      <div className='c-wrapper'>
        <C1 firstname={firstname} organization={organization} signOut={signOut}/>
        <div className='actionables'>
          <C2 funk={c_submit} levels={level_access} />
          <C3 funk={c_submit} levels={level_access} />
        </div>
      </div>
    </div>
  );
};