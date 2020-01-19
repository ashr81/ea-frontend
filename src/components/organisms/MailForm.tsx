import React from 'react';
import { Flex, Input, Button } from '../atoms';
import { email as emailValidator } from '../../utils/validators';
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
  const buttonDisabled = !(emailValidator(email) && description)
  return (
    <Flex flexDirection='column'>
      <Input my={4}
        type='email'
        data-testid='mail-form-input-email'
        fontSize='xl'
        placeholder='Enter your email'
        mx={6} name='email' onChange={onTextChange} value={email}
      />
      <Input my={4}
        data-testid='mail-form-input-subject'
        fontSize='xl'
        mx={6} value={subject}
        disabled={true}
      />
      <Input my={4}
        as='textarea'
        fontSize='lg'
        data-testid='mail-form-input-description'
        placeholder='What is your query?'
        mx={6} name='description' onChange={onTextChange} value={description}
      />
      <Button cursor={buttonDisabled ? 'not-allowed' : 'pointer'}
        data-testid='mail-form-button-submit'
        mx={6}
        disabled={buttonDisabled}
        borderStyle='none' width='200px'
        p={3} onClick={onFormSubmit}
      >Email Us</Button>
    </Flex>
  )
}

export default MailForm;