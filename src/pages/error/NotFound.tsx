import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button } from '../../components/atoms';
import { CONTACT_US } from '../../routes/public';

const NotFound = () => {
  const { push } = useHistory()
  const onClick = useCallback(() => push(CONTACT_US), [])
  return (
    <Flex flexDirection='column'>
      <Flex>Page Not Found</Flex>
      <Button onClick={onClick}>
        Contact Us
      </Button>
    </Flex>
  )
}

export default NotFound;