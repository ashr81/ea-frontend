/**
 * Mail form interacts with parent component in changing state and sending data
 * As well for submission of the form.
 */
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
    <Flex flexDirection='column' as='form' onSubmit={onFormSubmit}>
      <Input my={4}
        type='email'
        data-testid='mail-form-input-email'
        fontSize={[3, 5]}
        placeholder='Enter your email'
        mx={[2, 6]} name='email' onChange={onTextChange} value={email}
      />
      <Input my={4}
        data-testid='mail-form-input-subject'
        fontSize={[3, 5]}
        mx={[2, 6]} value={subject}
        disabled={true}
      />
      <Input my={4}
        as='textarea'
        fontSize={[3, 4]}
        data-testid='mail-form-input-description'
        placeholder='What is your query?'
        mx={[2, 6]} name='description' onChange={onTextChange} value={description}
      />
      <Button type='submit' cursor={buttonDisabled ? 'not-allowed' : 'pointer'}
        data-testid='mail-form-button-submit'
        mx={[2, 6]}
        disabled={buttonDisabled}
        borderStyle='none' width={['140px', '200px']}
        p={3}
      >Email Us</Button>
    </Flex>
  )
}

export default MailForm;