import React, { useState } from 'react';

export default function C1(props) {
  const {firstname} = props;
  return (
    <div className="section-1-wrapper">
      <h2 className="section-1-title">Welcome to Flow, {firstname}</h2>
    </div>
  );
};