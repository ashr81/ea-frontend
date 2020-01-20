/**
 * Extends Text styled components and adds extra styling text-transform.
 */
import styled from 'styled-components';
import { Text } from '../atoms';

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

CapitalizedText.defaultProps = {
  fontSize: 3
}

export default CapitalizedText;