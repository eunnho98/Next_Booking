import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../type';
import prisma from '../prismadb';

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

export default {
  getList,
  exist,
  write,
  find,
  findDB,
  writeDB,
  updateDB,
  updateImageDB,
};
