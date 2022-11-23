import React from 'react';
import { useSession } from 'next-auth/react';
import { DoubleBubble } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css';

const Card = () => {
  let { data, status } = useSession();

  if (status === 'loading') {
    return (
      <DoubleBubble
        text={'Loading...'}
        bgColor={'#F0A500'}
        center={false}
        width={'300px'}
        height={'300px'}
      />
    );
  }
  if (status !== 'authenticated') {
    return null;
  }
  return <div>{JSON.stringify(data.user, null, 2)}</div>;
};

export default Card;
