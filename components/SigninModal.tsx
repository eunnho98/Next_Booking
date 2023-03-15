import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { loginAPI2 } from '@/lib/api/auth';
import CommonInput from './common/CommonInput';
import Email from './svg/Email';
import Password from './svg/Password';
import { initialState } from '@/atom/atom';

interface IForm extends FieldValues {
  email: string;
  password: string;
}

function SigninModal() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [userState, setUserState] = useRecoilState(initialState);
  const onSubmit = async (data: IForm) => {
    try {
      const loginbody = {
        email: data.email,
        password: data.password,
      };

      const res = await loginAPI2(loginbody);
      const user = res.data.userExist;
      setUserState({
        id: user.id,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        userImage: user.userImage,
        isLogged: true,
        isPurchase: false,
      });
      toast({
        title: `${res.data.userExist.name}님, 환영합니다.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (error: any) {
      console.log(error.response);
      toast({
        title: error.response.data,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onInvalid = () => {
    console.log('에러발생..');
    console.log(errors);
  };

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  return (
    <>
      <Button
        onClick={onOpen}
        height="42px"
        p="0 16px"
        border="0"
        boxShadow="0px 1px 2px rgba(0, 0, 0, 0.18)"
        borderRadius="21px"
        bgColor="white"
      >
        로그인
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <ModalContent>
            <ModalHeader>로그인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>이메일</FormLabel>
                <CommonInput
                  type="text"
                  name="email"
                  control={control}
                  placeholder="이메일"
                  icons={<Email />}
                  errorMessage={errors.email?.message as string}
                  rules={{
                    required: '이메일을 입력하세요',
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: '이메일 형식이 아닙니다.',
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <CommonInput
                  type="password"
                  name="password"
                  control={control}
                  placeholder="비밀번호"
                  icons={<Password />}
                  errorMessage={errors.password?.message as string}
                  rules={{
                    required: '비밀번호를 입력하세요.',
                    minLength: {
                      value: 7,
                      message: '비밀번호가 6글자 이하입니다.',
                    },
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="pink" mr={3}>
                확인
              </Button>
              <Button onClick={onClose} colorScheme="gray">
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default SigninModal;
function useEffct(arg0: () => void, arg1: import('../lib/type').UserState[]) {
  throw new Error('Function not implemented.');
}
