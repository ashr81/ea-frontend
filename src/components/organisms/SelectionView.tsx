import React from 'react';
import { Flex } from '../atoms';

interface Props {
  options: [];
  selectedOptionId?: number
}

const SelectionView: React.FunctionComponent<Props> = ({
  options,
  selectedOptionId
}) => {
  return (
    <Flex backgroundColor='options' width='100%' height='100px' position='relative'>
      
    </Flex>
  )
}

export default SelectionView;