import { roomState } from '@/atom/registerRoom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import dynamic from 'next/dynamic';
const RoomRegisterPrice = dynamic(
  () => import('@/components/register/RoomRegisterPrice'),
  { ssr: false },
);

function price() {
  const room = useRecoilValue(roomState);
  console.log(room);
  return <RoomRegisterPrice />;
}

export default price;
