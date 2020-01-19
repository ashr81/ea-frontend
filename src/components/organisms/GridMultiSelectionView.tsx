/**
 * It contains multiple atoms and molecules which is used at multiple places
 * across the application.
 */
import React from 'react';
import { Flex, Text } from '../atoms';
import { GridMultiSelectionViewLoader } from '../../content-loaders'

interface Props {
  options: Array<{name: string; id: number}>;
  selected: {
    id?: number,
    name?: string;
  }
  isLoading: boolean;
  artifactType: 'topics' | 'issues';
  onSelectOption: (event: React.SyntheticEvent) => void;
}

const GridMultiSelectionView: React.FunctionComponent<Props> = ({
  options,
  selected,
  isLoading,
  artifactType,
  onSelectOption
}) => {
  return (
    <Flex mx={6} flexWrap='wrap' py={2} alignItems='center'>
      {isLoading ? <GridMultiSelectionViewLoader /> : options.map(option => (
        <Flex width='240px'
          cursor='pointer'
          data-testid={`grid-multi-selection-view-${artifactType}-${option.id}`}
          data-artifact-type={artifactType}
          data-option-id={option.id}
          onClick={onSelectOption}
          alignItems='center'
          justifyContent='center'
          color={option.id === selected.id ? 'white' : 'black'}
          backgroundColor={option.id === selected.id ? 'black' : 'white'}
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