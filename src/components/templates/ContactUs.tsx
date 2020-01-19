import React, { Fragment, useCallback } from 'react';
import { Flex, Text, Input } from '../atoms';
import { BackgroundWithHeader } from '../molecules';
import GridAlbumSelectionView from '../organisms/GridSingleSelectionView';
import GridMultiSelectionView from '../organisms/GridMultiSelectionView';
import MailForm from '../organisms/MailForm';
import { PRODUCTS, PLATFORMS, TOPICS, ISSUES } from '../../reducers/contact-form.reducer';

type ListProps = Array<{name: string; id: number}>
type selectedProps = {id?: number; name?: string}
interface Props {
  onTextChange: (event: React.SyntheticEvent) => void;
  products: ListProps;
  selectedProduct: selectedProps;
  searchQuery: string;
  onSelectOption: (event: React.SyntheticEvent) => void;
  onChangeOption: (event: React.SyntheticEvent) => void;
  onFormSubmit: () => void;
  platforms: ListProps;
  selectedPlatform: selectedProps;
  topics: ListProps;
  selectedTopic: selectedProps;
  issues: ListProps;
  selectedIssue: selectedProps;
  /**
   * true when no issues are present for a selected topic.
   */
  noIssues: boolean;
  subject: string;
  email: string;
  description: string;
  isSubmittedSuccessfully: boolean;
  onClickResetState: () => void;
}

const ContactUs = ({
  onTextChange,
  searchQuery,
  products,
  platforms,
  selectedProduct,
  selectedPlatform,
  onSelectOption,
  onChangeOption,
  topics,
  selectedTopic,
  issues,
  selectedIssue,
  noIssues, onClickResetState,
  email, subject, description, onFormSubmit, isSubmittedSuccessfully
}: Props) => {
  const showSearchInput = !selectedProduct.id
  const showPlatforms = !!selectedProduct.id;
  const showTopics = !!selectedPlatform.id;
  const showIssues = !!selectedTopic.id && !noIssues;
  const showMailForm = !!selectedIssue.id || !!selectedTopic.id && noIssues;
  if(isSubmittedSuccessfully) {
    return(
      <Flex mx={6} height='100vh' alignItems='center' justifyContent='center'>
        <Text>Successfully submitted your form. Thank you.</Text><Text color='blue' cursor='pointer' onClick={onClickResetState}> Click here </Text><Text> to submit another request</Text>
      </Flex>
    )
  }
  return (
    <Fragment>
      <BackgroundWithHeader>
        <Text as='h3' fontSize='xxxxl' my={0} px={5} py={3}>CASE INFORMATION</Text>
      </BackgroundWithHeader>
      <Flex flexDirection='column' position='relative' my={4}>
        <Text color='label' fontSize='xs' my={2} mx={6}>*Indicates required field</Text>
        <Text fontSize='xl' mx={6}>What can we help you with?</Text>
        <Text fontSize='xl' mx={6} mb={3}>Select the game or service.*</Text>
        {showSearchInput ? <Input my={4} fontSize='xl' name='searchQuery' placeholder='Search any EA product' mx={6} onChange={onTextChange} value={searchQuery}/> : null}
          <GridAlbumSelectionView
            options={products}
            selectedOption={selectedProduct}
            onSelectOption={onSelectOption}
            onChangeOption={onChangeOption}
            artifactType={PRODUCTS}
          />
        {showPlatforms ? <Fragment><Text fontSize='xl' mx={6} my={2}>What platform are you playing on?*</Text>
          <GridAlbumSelectionView
            options={platforms}
            selectedOption={selectedPlatform}
            onSelectOption={onSelectOption}
            onChangeOption={onChangeOption}
            artifactType={PLATFORMS}
          />
          </Fragment> : null}
        {showTopics ? <Fragment><Text fontSize='xl' mx={6} my={2}>Select topic*</Text>
          <GridMultiSelectionView
            options={topics}
            selectedOption={selectedTopic}
            onSelectOption={onSelectOption}
            artifactType={TOPICS}
          /></Fragment> : null}
        {showIssues ? <Fragment><Text fontSize='xl' mx={6} my={2}>Select issue*</Text>
          <GridMultiSelectionView
            options={issues}
            selectedOption={selectedIssue}
            onSelectOption={onSelectOption}
            artifactType={ISSUES}
          /></Fragment> : null}
        {showMailForm ? 
          <MailForm
            email={email}
            subject={subject}
            description={description}
            onTextChange={onTextChange}
            onFormSubmit={onFormSubmit}
          /> : null
        }
      </Flex>
    </Fragment>
  )
}

export default ContactUs;