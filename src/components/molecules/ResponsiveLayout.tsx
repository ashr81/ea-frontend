import styled from 'styled-components';
import { Flex } from '../atoms';

const ResponsiveLayout = styled(Flex).attrs(() => ({
  width: ['100%', '80%', '70%']
}))`
  margin-left: auto;
  margin-right: auto;
`

export default ResponsiveLayout;