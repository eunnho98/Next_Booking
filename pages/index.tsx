import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

function index() {
  const [width, setWidth] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const handleResize = throttle(() => {
    setWidth(window.innerWidth);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width >= 560 && width <= 600) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [width]);
  return (
    <Box bgColor="cyan.400" h="100vh">
      <Heading textAlign="center" fontSize="6xl" color="whiteAlpha.900">
        Booking Web!
      </Heading>
      <Image src="/home/booking3.png" w="320px" m="auto" pt="8vh" />
      <Text
        textAlign="center"
        fontWeight="bold"
        color="whiteAlpha.900"
        fontSize="3xl"
        pl="48px"
        pr="48px"
        mb="96px"
      >
        사이트를 이용하기 위한 최적의 화면 크기를 찾아주세요!
      </Text>

      <Link href="/home">
        <Button
          textAlign="center"
          display="block"
          size="lg"
          isDisabled={!isValid}
          m="auto"
        >
          예약하러 가볼까요?
        </Button>
      </Link>
      <Text
        mt="24px"
        textAlign="center"
        fontWeight="bold"
        fontSize="2xl"
        color="whiteAlpha.900"
      >
        {width < 500
          ? '창이 너무 작아요'
          : width > 600
          ? '창이 너무 커요'
          : '좋아요!'}
      </Text>
    </Box>
  );
}

export default index;
