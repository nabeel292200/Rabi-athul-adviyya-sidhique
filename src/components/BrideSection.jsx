import React from 'react';

export default function BrideSection({ brideData }) {
  return (
    <div className="scroll-animate">
      <h2 className="label-heading label-bride">{brideData.badge}</h2>
      <div className="name-script">{brideData.name}</div>
      <div className="label-parent">{brideData.relation}</div>
      <div className="parent-names">{brideData.parents}</div>
    </div>
  );
}
