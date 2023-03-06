import { selector } from 'recoil';
import { roomState } from './registerRoom';

// 위도 수정
export const setLatitude = selector({
  key: 'latitude',
  get: ({ get }) => {
    const newLatitude = get(roomState);
    return newLatitude.latitude;
  },
  set: ({ set }, newValue) => {
    set(roomState, (oldValue) => ({
      ...oldValue,
      latitude: +newValue,
    }));
  },
});

// 경도 수정
export const setLongitude = selector({
  key: 'longitude',
  get: ({ get }) => {
    const newLongitude = get(roomState);
    return newLongitude.longitude;
  },
  set: ({ set }, newValue) => {
    set(roomState, (oldValue) => ({
      ...oldValue,
      longitude: +newValue,
    }));
  },
});
