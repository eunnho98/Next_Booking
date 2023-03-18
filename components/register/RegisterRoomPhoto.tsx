import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css?after';
import RegisterFooter from './RegisterFooter';
import { useSetRecoilState } from 'recoil';
import { roomState } from '@/atom/registerRoom';
interface IProps {
  images: string[];
}
function RegisterRoomPhoto({ images }: IProps) {
  const imgCopy = images;
  const [choose, setChoose] = useState(imgCopy[0]);
  const setRoom = useSetRecoilState(roomState);

  const onSubmit = () => {
    setRoom((prev) => {
      return {
        ...prev,
        roomImage: choose,
      };
    });
  };

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (cur: number) => {
      setChoose(imgCopy[cur]);
    },
  };

  return (
    <form>
      <Box p="62px 30px 100px" color="myColor.100">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          숙소 사진
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px">
          Step 6.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="24px"
          wordBreak="keep-all"
        >
          원하시는 숙소 스타일을 사진을 보고 골라주세요.
        </Text>
        <Slider {...settings}>
          {imgCopy.map((img) => (
            <Image src={img} w="300px" h="200px" borderRadius="4px" />
          ))}
        </Slider>
      </Box>
      <RegisterFooter
        prevLink="/room/register/amentities"
        nextLink="/room/register/description"
        isValid={true}
        onSubmit={onSubmit}
      />
    </form>
  );
}

export default RegisterRoomPhoto;
