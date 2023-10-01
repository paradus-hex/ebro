import { useEffect } from 'react';

const MyComponent = () => {
  const myAPI = window.myAPI;

  useEffect(() => {
    myAPI.on('channel_name', (event, data) => {
      console.log('Received data:', data);
    });

    return () => {
      // Clean up the listener when the component is unmounted
      myAPI.removeListener('channel_name');
    };
  }, []);

  const handleClick = () => {
    myAPI.send('channel_name', { message: 'Hello from renderer process' });
  };

  return (
    <div>
      <button onClick={handleClick}>Send message to main process</button>
    </div>
  );
};

export default MyComponent;
