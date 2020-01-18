import styled from 'styled-components';
import { textStyle, typography, fontSize } from 'styled-system';
import { Flex } from '.';
import { TextProps } from '../../react-app-env';

const Text = styled(Flex)<TextProps>`
  ${typography}
  ${fontSize}
`

Text.defaultProps = {
  fontSize: 'md'
}

export default Text;