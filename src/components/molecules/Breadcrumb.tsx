import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Text } from '../atoms';
import { CapitalizedText } from '.';

/**
 * uses react-router-dom to find the present route and 
 * displays the route path in breadcrumb styles.
 */


const Breadcrumb: React.FunctionComponent = () => {
  const { pathname } = useLocation()
  let path = null;
  if(pathname) {
    path = pathname.split('/').slice(-1)[0]
  }
  return (
    <Flex backgroundColor='black' color='white' px={[3, 5]} my={0} height='40px' alignItems='center'>
      <Text as='h4' my={0} mr={2}>Home</Text> / <CapitalizedText as='h4' my={0} ml={2}>{path}</CapitalizedText>
    </Flex>
  )
}

export default Breadcrumb;