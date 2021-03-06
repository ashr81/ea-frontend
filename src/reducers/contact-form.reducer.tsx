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
export const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';
export const ADD_SUBJECT_INPUT = 'ADD_SUBJECT_INPUT';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const RESET_SELECTED_PRODUCT = 'RESET_SELECTED_PRODUCT';
export const RESET_SELECTED_PLATFORM = 'RESET_SELECTED_PLATFORM';
export const SET_NO_ISSUES = 'SET_NO_ISSUES';
export const SEARCH_QUERY_CHANGE = 'SEARCH_QUERY_CHANGE';

/**
 * Initial reducer state.
 */
export const contactFormInitialState = {
  searchQuery: '',
  products: {
    options: [],
    selected: {},
    isLoading: true
  },
  platforms: {
    options: [],
    selected: {},
    isLoading: false
  },
  topics: {
    options: [],
    selected: {},
    isLoading: false
  },
  issues: {
    options: [],
    selected: {},
    isLoading: false
  },
  noIssues: false, // true when selected topic doesn't have any issues linked to it.
  email: '',
  subject: '',
  description: '',
  isSubmittedSuccessfully: false
}

/**
 * 
 * @param state - existing state values from the reducer
 * @param action - changes as action under data parameter.
 */
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
    } case SEARCH_INPUT_CHANGE: {
      return {
        ...state,
        searchQuery: rest.data.value
      }
    } case PRODUCT_SELECTION: {
      const productId = rest.data.id;
      return {
        ...state,
        products: {
          ...state.products,
          selected: state.products.options.filter((product: {id: number}) => product.id === productId)[0]
        },
        platforms: {
          ...state.platforms,
          isLoading: true
        }
      }
    } case PLATFORM_SELECTION: {
      const platformId = rest.data.id;
      return {
        ...state,
        platforms: {
          ...state.platforms,
          selected: state.platforms.options.filter((platform: {id: number}) => platform.id === platformId)[0]
        },
        topics: {
          ...state.topics,
          isLoading: true
        }
      }
    } case TOPIC_SELECTION: {
      const topicId = rest.data.id
      return {
        ...state,
        topics: {
          ...state.topics,
          selected: state.topics.options.filter((topic: {id: number}) => topic.id === topicId)[0],
        },
        issues: {
          options: [],
          selected: {},
          isLoading: true
        },
        noIssues: false
      }
    } case ISSUE_SELECTION: {
      const issueId = rest.data.id
      const selectedIssue = state.issues.options.filter((issue: {id: number}) => issue.id === issueId)[0]
      return {
        ...state,
        issues: {
          ...state.issues,
          selected: selectedIssue,
        },
        noIssues: false,
        subject: `${state.products.selected.name} - ${state.platforms.selected.name} - ${state.topics.selected.name} - ${selectedIssue.name}`
      }
    } case RESET_SELECTED_PRODUCT: {
      return {
        ...state,
        platforms: {
          ...contactFormInitialState.platforms
        },
        products: {
          ...state.products,
          selected: {}
        },
        topics: {
          ...contactFormInitialState.topics
        },
        issues: {
          ...contactFormInitialState.issues
        },
        noIssues: false
      }
    } case RESET_SELECTED_PLATFORM: {
      return {
        ...state,
        platforms: {
          ...state.platforms,
          selected: {}
        },
        topics: {
          selected: {},
          options: []
        },
        issues: {
          selected: {},
          options: []
        },
        noIssues: false
      }
    } case SET_NO_ISSUES: {
      return {
        ...state,
        issues: {
          ...state.issues,
          isLoading: false
        },
        noIssues: true,
        subject: `${state.products.selected.name} - ${state.platforms.selected.name} - ${state.topics.selected.name}`
      }
    } default: {
      return {
        ...state,
        ...rest.data
      }
    }
  }
}