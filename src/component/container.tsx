import React from 'react';

const Container = ({ children }: any) => {
  return (
    <div className="max-w-5xl w-full mx-auto px-4">
      {children}
    </div>
  );
};

export default Container;