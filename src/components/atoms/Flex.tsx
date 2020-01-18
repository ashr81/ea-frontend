import styled from 'styled-components';
import { flexbox } from 'styled-system';
import { FlexProps } from '../../react-app-env';
import { Box } from '.';

const Flex = styled(Box)<FlexProps>`
  ${flexbox}
  box-sizing: border-box;
`

export default Flex;