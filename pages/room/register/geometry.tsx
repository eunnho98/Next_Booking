import React from 'react';
import dynamic from 'next/dynamic';

// dynamic import로 ssr 방지 -> 브라우저에서 동작하는 window는 SSR이 안되므로
const RegisterRoomGeometry = dynamic(
  import('../../../components/register/RegisterRoomGeometry'),
  { ssr: false },
);

function geometry() {
  return <RegisterRoomGeometry />;
}

export default geometry;
