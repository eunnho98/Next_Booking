import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../type';
import prisma from '../prismadb';
import { IBody } from '../api/file';

const getList = () => {
  const usersBuffer = readFileSync('data/user.json');
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

// 이메일 중복 확인
const exist = ({ email }: { email: string }) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

// 유저 리스트 저장
const write = async (users: StoredUserType[]) => {
  writeFileSync('data/user.json', JSON.stringify(users));
};

// 이메일로 유저를 찾고 요청이 들어온 비밀번호와 비교
const find = ({ email }: { email: string }) => {
  const users = getList();
  return users.find((user) => user.email === email);
};

const findDB = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const findDBwithRoom = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      room: {
        include: {
          bedList: {
            include: {
              beds: true,
            },
          },
        },
      },
    },
  });
  return user;
};

const writeDB = async (users: StoredUserType) => {
  await prisma.user.create({
    data: {
      name: users.name,
      email: users.email,
      password: users.password,
      birthday: users.birthday,
      userImage: users.userImage,
      accessToken: users.accessToken,
      refreshToken: users.refreshToken,
      isPurchase: users.isPurchase,
    },
  });
};

// 유저 정보 업데이트
const updateDB = async (users: StoredUserType) => {
  await prisma.user.update({
    where: {
      id: users.id,
    },
    data: {
      email: users.email,
      name: users.name,
      password: users.password,
      birthday: users.birthday,
    },
  });
};

// 유저 사진 업데이트
const updateImageDB = async (id: number, image: string) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      userImage: image,
    },
  });
};

// room 가장 최근 레코드 읽기
const getLastRoomDB = async () => {
  const user = await prisma.room.findFirst({
    orderBy: {
      id: 'desc',
    },
  });
  return user;
};

// 모든 room 읽기
const getAllRoomDB = async () => {
  const users = await prisma.room.findMany();
  return users;
};

// 각 방 별 침대 저장
const writeBedsDB = async (bedid: number, type: string, count: number) => {
  await prisma.beds.create({
    data: {
      type: type,
      count: count,
      Bedlist: {
        connect: { id: bedid },
      },
    },
  });
};

// 방 침대와 Room 연결
const writeBedListDB = async (id: number) => {
  await prisma.bedlist.create({
    data: {
      Room: {
        connect: { id: id },
      },
    },
  });
};

// Room 저장
const writeRoomDB = async (room: IBody, amenString: string) => {
  await prisma.room.create({
    data: {
      largeBuildingType: room.largeBuildingType,
      buildingType: room.buildingType,
      roomType: room.roomType,
      bedroomCount: room.bedroomCount,
      bedCount: room.bedCount,
      bathroomCount: room.bathroomCount,
      country: room.country,
      city: room.city,
      district: room.district,
      political: room.political,
      streetAddress: room.streetAddress,
      postcode: room.postcode,
      latitude: room.latitude,
      longitude: room.longitude,
      amentities: amenString,
      roomImage: room.roomImage,
      description: room.description,
      price: room.price,
      checkIn: room.checkIn,
      checkOut: room.checkOut,
      adults: room.adults,
      teenager: room.teenager,
      children: room.children,
      purchase: room.purchase,
      user: {
        connect: { id: room.userId },
      },
    },
  });
};

// 결제 유무 업데이트
const updatePurchaseDB = async (id: number, purchase: boolean) => {
  await prisma.room.update({
    where: {
      id: id,
    },
    data: {
      purchase: purchase,
    },
  });
};

export default {
  getList,
  exist,
  write,
  find,
  findDB,
  writeDB,
  updateDB,
  updateImageDB,
  writeBedsDB,
  writeBedListDB,
  writeRoomDB,
  getLastRoomDB,
  getAllRoomDB,
  findDBwithRoom,
  updatePurchaseDB,
};
