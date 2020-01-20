/**
 * It contains multiple atoms and molecules which is used at multiple places
 * across the application.
 */
import React, { Fragment } from 'react';
import { Flex, Text } from '../atoms';
import { GridSingleSelectionViewLoader } from '../../content-loaders';

interface Props {
  options: Array<{name: string; id: number}>;
  selected: {
    id?: number,
    name?: string;
  }
  onSelectOption: (event: React.SyntheticEvent) => void;
  artifactType: 'products' | 'platforms';
  onChangeOption: (event: React.SyntheticEvent) => void;
  isLoading: boolean;
}

const GridSingleSelectionView: React.FunctionComponent<Props> = ({
  options, selected,
  isLoading, onSelectOption,
  artifactType, onChangeOption
}) => {
  if(!isLoading && options.length === 0 && !selected.id) {
    return (<Flex width='100%' justifyContent='center'>No {artifactType} available</Flex>)
  }
  return (
    <Flex backgroundColor='options' position='relative'>
      <Flex mx={[2, 6]} flexWrap='wrap' py={2} alignItems='center'>
        {selected.id ? 
          <Fragment>
            <Flex width={['80px',  '180px']} cursor='pointer' alignItems='center' justifyContent='center' backgroundColor='white' height={['120px',  '250px']} m={3}>
              <Text fontSize={[3, 5]} alignItems='center'>{selected.name}</Text>
            </Flex>
            <Flex width={['80px',  '180px']} cursor='pointer' alignItems='center' justifyContent='center' height={['120px',  '250px']} m={3}>
              <Text alignItems='center' data-artifact-type={artifactType} onClick={onChangeOption} data-testid={`grid-single-selection-view-change-name-${artifactType}`}>Change game</Text>
            </Flex>
          </Fragment>
        : (isLoading ? <GridSingleSelectionViewLoader /> : options.map(option => (
          <Flex width={['80px',  '180px']} cursor='pointer' data-testid={`grid-single-selection-view-${artifactType}-${option.id}`} data-artifact-type={artifactType} data-option-id={option.id} onClick={onSelectOption} alignItems='center' justifyContent='center' backgroundColor='white' height={['120px',  '250px']} m={3} key={option.id}>
            <Text fontSize={[3, 5]} alignItems='center'>{option.name}</Text>
          </Flex>
        )))}
      </Flex>
    </Flex>
  )
}

export default GridSingleSelectionView;