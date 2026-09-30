import React from 'react';

export default function GroomSection({ groomData }) {
  return (
    <div className="scroll-animate">
      <h2 className="label-heading label-groom">{groomData.badge}</h2>
      <div className="name-script">{groomData.name}</div>
      <div className="label-parent">{groomData.relation}</div>
      <div className="parent-names">{groomData.parents}</div>
    </div>
  );
}
