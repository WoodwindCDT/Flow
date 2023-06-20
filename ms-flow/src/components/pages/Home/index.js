import React from 'react';
// importing canvas parts
import C1 from '../../C1';
import C2 from '../../C2';
import C3 from "../../C3"; 

export default function Home(props) {
  const {firstname} = props.info;
  const {organization, level_access} = props.access;
  const c_submit = props.funk;
  return (
    <>
    <C1 firstname={firstname} />
    <h4>Access to {organization}</h4>
    <C2 funk={c_submit} levels={level_access} />
    <C3 funk={c_submit} levels={level_access} />
    </>
  );
};