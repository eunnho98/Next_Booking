import { setLatitude, setLongitude } from '@/atom/selector';
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

declare global {
  interface Window {
    initMap: () => void;
  }
}

function RegisterRoomGeometry() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [lat, setLat] = useRecoilState(setLatitude);
  const [lng, setLng] = useRecoilState(setLongitude);

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
    }
  };

  useEffect(() => {
    loadMap();
  }, []);
  return (
    <form>
      <Box p="62px 30px 100px">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          핀의 위치가 정확한가요?
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
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
      </Box>
    </form>
  );
}

export default RegisterRoomGeometry;
