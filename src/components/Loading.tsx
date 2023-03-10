import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="loading__spinner" />
      <div className="loading__message">{message}</div>
    </div>
  );
};

export default Loading;
