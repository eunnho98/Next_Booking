import { InferGetServerSidePropsType, NextPageContext } from 'next';
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Divider,
} from '@chakra-ui/react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

export default function Home({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Box width="100%" p="0 80px">
      <Text m="32px 0 16px" fontSize="md" fontWeight="600">
        숙소
      </Text>
      <SearchBar />
      <Text width="557px" m="80px 0 40px" fontSize="4xl" color="red.400">
        가까운 여행지, 에어비앤비와 함께하세요.
      </Text>
      <SimpleGrid columns={3} ml="32px">
        <Card
          maxWidth="400px"
          height="450px"
          minWidth="xs"
          boxShadow="0px 4px 8px rgba(0,0,0,0.08)"
        >
          <CardHeader>
            <Heading size="md"> 가까운 여행지</Heading>
          </CardHeader>
          <CardBody>
            <Image src="/home/home_card_image_1.jpg" borderRadius="lg" />
          </CardBody>

          <CardFooter
            position="relative"
            bottom="30px"
            display="flex"
            justifyContent="center"
          >
            <Text>가까운 여행지에서 휴식을 즐기세요.</Text>
          </CardFooter>
        </Card>
        <Card
          maxWidth="400px"
          height="450px"
          minWidth="xs"
          boxShadow="0px 4px 8px rgba(0,0,0,0.08)"
        >
          <CardHeader>
            <Heading size="md">독특한 공간</Heading>
          </CardHeader>
          <CardBody>
            <Image src="/home/home_card_image_2.jpg" borderRadius="lg" />
          </CardBody>

          <CardFooter
            position="relative"
            bottom="30px"
            display="flex"
            justifyContent="center"
          >
            <Text>평범하지 않은, 특별함이 담긴 공간</Text>
          </CardFooter>
        </Card>
        <Card
          maxWidth="400px"
          height="450px"
          minWidth="xs"
          boxShadow="0px 4px 8px rgba(0,0,0,0.08)"
        >
          <CardHeader>
            <Heading size="md">누군가의 집</Heading>
          </CardHeader>
          <CardBody>
            <Image src="/home/home_card_image_3.jpg" borderRadius="lg" />
          </CardBody>
          <CardFooter
            position="relative"
            bottom="20px"
            display="flex"
            justifyContent="center"
          >
            <Text>편안한 공간에서 친구/가족과 즐거운 시간을 보내세요.</Text>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
