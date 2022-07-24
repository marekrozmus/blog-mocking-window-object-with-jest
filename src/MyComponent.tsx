import React from 'react';

const MyComponent = () => {
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (['some', 'pathname', 'values'].includes(window.location.pathname)) {
      window.open('some url', '_blank');
    } else {
      window.location.replace('some url');
    }
  };

  return (
    <div>
      <div>This button will open new window or redirect to some address</div>
      <button onClick={onClick}>Test</button>
    </div>
  );
};

export default MyComponent;
