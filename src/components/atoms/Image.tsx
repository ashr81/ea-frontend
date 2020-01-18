import styled from 'styled-components';
import { background, position, space, backgroundImage, backgroundRepeat } from 'styled-system';
import { ImageProps } from '../../react-app-env';

const Image = styled.img<ImageProps>`
  ${background}
  ${position}
  ${space}
`

export default Image;