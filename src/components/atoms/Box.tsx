import styled from 'styled-components';
import { 
  background, color, border, layout, position, space,
} from 'styled-system';
import { BoxProps } from '../../react-app-env';

const Box = styled.div<BoxProps>`
  ${space}
  ${background}
  ${color}
  ${border}
  ${layout}
  ${position}
`

export default Box;