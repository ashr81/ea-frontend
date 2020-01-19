/**
 * Test cases for the page contact-us.
 */
import React from 'react';
import { render, cleanup, waitForElement, fireEvent, wait } from '../../utils/test-utils';
import ContactUsPage from '../ContactUs';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { API_PRODUCTS, API_PLATFORMS, API_TOPICS, API_ISSUES } from '../../routes/api';
import { PRODUCTS, PLATFORMS, TOPICS, ISSUES } from '../../reducers/contact-form.reducer';
import productsJson from '../../.mock-data/products.json';
import platformsJson from '../../.mock-data/platforms.json';
import topicsJson from '../../.mock-data/topics.json';
import issuesJson from '../../.mock-data/issues.json';

let axiosAdapter: MockAdapter;

beforeEach(() => {
  axiosAdapter = new MockAdapter(axios)
})

afterEach(cleanup)

afterEach(() => {
  axiosAdapter && axiosAdapter.restore()
})

test('checks presence of header.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  const { getByText } = render(<ContactUsPage />);
  const caseInformationHeader = getByText('CASE INFORMATION')
  expect(caseInformationHeader).toBeDefined()
});

test('resolution of api calls on selection of products, platforms, topics and issues.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  axiosAdapter.onGet(API_PLATFORMS).reply(200, platformsJson)
  axiosAdapter.onGet(API_TOPICS).reply(200, topicsJson)
  axiosAdapter.onGet(API_ISSUES).reply(200, issuesJson)
  // getBy raises error when record not found. Doesn't work on cases to check for not presence.
  const { getByTestId, queryByTestId } = render(<ContactUsPage />)
  const productFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PRODUCTS}-2`))
  expect(productFromMockedData).toBeDefined()

  const platformFromMockedDataBeforeProductSelection = queryByTestId(`grid-single-selection-view-${PLATFORMS}-2`)
  expect(platformFromMockedDataBeforeProductSelection).not.toBeInTheDocument()

  fireEvent.click(productFromMockedData)
  const platformFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  expect(platformFromMockedData).toBeDefined()

  const topicFromMockedDataBeforePlatformSelection = queryByTestId(`grid-multi-selection-view-${TOPICS}-5`)
  expect(topicFromMockedDataBeforePlatformSelection).not.toBeInTheDocument()

  fireEvent.click(platformFromMockedData)
  const topicFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${TOPICS}-5`))
  expect(topicFromMockedData).toBeDefined()

  const issueFromMockedDataBeforePlatformSelection = queryByTestId(`grid-multi-selection-view-${ISSUES}-14`)
  expect(issueFromMockedDataBeforePlatformSelection).not.toBeInTheDocument()

  fireEvent.click(topicFromMockedData)
  const issueFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${ISSUES}-14`))
  expect(issueFromMockedData).toBeDefined()
})

test('on search input make an api in successive intervals.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).replyOnce(200, productsJson)
  const searchQuery = 'star';
  const filteredProductJson = productsJson.filter(product => product.name.indexOf(searchQuery) !== -1)
  axiosAdapter.onGet(API_PRODUCTS, { params: { query: searchQuery }}).reply(200, filteredProductJson)
  const { getByTestId, queryByTestId } = render(<ContactUsPage />);
  const searchInput = await waitForElement(() => getByTestId('product-search-query'))
  expect(searchInput).toBeInTheDocument()
  const productPresentBeforeSearch = await waitForElement(() => queryByTestId(`grid-single-selection-view-${PRODUCTS}-8`))
  const productContainsSearchTerm = await waitForElement(() => queryByTestId(`grid-single-selection-view-${PRODUCTS}-1`))
  expect(productPresentBeforeSearch).toBeInTheDocument()
  expect(productContainsSearchTerm).toBeInTheDocument()
  fireEvent.change(searchInput, {target: { name: 'searchQuery', value: searchQuery }})
  // product with ID: 8 has name madden
  const disappearedProduct = await wait(() => queryByTestId(`grid-single-selection-view-${PRODUCTS}-8`))
  const productInSearchTermAfterSearch = await waitForElement(() => queryByTestId(`grid-single-selection-view-${PRODUCTS}-1`))
  expect(productInSearchTermAfterSearch).toBeInTheDocument()
  expect(disappearedProduct).toBeUndefined()
})

test('tests presence of email, description and subject fields after all options selected.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  axiosAdapter.onGet(API_PLATFORMS).reply(200, platformsJson)
  axiosAdapter.onGet(API_TOPICS).reply(200, topicsJson)
  axiosAdapter.onGet(API_ISSUES).reply(200, issuesJson)
  // getBy raises error when record not found. Doesn't work on cases to check for not presence.
  const { getByTestId, queryByTestId } = render(<ContactUsPage />)

  const emailInputBeforeSelection = queryByTestId(`mail-form-input-email`)
  expect(emailInputBeforeSelection).not.toBeInTheDocument()

  const productFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PRODUCTS}-2`))
  fireEvent.click(productFromMockedData)
  const platformFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  fireEvent.click(platformFromMockedData)
  const topicFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${TOPICS}-5`))
  fireEvent.click(topicFromMockedData)
  const issueFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${ISSUES}-14`))
  fireEvent.click(issueFromMockedData)
  
  const emailInput = queryByTestId(`mail-form-input-email`)
  expect(emailInput).toBeInTheDocument()
  const subjectInput = queryByTestId(`mail-form-input-subject`)
  expect(subjectInput).toBeInTheDocument()
  const descriptionInput = queryByTestId(`mail-form-input-description`)
  expect(descriptionInput).toBeInTheDocument()
})

test('tests submission disabled until valid entries are entered into inputs.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  axiosAdapter.onGet(API_PLATFORMS).reply(200, platformsJson)
  axiosAdapter.onGet(API_TOPICS).reply(200, topicsJson)
  axiosAdapter.onGet(API_ISSUES).reply(200, issuesJson)
  // getBy raises error when record not found. Doesn't work on cases to check for not presence.
  const { getByTestId, queryByTestId } = render(<ContactUsPage />)

  const emailInputBeforeSelection = queryByTestId(`mail-form-input-email`)
  expect(emailInputBeforeSelection).not.toBeInTheDocument()

  const productFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PRODUCTS}-2`))
  fireEvent.click(productFromMockedData)
  const platformFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  fireEvent.click(platformFromMockedData)
  const topicFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${TOPICS}-5`))
  fireEvent.click(topicFromMockedData)
  const issueFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${ISSUES}-14`))
  fireEvent.click(issueFromMockedData)
  
  const emailInput = queryByTestId('mail-form-input-email')
  expect(emailInput).toBeInTheDocument()
  const subjectInput = queryByTestId('mail-form-input-subject')
  expect(subjectInput).toBeInTheDocument()
  const descriptionInput = queryByTestId('mail-form-input-description')
  expect(descriptionInput).toBeInTheDocument()
  const formSubmitButton = getByTestId('mail-form-button-submit')
  expect(formSubmitButton).toBeInTheDocument()
  expect(formSubmitButton).toBeDisabled()
})

test('clicking change name on products removes platforms from view.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  axiosAdapter.onGet(API_PLATFORMS).reply(200, platformsJson)
  // getBy raises error when record not found. Doesn't work on cases to check for not presence.
  const { getByTestId, queryByTestId } = render(<ContactUsPage />)

  const productFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PRODUCTS}-2`))
  fireEvent.click(productFromMockedData)
  const platformFromMockedData = await waitForElement(() => getByTestId(`platforms-title`))
  expect(platformFromMockedData).toBeInTheDocument()
  const changeProductNameText = getByTestId(`grid-single-selection-view-change-name-${PRODUCTS}`)
  expect(changeProductNameText).toBeInTheDocument()

  fireEvent.click(changeProductNameText)
  const platformsDataWhileChangingProduct = await wait(() => queryByTestId('platforms-title'))
  expect(platformsDataWhileChangingProduct).toBeUndefined()
})

test('clicking change name for platforms show all platforms as list view.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  axiosAdapter.onGet(API_PLATFORMS).reply(200, platformsJson)
  axiosAdapter.onGet(API_TOPICS).reply(200, topicsJson)
  // getBy raises error when record not found. Doesn't work on cases to check for not presence.
  const { getByTestId, queryByTestId } = render(<ContactUsPage />)

  const productFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PRODUCTS}-2`))
  fireEvent.click(productFromMockedData)
  const platformFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  fireEvent.click(platformFromMockedData)
  const platformFromMockedDataAfterRemoval = await wait(() => queryByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  expect(platformFromMockedDataAfterRemoval).toBeUndefined()
  const changePlatformNameText = getByTestId(`grid-single-selection-view-change-name-${PLATFORMS}`)
  expect(changePlatformNameText).toBeInTheDocument()

  fireEvent.click(changePlatformNameText)
  const platformFromMockedDataAfterReselection = await waitForElement(() => getByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  expect(platformFromMockedDataAfterReselection).toBeInTheDocument()
}, 10000)


test('tests feedback submission after all inputs are entered.', async () => {
  axiosAdapter.onGet(API_PRODUCTS).reply(200, productsJson)
  axiosAdapter.onGet(API_PLATFORMS).reply(200, platformsJson)
  axiosAdapter.onGet(API_TOPICS).reply(200, topicsJson)
  axiosAdapter.onGet(API_ISSUES).reply(200, issuesJson)
  // getBy raises error when record not found. Doesn't work on cases to check for not presence.
  const { getByTestId, queryByTestId } = render(<ContactUsPage />)

  const emailInputBeforeSelection = queryByTestId(`mail-form-input-email`)
  expect(emailInputBeforeSelection).not.toBeInTheDocument()

  const productFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PRODUCTS}-2`))
  fireEvent.click(productFromMockedData)
  const platformFromMockedData = await waitForElement(() => getByTestId(`grid-single-selection-view-${PLATFORMS}-2`))
  fireEvent.click(platformFromMockedData)
  const topicFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${TOPICS}-5`))
  fireEvent.click(topicFromMockedData)
  const issueFromMockedData = await waitForElement(() => getByTestId(`grid-multi-selection-view-${ISSUES}-14`))
  fireEvent.click(issueFromMockedData)
  
  const emailInput = queryByTestId('mail-form-input-email')
  expect(emailInput).toBeInTheDocument()
  fireEvent.change(emailInput, {target: {name: 'email', value: 'ashrith.com'}})
  const subjectInput = queryByTestId('mail-form-input-subject')
  expect(subjectInput).toBeInTheDocument()
  expect(subjectInput).toHaveValue('need-for-speed-heat - ps4 - report a bug - features')
  const descriptionInput = queryByTestId('mail-form-input-description')
  fireEvent.change(descriptionInput, {target: {name: 'description', value: 'Some Description'}})
  expect(descriptionInput).toBeInTheDocument()
  const formSubmitButton = getByTestId('mail-form-button-submit')
  expect(formSubmitButton).toBeInTheDocument()
  expect(formSubmitButton).toBeDisabled()
  fireEvent.change(emailInput, {target: {name: 'email', value: 'ashrith@ashrith.com'}})
  expect(formSubmitButton).toBeInTheDocument()
  expect(formSubmitButton).not.toBeDisabled()
})
