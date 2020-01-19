import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button } from '../../components/atoms';
import { CONTACT_US } from '../../routes/public';

const SomthingWentWrong = () => {
  const { push } = useHistory()
  const onClick = useCallback(() => push(CONTACT_US), [])
  return (
    <Flex width='100vw' flexDirection='column' justifyContent='center' alignItems='center'>
      SomeThing unexpected happened, it's not your fault
      <Button onClick={onClick}>
        Contact Us
      </Button>
    </Flex>
  )
}

export default SomthingWentWrong;