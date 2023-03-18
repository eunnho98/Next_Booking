import {
  Box,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
} from '@chakra-ui/react';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <Box width="100%" p="0 80px" color="whiteAlpha.900">
      <Text pt="12px" fontSize="2xl" fontWeight="600" mb="12px">
        숙소
      </Text>
      <SearchBar />
      <Text
        width="300px"
        m="auto"
        mt="24px"
        fontSize="4xl"
        textAlign="center"
        fontWeight="bold"
      >
        원하시는 숙소를 예약해보세요!
      </Text>
      <Card
        m="auto"
        mt="24px"
        maxWidth="400px"
        height="450px"
        minWidth="xs"
        boxShadow="0px 4px 8px rgba(0,0,0,0.3)"
        bgColor="cyan.400"
        mb="24px"
      >
        <CardBody>
          <Image src="/home/trip.png" w="260px" m="auto" />
        </CardBody>

        <CardFooter position="relative" bottom="30px">
          <Text
            color="myColor.100"
            fontSize="2xl"
            textAlign="center"
            fontWeight="bold"
          >
            알맞은 숙소를 예약하고 자유롭게 여행하세요!
          </Text>
        </CardFooter>
      </Card>
    </Box>
  );
}
