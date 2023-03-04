import React from 'react';
import { Button } from '@chakra-ui/react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
}

function CommonButton({ children, color }: IProps) {
  if (!color) {
    // eslint-disable-next-line no-param-reassign
    color = 'cyan.700';
  }
  return (
    <Button
      bgColor={color}
      color="white"
      width="100%"
      height="48px"
      borderRadius="4px"
      fontSize="16px"
      fontWeight={800}
    >
      {children}
    </Button>
  );
}

export default CommonButton;
