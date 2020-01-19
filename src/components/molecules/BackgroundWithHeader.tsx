/**
 * Adds background for the header.
 */
import React, { ReactElement } from 'react';
import { Flex } from '../atoms';
import { meshBackground } from '../../assets/images';

interface Props {
  children: React.FC | string | ReactElement;
}
const BackgroundWithHeader = ({
  children
}: Props) => {
  return (
    <Flex background={`url(${meshBackground}) repeat-x`} position='relative' width='100%' left='0'>
      {children}
    </Flex>
  )
}

export default BackgroundWithHeader;