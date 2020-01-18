import styled from 'styled-components';
import { 
  background, color, border, layout, position, space, typography, fontSize, fontStyle,
} from 'styled-system';
import { BoxProps } from '../../react-app-env';

const Box = styled.div<BoxProps>`
  ${space}
  ${background}
  ${color}
  ${border}
  ${layout}
  ${position}
  ${typography}
  ${fontStyle}
`

export default Box;