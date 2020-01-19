import { stat } from "fs";

// These are constant names used across the application.
export const PRODUCTS = 'products';
export const PLATFORMS = 'platforms';
export const TOPICS = 'topics';
export const ISSUES = 'issues';


// Below are the action types used.
export const RESET_STATE = 'RESET_STATE';
export const PRODUCT_SELECTION = 'PRODUCT_SELECTION';
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const PLATFORM_SELECTION = 'PLATFORM_SELECTION';
export const TOPIC_SELECTION = 'TOPIC_SELECTION';
export const ISSUE_SELECTION = 'ISSUE_SELECTION';
export const EMAIL_INPUT_CHANGE = 'EMAIL_INPUT_CHANGE';
export const ADD_SUBJECT_INPUT = 'ADD_SUBJECT_INPUT';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const RESET_SELECTED_PRODUCT = 'RESET_SELECTED_PRODUCT';
export const RESET_SELECTED_PLATFORM = 'RESET_SELECTED_PLATFORM';
export const SET_NO_ISSUES = 'SET_NO_ISSUES';

export const contactFormInitialState = {
  searchQuery: '',
  selectedProduct: {},
  products: [],
  selectedPlatform: {},
  platforms: [], // platforms available for the selected product.
  selectedTopic: {},
  topics: [], // topics available for the selected platforms.
  selectedIssue: {},
  issues: [],  // issues available for the selected topics.
  noIssues: false, // true when selected topic doesn't have any issues linked to it.
  email: '',
  subject: '',
  description: '',
  isSubmittedSuccessfully: false
}

export const contactFormReducer = (
  state: any,
  action: {type?: string; data?: any}
) => {
  const { type, ...rest } = action;
  switch(type) {
    case RESET_STATE: {
      return {
        ...contactFormInitialState
      }
    } case INPUT_CHANGE: {
      return {
        ...state,
        [rest.data.name]: rest.data.value
      }
    } case PRODUCT_SELECTION: {
      const productId = rest.data.id;
      return {
        ...state,
        selectedProduct: state.products.filter((product: {id: number}) => product.id === productId)[0]
      }
    } case PLATFORM_SELECTION: {
      const platformId = rest.data.id;
      return {
        ...state,
        selectedPlatform: state.platforms.filter((platform: {id: number}) => platform.id === platformId)[0]
      }
    } case TOPIC_SELECTION: {
      const topicId = rest.data.id
      return {
        ...state,
        selectedTopic: state.topics.filter((topic: {id: number}) => topic.id === topicId)[0],
        selectedIssue: {},
        issues: [],
        noIssues: false
      }
    } case ISSUE_SELECTION: {
      const issueId = rest.data.id
      const selectedIssue = state.issues.filter((issue: {id: number}) => issue.id === issueId)[0]
      return {
        ...state,
        selectedIssue,
        noIssues: false,
        subject: `${state.selectedProduct.name} - ${state.selectedPlatform.name} - ${state.selectedTopic.name} - ${selectedIssue.name}`
      }
    } case RESET_SELECTED_PRODUCT: {
      return {
        ...state,
        selectedPlatform: {},
        platforms: [],
        selectedProduct: {},
        topics: [],
        selectedTopic: {},
        issues: [],
        selectedIssue: {},
        noIssues: false
      }
    } case RESET_SELECTED_PLATFORM: {
      return {
        ...state,
        selectedPlatform: {},
        topics: [],
        selectedTopic: {},
        issues: [],
        selectedIssue: {},
        noIssues: false
      }
    } case SET_NO_ISSUES: {
      return {
        ...state,
        noIssues: true,
        subject: `${state.selectedProduct.name} - ${state.selectedPlatform.name} - ${state.selectedTopic.name}`
      }
    } default: {
      return {
        ...state,
        ...rest.data
      }
    }
  }
}