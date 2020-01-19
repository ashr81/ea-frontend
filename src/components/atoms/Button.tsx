import styled, { css } from 'styled-components';
import Flex from './Flex';
import { ButtonProps } from '../../react-app-env';

const Button = styled(Flex).attrs(() => ({ as: 'button' }))<ButtonProps>`
`

export default Button;