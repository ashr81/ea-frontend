import React, { Fragment } from 'react';
import { Flex, Text } from '../atoms';

interface Props {
  options: Array<{name: string; id: number}>;
  selectedOption: {
    id?: number,
    name?: string;
  }
  artifactType: 'topics' | 'issues';
  onSelectOption: (event: React.SyntheticEvent) => void;
}

const GridMultiSelectionView: React.FunctionComponent<Props> = ({
  options,
  selectedOption,
  artifactType,
  onSelectOption
}) => {
  return (
    <Flex mx={6} flexWrap='wrap' py={2} alignItems='center'>
      {options.map(option => (
        <Flex width='240px'
          cursor='pointer'
          data-testid={`grid-multi-selection-view-${artifactType}-${option.id}`}
          data-artifact-type={artifactType}
          data-option-id={option.id}
          onClick={onSelectOption}
          alignItems='center'
          justifyContent='center'
          color={option.id === selectedOption.id ? 'white' : 'black'}
          backgroundColor={option.id === selectedOption.id ? 'black' : 'white'}
          border='3px solid black'
          borderRadius={3}
          p={3}
          height='50px' m={3} key={option.id}
        >
          <Text fontSize='md' alignItems='center'>{option.name}</Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default GridMultiSelectionView;