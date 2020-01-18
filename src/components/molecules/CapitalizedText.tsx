import styled from 'styled-components';
import { Text } from '../atoms';

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

CapitalizedText.defaultProps = {
  fontSize: 'md'
}

export default CapitalizedText;