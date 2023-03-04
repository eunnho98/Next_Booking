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
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { isHidden } from '@/atom/atom';
import CommonInput from './common/CommonInput';
import CommonSelector from './common/CommonSelector';
import Email from './svg/Email';
import Eye from './svg/Eye';
import Password from './svg/Password';
import Person from './svg/Person';
import { dayList, monthList, yearList } from '@/lib/staticData';
import EyeClose from './svg/EyeClose';
import { signupAPI2 } from '@/lib/api/auth';

interface IForm extends FieldValues {
  email: string;
  name: string;
  password: string;
  checkPassword: string;
  month: string;
  day: string;
  year: string;
}

function SigninModal() {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
  } = useForm<IForm>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hide = useRecoilValue(isHidden);
  const toast = useToast();

  const onSubmit = async (data: IForm) => {
    if (data.password !== data.checkPassword) {
      return setError(
        'checkPassword',
        { message: '비밀번호가 일치하지 않습니다.' },
        {
          shouldFocus: true,
        },
      );
    }
    if (
      data.password.includes(data.name) ||
      data.password.includes(data.email.split('@')[0])
    ) {
      return setError(
        'password',
        { message: '비밀번호에 이름 또는 이메일이 포함되어있습니다.' },
        {
          shouldFocus: true,
        },
      );
    }

    try {
      const signUpBody = {
        email: data.email,
        name: data.name,
        password: data.password,
        birthday: new Date(
          `${data.yar}-${data.month.replace('월', '')}-${data.day}`,
        ).toISOString(),
      };

      const res = await signupAPI2(signUpBody);
      console.log(res);
      toast({
        title: '회원가입 완료!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(watch());
  const onInvalid = () => {
    console.log('에러발생..');
    console.log(errors);
  };
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
        회원가입
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <ModalContent>
            <ModalHeader>회원가입</ModalHeader>
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
                <FormLabel>이름</FormLabel>
                <CommonInput
                  type="text"
                  name="name"
                  control={control}
                  placeholder="이름"
                  icons={<Person />}
                  errorMessage={errors.name?.message as string}
                  rules={{
                    required: '이름을 입력하세요.',
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

              <FormControl>
                <FormLabel>비밀번호확인</FormLabel>
                <CommonInput
                  type={hide ? 'password' : 'text'}
                  name="checkPassword"
                  control={control}
                  placeholder="비밀번호확인"
                  icons={hide ? <Eye /> : <EyeClose />}
                  errorMessage={errors.checkPassword?.message as string}
                  rules={{ required: '입력해주세요' }}
                />
              </FormControl>
              <Text>생일</Text>
              <Text fontSize="xs" color="gray.600">
                만 18세 이상의 성인만 회원으로 가입할 수 있습니다.
              </Text>
              <Stack direction="row" mt="12px">
                <FormControl>
                  <CommonSelector
                    placeholder="년"
                    control={control}
                    name="year"
                    options={yearList}
                    rules={{ required: '선택해주세요' }}
                    errorMessage={errors.year?.message as string}
                  />
                </FormControl>
                <FormControl>
                  <CommonSelector
                    placeholder="월"
                    control={control}
                    name="month"
                    options={monthList}
                    rules={{ required: '선택해주세요' }}
                    errorMessage={errors.month?.message as string}
                  />
                </FormControl>
                <FormControl>
                  <CommonSelector
                    placeholder="일"
                    control={control}
                    name="day"
                    options={dayList}
                    rules={{ required: '선택해주세요' }}
                    errorMessage={errors.day?.message as string}
                  />
                </FormControl>
              </Stack>
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
