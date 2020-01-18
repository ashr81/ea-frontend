import React from 'react';
import { Flex, Text } from '../atoms';

interface Props {
  options: Array<{name: string; id: number}>;
  selectedOption: {
    id?: number,
    name?: string;
  }
  onSelectOption: (event: React.SyntheticEvent) => void;
  artifactType: 'products' | 'platforms';
  onChangeOption: (event: React.SyntheticEvent) => void;
}

const SelectionView: React.FunctionComponent<Props> = ({
  options,
  selectedOption,
  onSelectOption,
  artifactType,
  onChangeOption
}) => {
  return (
    <Flex backgroundColor='options' position='relative'>
      <Flex mx={6} flexWrap='wrap' py={2} alignItems='center'>
        {selectedOption.id ? 
          <Flex width='180px' cursor='pointer' alignItems='center' justifyContent='center' backgroundColor='white' height='250px' m={3}>
            <Text fontSize='xl'>{selectedOption.name}</Text>
          </Flex>
        : options.map(option => (
          <Flex width='180px' cursor='pointer' data-artifact-type={artifactType} data-option-id={option.id} onClick={onSelectOption} alignItems='center' justifyContent='center' backgroundColor='white' height='250px' m={3} key={option.id}>
            <Text fontSize='xl'>{option.name}</Text>
          </Flex>
        ))}
        {selectedOption.id ? <Text data-artifact-type={artifactType} onClick={onChangeOption}>Change game</Text> : null}
      </Flex>
    </Flex>
  )
}

export default SelectionView;