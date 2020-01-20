import React, { useCallback } from 'react';
import { Flex, Text } from '../components/atoms';
import { useHistory } from 'react-router-dom';
import { CONTACT_US } from '../routes/public';

const HomePage = () => {
  const { push } = useHistory()
  return (
    <Flex width='100vw' height='100vh' justifyContent='center' alignItems='center'>
      <Text as='h4' fontSize={5} cursor='pointer' onClick={useCallback(() => push(CONTACT_US), [])}>Browser to Contact page</Text>
    </Flex>
  )
}

export default HomePage;