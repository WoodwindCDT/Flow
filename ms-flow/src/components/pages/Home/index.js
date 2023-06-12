import React from 'react';
// importing canvas parts
import C1 from '../../C1';

export default function Home(props) {
  const {firstname} = props.info;
  return (
    <C1 firstname={firstname}/>
  );
};