import React, { Fragment } from 'react';
import { Flex, Text, Input } from '../components/atoms';
import { BackgroundWithHeader } from '../components/molecules';
import SelectionView from '../components/organisms/SelectionView';

const ContactUs = () => {
  return (
    <Fragment>
      <BackgroundWithHeader>
        <Text as='h3' fontSize='xxxxl' my={0} px={5} py={3}>CASE INFORMATION</Text>
      </BackgroundWithHeader>
      <Flex flexDirection='column' position='relative' top='160px'>
        <Text color='label' fontSize='xs' my={2}>*Indicates required field</Text>
        <Text fontSize='xl'>What can we help you with?</Text>
        <Text fontSize='xl'>Select the game or service.*</Text>
        <Input width='100%' my={4} fontSize='xl' placeholder='Search any EA product'/>
        <SelectionView />
      </Flex>
    </Fragment>
  )
}

export default ContactUs;