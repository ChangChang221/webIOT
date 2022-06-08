import React from 'react';

import { useSubscription } from 'mqtt-react-hooks';

function Status() {
  /* Message structure:
   *  topic: string
   *  message: string
   */
  const { message } = useSubscription([
    'esp32',
  ]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{`topic:${message.topic} - message: ${message.message}`}</span>
      </div>
    </>
  );
}
export default Status;