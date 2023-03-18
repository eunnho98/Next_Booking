import { setLatitude, setLongitude } from '@/atom/selector';
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { throttle } from 'lodash';
import RegisterFooter from './RegisterFooter';
import { useForm } from 'react-hook-form';
import { roomState } from '@/atom/registerRoom';
import { getLocationInfoAPI } from '@/lib/api/map';

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    // 페이지가 모두 로드된 후 해당 외부 스크립트가 실행됨
    script.defer = true;
    document.head.appendChild(script);
    // 성공적으로 불러오면 resolve()를 통해 작업이 완료되었다고 알림
    // resolve에 매개변수가 없으면 단순히 작업이 완료되었음을 알리는 것
    // resolve에 매개변수가 있으면 작업이 완료되면 넘긴 매개변수가 반환됨
    // -> then()을 쓸 때 넘긴 매개변수가 then의 콜백으로 넘어감
    script.onload = () => {
      resolve();
    };
  });
};

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function RegisterRoomGeometry() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [lat, setLat] = useRecoilState(setLatitude);
  const [lng, setLng] = useRecoilState(setLongitude);
  const setLocation = useSetRecoilState(roomState);

  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    try {
      const { data } = await getLocationInfoAPI({
        latitude: lat,
        longitude: lng,
      });
      setLocation((prev) => {
        return {
          ...prev,
          city: data.city,
          country: data.country,
          district: data.district,
          latitude: data.latitude,
          longitude: data.longitude,
          postcode: data.postcode,
          streetAddress: data.streetAddress,
          political: data.political,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    // 지도 부르기
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: lat || 37.5,
          lng: lng || 126.97,
        },
        zoom: 14,
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: lat || 37.5,
          lng: lng || 126.97,
        },
        map,
      });
      map.addListener(
        'center_changed',
        throttle(() => {
          const changeLat = map.getCenter().lat();
          const changeLng = map.getCenter().lng();
          marker.setPosition({ lat: changeLat, lng: changeLng });
          // recoil atom state 업데이트
          setLat(changeLat);
          setLng(changeLng);
        }, 150),
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    console.log('lat', lat);
    console.log('lng', lng);
  }, [lat, lng]);
  return (
    <form
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
    >
      <Box p="62px 30px 100px" color="myColor.100">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          핀의 위치가 정확한가요?
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px">
          Step 4-2.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="24px"
          wordBreak="keep-all"
        >
          필요한 경우 핀이 정확한 위치에 놓이도록 조정할 수 있어요.
        </Text>
        <Box w="487px" h="280px" mt="24px">
          <div style={{ width: '100%', height: '100%' }} ref={mapRef} />
        </Box>
        <Text
          as="p"
          fontSize="14px"
          mt="22px"
          fontWeight="extrabold"
          color="pink.700"
        >
          현재 위치를 사용한 경우에만 이용 가능합니다.
        </Text>
      </Box>
      <RegisterFooter
        prevLink="/room/register/location"
        nextLink="/room/register/amentites"
        onSubmit={onSubmit}
        isValid={true}
      />
    </form>
  );
}

export default RegisterRoomGeometry;
