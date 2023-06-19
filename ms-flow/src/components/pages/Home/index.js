import React from 'react';
// importing canvas parts
import C1 from '../../C1';
import C2 from '../../C2';
import C3 from "../../C3"; 

export default function Home(props) {
  const {firstname, organization} = props.info;
  const c_submit = props.funk;
  return (
    <>
    <C1 firstname={firstname} />
    <C2 organization={organization} funk={c_submit} />
    <C3 organization={organization} funk={c_submit} />
    </>
  );
};