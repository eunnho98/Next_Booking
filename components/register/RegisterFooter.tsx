import React, { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, Flex } from '@chakra-ui/react';

interface IProps {
  prevLink?: string;
  nextLink?: string;
  onSubmit: (data: any) => void;
  isValid: boolean;
}

function RegisterFooter({ prevLink, nextLink, onSubmit, isValid }: IProps) {
  const { handleSubmit } = useForm();
  useEffect(() => {
    console.log('footer', isValid);
  }, [isValid]);

  return (
    <Flex
      position="fixed"
      bottom="0"
      justify="space-between"
      align="center"
      width="548px"
      height="82px"
      p="14px 30px 20px"
      bgColor="white"
      zIndex="10"
      borderTop="1px solid gray"
    >
      <Link href={prevLink || ''}>
        <Button type="button" colorScheme="gray">
          뒤로
        </Button>
      </Link>
      <Link href={nextLink || ''}>
        <Button
          type="submit"
          isLoading={!isValid}
          loadingText="선택해주세요."
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
          colorScheme="pink"
        >
          계속
        </Button>
      </Link>
    </Flex>
  );
}

export default RegisterFooter;
