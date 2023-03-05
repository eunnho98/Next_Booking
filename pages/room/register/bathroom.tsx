import { roomState } from '@/atom/registerRoom';
import React from 'react';
import { useRecoilValue } from 'recoil';

function bathroom() {
  const room = useRecoilValue(roomState);
  console.log('bath', room);
  return <div>bathroom</div>;
}

export default bathroom;
