import {
  Flex,
  Box,
  Button,
  Stack,
  Avatar,
  UnorderedList,
  ListItem,
  ScaleFade,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import Airbnb from './svg/Airbnb';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';
import { logoutAPI } from '@/lib/api/auth';
import UpdateModal from './UpdateModal';

function Header() {
  const [userState, setUserState] = useState<any>({});
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onLogout = async () => {
    try {
      await logoutAPI();
      sessionStorage.clear();
      setUserState({});
      toast({
        title: '로그아웃 되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const sessionState = JSON.parse(
      sessionStorage.getItem('userSession') as string,
    );
    setUserState(sessionState || {});
  }, []);
  const { isLogged } = userState.user || false;
  const { userImage } = userState.user || '';
  return (
    <Flex
      position="sticky"
      top="0"
      width="100%"
      height="80px"
      justify="space-around"
      align="center"
      bgColor="white"
      boxShadow="0px 1px 2px rgba(0, 0, 0, 0.18)"
      zIndex="100"
    >
      <Link href="/">
        <Airbnb />
      </Link>
      <Stack direction="row" spacing="12px">
        {isLogged ? (
          <Box>
            <Button
              leftIcon={<HamburgerIcon />}
              height="42px"
              p="4px 16px"
              border="0"
              boxShadow="0px 1px 2px rgba(0, 0, 0, 0.18)"
              borderRadius="21px"
              colorScheme="pink"
              onClick={() => setIsUserMenuOpened((prev) => !prev)}
            >
              <Avatar src={userImage} size="sm" />
            </Button>
            {isUserMenuOpened && (
              <ScaleFade in={isUserMenuOpened} initialScale={0.9}>
                <Box position="relative">
                  <UnorderedList
                    position="absolute"
                    left="20"
                    top="-14"
                    width="180px"
                    bgColor="white"
                    boxShadow="0 2px 16px rgba(0, 0, 0, 0.12)"
                    borderRadius="8px"
                    zIndex="20"
                  >
                    <ListItem
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      width="100%"
                      height="42px"
                      p="0 16px"
                      _hover={{
                        bgColor: 'gray.300',
                        borderRadius: '8px',
                      }}
                    >
                      숙소 관리
                    </ListItem>
                    <ListItem
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      width="100%"
                      height="42px"
                      p="0 16px"
                      _hover={{
                        bgColor: 'gray.300',
                        borderRadius: '8px',
                      }}
                    >
                      숙소 등록하기
                    </ListItem>
                    <ListItem
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      width="100%"
                      height="42px"
                      p="0 16px"
                      _hover={{
                        borderRadius: '8px',
                        bgColor: 'gray.300',
                      }}
                      onClick={onLogout}
                    >
                      로그아웃
                    </ListItem>
                    <ListItem
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      width="100%"
                      height="42px"
                      p="0 16px"
                      _hover={{
                        borderRadius: '8px',
                        bgColor: 'gray.300',
                      }}
                      onClick={() => {
                        setIsUpdate(true);
                        onOpen();
                      }}
                    >
                      회원정보 수정
                    </ListItem>
                  </UnorderedList>
                  {isUpdate && (
                    <UpdateModal isOpen={isOpen} onClose={onClose} />
                  )}
                </Box>
              </ScaleFade>
            )}
          </Box>
        ) : (
          <>
            <SignupModal />
            <SigninModal />
          </>
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
