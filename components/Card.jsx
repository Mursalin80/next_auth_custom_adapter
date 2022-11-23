import React from 'react';
import { useSession } from 'next-auth/react';
import { DoubleBubble } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css';

const Card = () => {
  let { data, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="bg-gray-300 border-4 border-cyan-300 p-4  rounded-xl">
        <DoubleBubble
          text={'Loading...'}
          center={false}
          width={'500px'}
          height={'300px'}
        />
      </div>
    );
  }
  if (status !== 'authenticated') {
    return null;
  }
  return (
    <div className="container mx-auto w-9/12">
      <div className="bg-gray-300 border-4 border-cyan-300 p-4  rounded-xl">
        <pre>{JSON.stringify(data.user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Card;
