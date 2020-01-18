import styled from 'styled-components';
import { Flex } from '../atoms';

const ResponsiveLayout = styled(Flex).attrs(() => ({
  width: ['80%', '70%', '100%']
}))`
  margin-left: auto;
  margin-right: auto;
`

export default ResponsiveLayout;