import styled from 'styled-components';
import { Flex } from '.';

const Input = styled(Flex).attrs(() => ({ as: 'input' }))`

`

Input.defaultProps = {
  px: 4,
  py: 3,
  borderRadius: 3,
  borderColor: 'border',
  borderStyle: 'solid',
  borderWidth: '1px'
}

export default Input;