"use client";
import React from 'react';
import './LinesBackground.css';

interface LinesBackgroundProps {
  children?: React.ReactNode;
}

export const LinesBackground: React.FC<LinesBackgroundProps> = ({ children }) => {
  return (
    <div className="lines-background">
      <div className="line-layer layer-1" />
      <div className="line-layer layer-2" />
      <div className="line-layer layer-3" />
      <div className="lines-content">
        {children}
      </div>
    </div>
  );
};
