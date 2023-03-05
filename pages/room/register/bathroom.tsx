import { roomState } from '@/atom/registerRoom';
import RegisterBathroom from '@/components/register/RegisterBathroom';
import React from 'react';
import { useRecoilValue } from 'recoil';

function bathroom() {
  const room = useRecoilValue(roomState);
  console.log('bath', room);
  return <RegisterBathroom />;
}

export default bathroom;
