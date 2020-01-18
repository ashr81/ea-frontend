import styled, { css } from 'styled-components';
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
  ${({ cursor }) => cursor && css`
    cursor: ${cursor}
  `}
`

export default Box;