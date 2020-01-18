import React, { ReactElement, Fragment } from 'react';
import { Image, Flex } from '../atoms';
import { meshBackground } from '../../assets/images';

interface Props {
  children: React.FC | string | ReactElement;
}
const BackgroundWithHeader = ({
  children
}: Props) => {
  return (
    <Flex background={`url(${meshBackground}) repeat-x`} position='absolute' width='100%' left='0'>
      {children}
    </Flex>
  )
}

export default BackgroundWithHeader;