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
      <Flex flexDirection='column' position='relative' my={4}>
        <Text color='label' fontSize='xs' my={2} mx={6}>*Indicates required field</Text>
        <Text fontSize='xl' mx={6}>What can we help you with?</Text>
        <Text fontSize='xl' mx={6}>Select the game or service.*</Text>
        <Input my={4} fontSize='xl' placeholder='Search any EA product' mx={6}/>
        <SelectionView options={[]}/>
      </Flex>
    </Fragment>
  )
}

export default ContactUs;