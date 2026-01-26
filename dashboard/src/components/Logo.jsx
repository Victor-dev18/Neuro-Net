import React from "react";

export const NeuroNetLogo = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    className={className}
  >
    {/* Glow Filter */}
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Shield Shape */}
    <path
      d="M50 5 L90 25 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 V25 Z"
      stroke="#00e1ff"
      strokeWidth="3"
      fill="rgba(0, 225, 255, 0.1)"
      filter="url(#glow)"
    />

    {/* Neural Network / Circuit Brain */}
    <g stroke="#00e1ff" strokeWidth="2" strokeLinecap="round">
      {/* Central Node */}
      <circle cx="50" cy="50" r="4" fill="#00e1ff" />
      
      {/* Top Nodes */}
      <circle cx="50" cy="30" r="3" fill="#050505" />
      <line x1="50" y1="34" x2="50" y2="46" />
      
      {/* Left Nodes */}
      <circle cx="30" cy="45" r="3" fill="#050505" />
      <line x1="33" y1="46" x2="46" y2="49" />
      
      {/* Right Nodes */}
      <circle cx="70" cy="45" r="3" fill="#050505" />
      <line x1="67" y1="46" x2="54" y2="49" />
      
      {/* Bottom Connections */}
      <line x1="50" y1="54" x2="35" y2="70" />
      <line x1="50" y1="54" x2="65" y2="70" />
      <circle cx="35" cy="70" r="2" fill="#00e1ff" />
      <circle cx="65" cy="70" r="2" fill="#00e1ff" />
    </g>
  </svg>
);