import React from 'react';
// importing canvas parts
import C1 from '../../C1';
import C2 from '../../C2';

export default function Home(props) {
  const {firstname, organization} = props.info;
  const c2_submit = props.funk;
  return (
    <>
    <C1 firstname={firstname} />
    <C2 organization={organization} funk={c2_submit} />
    </>
  );
};