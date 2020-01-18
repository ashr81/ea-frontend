import React from 'react';
import { Flex } from '../atoms';
import { Breadcrumb } from '../molecules';

const Navbar = () => {
  return (
    <Flex width='100%' flexDirection='column'>
      <Breadcrumb />
    </Flex>
  )
}

export default Navbar;