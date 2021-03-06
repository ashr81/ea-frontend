/**
 * Snapshot of the UI user see but logic between individual component is
 * decided by component from pages.
 */
import React, { Fragment } from 'react';
import { Flex, Text, Input } from '../atoms';
import { BackgroundWithHeader } from '../molecules';
import GridSingleSelectionView from '../organisms/GridSingleSelectionView';
import GridMultiSelectionView from '../organisms/GridMultiSelectionView';
import MailForm from '../organisms/MailForm';
import { PRODUCTS, PLATFORMS, TOPICS, ISSUES } from '../../reducers/contact-form.reducer';

type EntityProps = {
  options: Array<{name: string; id: number}>;
  selected: {id?: number; name?: string};
  isLoading: boolean;
}
interface Props {
  onTextChange: (event: React.SyntheticEvent) => void;
  products: EntityProps;
  searchQuery: string;
  onSelectOption: (event: React.SyntheticEvent) => void;
  onChangeOption: (event: React.SyntheticEvent) => void;
  onFormSubmit: () => void;
  platforms: EntityProps;
  topics: EntityProps;
  issues: EntityProps;
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
  onTextChange, searchQuery,
  products, platforms,
  onSelectOption, onChangeOption,
  topics, issues, noIssues, onClickResetState,
  email, subject, description, onFormSubmit, isSubmittedSuccessfully
}: Props) => {
  const showSearchInput = !products.selected.id
  const showPlatforms = !!products.selected.id;
  const showTopics = !!platforms.selected.id;
  const showIssues = !!topics.selected.id && !noIssues;
  const showMailForm = !!issues.selected.id || !!topics.selected.id && noIssues;
  if(isSubmittedSuccessfully) {
    return(
      <Flex mx={[2, 6]} height='100vh' alignItems='center' justifyContent='center'>
        <Text>Successfully submitted your form. Thank you.</Text>&nbsp;<Text color='blue' cursor='pointer' onClick={onClickResetState}> Click here </Text>&nbsp;<Text> to submit another request</Text>
      </Flex>
    )
  }
  return (
    <Fragment>
      <BackgroundWithHeader data-testid='case-information-header'>
        <Text as='h3' fontSize={[4, 8]} my={0} px={[2, 5]} py={3}>CASE INFORMATION</Text>
      </BackgroundWithHeader>
      <Flex flexDirection='column' position='relative' my={4}>
        <Text color='label' fontSize='xs' my={2} mx={[2, 6]}>*Indicates required field</Text>
        <Text fontSize={5} mx={[2, 6]}>What can we help you with?</Text>
        <Text fontSize={5} mx={[2, 6]} mb={3} data-testid='products-title'>Select the game or service.*</Text>
        {showSearchInput ? <Input my={4} fontSize={5} data-testid='product-search-query' name='searchQuery' placeholder='Search any EA product' mx={[2, 6]} onChange={onTextChange} value={searchQuery}/> : null}
          <GridSingleSelectionView
            {...products}
            onSelectOption={onSelectOption}
            onChangeOption={onChangeOption}
            artifactType={PRODUCTS}
          />
        {showPlatforms ? <Fragment>
          <Text fontSize={5} mx={[2, 6]} my={2} data-testid='platforms-title'>What platform are you playing on?*</Text>
            <GridSingleSelectionView
              {...platforms}
              onSelectOption={onSelectOption}
              onChangeOption={onChangeOption}
              artifactType={PLATFORMS}
            />
          </Fragment> : null}
        {showTopics ? <Fragment><Text fontSize={5} mx={[2, 6]} my={2} data-testid='topics-title'>Select topic*</Text>
          <GridMultiSelectionView
            {...topics}
            onSelectOption={onSelectOption}
            artifactType={TOPICS}
          /></Fragment> : null}
        {showIssues ? <Fragment><Text fontSize={5} mx={[2, 6]} my={2} data-testid='issues-title'>Select issue*</Text>
          <GridMultiSelectionView
            {...issues}
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