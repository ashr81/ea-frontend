import React, { useReducer, useCallback, InputHTMLAttributes } from 'react';
import ContactUs from '../components/templates/ContactUs';
import ProductAPI from '../services/products.api';
import PlatformAPI from '../services/platforms.api';
import TopicAPI from '../services/topics.api';
import IssueAPI from '../services/issues.api';
import FeedbackAPI from '../services/feedback.api';
import useFetchAPI from '../customHooks/useFetchAPI';
import {
  contactFormReducer, contactFormInitialState,
  INPUT_CHANGE, SET_NO_ISSUES,
  PRODUCT_SELECTION, SEARCH_QUERY_CHANGE,
  PLATFORMS, PRODUCTS,
  PLATFORM_SELECTION, RESET_SELECTED_PRODUCT,
  RESET_SELECTED_PLATFORM,
  TOPICS, ISSUE_SELECTION,
  TOPIC_SELECTION, ISSUES, RESET_STATE
} from '../reducers/contact-form.reducer';

const ContactUsPage = () => {
  const [state, dispatch] = useReducer(contactFormReducer, contactFormInitialState)

  const onClickResetState = useCallback(() => dispatch({ type: RESET_STATE }), [])

  const onSelectOption = (event: React.SyntheticEvent<any>) => {
    const artifactToSelection = {
      [PRODUCTS]: PRODUCT_SELECTION,
      [PLATFORMS]: PLATFORM_SELECTION,
      [TOPICS]: TOPIC_SELECTION,
      [ISSUES]: ISSUE_SELECTION
    }
    const { optionId, artifactType }: {
      optionId: string; artifactType: keyof typeof artifactToSelection;
    } = event.currentTarget.dataset;
    if(artifactToSelection[artifactType]) {
      dispatch({ type: artifactToSelection[artifactType], data: {
        id: parseInt(optionId)
      }})
    }
  }

  const onFormSubmit = async () => {
    try {
      const {
        email, description, subject, products,
        platforms, topics, issues
      } = state;
      await FeedbackAPI.submitForm({
        data: {
          email, description, subject,
          product_id: products.selected.id,
          platform_id: platforms.selected.id,
          topic_id: topics.selected.id,
          issue_id: issues.selected.id
        }
      })
      dispatch({ data: { isSubmittedSuccessfully: true }})
    } catch(error) {
      console.error(`error sending email.`)
    }
  }

  const onChangeOption = (event: React.SyntheticEvent<any>) => {
    const { artifactType } = event.currentTarget.dataset;
    if(artifactType === PRODUCTS) {
      dispatch({ type: RESET_SELECTED_PRODUCT })
    } else if(artifactType === PLATFORMS) {
      dispatch({ type: RESET_SELECTED_PLATFORM })
    }
  }

  /**
   * Fetch issue details on selection of topics.
   */
  useFetchAPI(
    state.issues.isLoading,
    useCallback(() => IssueAPI.fetch({params: { topic_id: state.topics.selected.id }}), [state.topics.selected.id]),
    useCallback((response) => {
      if(response.data.error) {
        dispatch({type: SET_NO_ISSUES})
      } else {
        dispatch({ data: {
          issues: {
            options: response.data,
            selected: {},
            isLoading: false
          },
          noIssues: false
        }})
      }
    }, [])
  )

  /**
   * Fetch topic details on selection of a platform.
   */
  useFetchAPI(
    state.topics.isLoading,
    useCallback(() => TopicAPI.fetch({params: { platform_id: state.platforms.selected.id }}), [state.platforms.selected.id]),
    useCallback((response) => {
      dispatch({ data: {
        topics: {
          selected: {},
          options: response.data,
          isLoading: false
        }
      }})
    }, [])
  )

  /**
   * Gets all the platforms on selection of product.
   */
  useFetchAPI(
    state.platforms.isLoading,
    useCallback(() => PlatformAPI.fetch({params: { product_id: state.products.selected.id }}), [state.products.selected.id]),
    useCallback((response) => {
      dispatch({ data: {
        platforms: {
          options: response.data,
          selected: {},
          isLoading: false
        }
      }})
    }, [])
  )

  /**
   * Fetch products on page render and search query text change;
   */
  useFetchAPI(
    state.products.isLoading,
    useCallback(() => ProductAPI.fetch({params: { query: state.searchQuery }}), [state.searchQuery]),
    useCallback((response) => {
      dispatch({ data: {
        products: {
          options: response.data,
          selected: {},
          isLoading: false
        }
      }})
    }, [])
  )

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    dispatch({ 
      type: name === 'searchQuery' ? SEARCH_QUERY_CHANGE : INPUT_CHANGE, data: { name, value }
    })
  }

  return (
    <ContactUs
      onTextChange={onTextChange}
      onSelectOption={onSelectOption}
      onChangeOption={onChangeOption}
      onFormSubmit={onFormSubmit}
      onClickResetState={onClickResetState}
      {...state}
    />
  )
}

export default ContactUsPage;