import styled from 'styled-components';
import { Flex } from '.';
import { InputProps } from '../../react-app-env'

const Input = styled(Flex).attrs(() => ({ as: 'input' }))<InputProps>`

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