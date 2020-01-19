import React from 'react';
import { Flex, Input, Button } from '../atoms';

interface Props {
  subject: string;
  description: string;
  email: string;
  onTextChange: (event: React.SyntheticEvent) => void;
  onFormSubmit: () => void;
}

const MailForm: React.FunctionComponent<Props> = ({
  email, description, subject,
  onTextChange, onFormSubmit
}: Props) => {
  return (
    <Flex flexDirection='column'>
      <Input my={4}
        fontSize='xl'
        placeholder='Enter your email'
        mx={6} name='email' onChange={onTextChange} value={email}
      />
      <Input my={4}
        fontSize='xl'
        mx={6} value={subject}
        disabled={true}
      />
      <Input my={4}
        as='textarea'
        fontSize='lg'
        placeholder='What is your query?'
        mx={6} name='description' onChange={onTextChange} value={description}
      />
      <Button cursor='pointer' mx={6} borderRadius={3} borderStyle='none' width='200px' p={3} backgroundColor='blue' color='white' onClick={onFormSubmit}>Email Us</Button>
    </Flex>
  )
}

export default MailForm;