import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from '../../utils/test-utils';
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
