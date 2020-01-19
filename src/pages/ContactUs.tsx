import React, { useReducer, useCallback, useEffect } from 'react';
import ContactUs from '../components/templates/ContactUs';
import ProductAPI from '../services/products.api';
import PlatformAPI from '../services/platforms.api';
import TopicAPI from '../services/topics.api';
import IssueAPI from '../services/issues.api';
import FeedbackAPI from '../services/feedback.api';
import {
  contactFormReducer, contactFormInitialState,
  INPUT_CHANGE, SET_NO_ISSUES,
  PRODUCT_SELECTION,
  PLATFORMS, PRODUCTS,
  PLATFORM_SELECTION, RESET_SELECTED_PRODUCT,
  RESET_SELECTED_PLATFORM,
  TOPICS, ISSUE_SELECTION,
  TOPIC_SELECTION, ISSUES, RESET_STATE
} from '../reducers/contact-form.reducer';

const ContactUsPage = () => {
  const [state, dispatch] = useReducer(contactFormReducer, contactFormInitialState)

  const onTextChange = useCallback((event) => dispatch({ type: INPUT_CHANGE, data: {
    name: event.currentTarget.name, value: event.currentTarget.value
  }}), [])

  const onClickResetState = useCallback(() => dispatch({ type: RESET_STATE }), [])

  const onSelectOption = (event: React.SyntheticEvent<any>) => {
    const { optionId, artifactType } = event.currentTarget.dataset;
    if(artifactType === PRODUCTS) {
      dispatch({ type: PRODUCT_SELECTION, data: {
        id: parseInt(optionId)
      }})
    } else if(artifactType === PLATFORMS) {
      dispatch({ type: PLATFORM_SELECTION, data: {
        id: parseInt(optionId)
      }})
    } else if(artifactType === TOPICS) {
      dispatch({ type: TOPIC_SELECTION, data: {
        id: parseInt(optionId)
      }})
    } else if(artifactType === ISSUES) {
      dispatch({ type: ISSUE_SELECTION, data: {
        id: parseInt(optionId)
      }})
    }
  }

  const onFormSubmit = async () => {
    try {
      const {
        email, description, subject, selectedProduct: { id: product_id },
        selectedPlatform: { id: platform_id }, selectedTopic: {id: topic_id },
        selectedIssue: { id: issue_id }
      } = state;
      await FeedbackAPI.submitForm({
        data: {
          email, description, subject,
          product_id, platform_id, topic_id,
          issue_id
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
  useEffect(() => {
    if(state.topics.selected.id) {
      (async function() {
        try{
          const response = await IssueAPI.fetch({params: { topic_id: state.topics.selected.id }})
          if(response.data.error) {
            dispatch({type: SET_NO_ISSUES})
          } else {
            dispatch({ data: {
              issues: {
                options: response.data,
                selected: {}
              },
              noIssues: false
            }})
          }
        } catch(err) {
          console.error(`error in issues.api.`)
        }
      })()
    }
  }, [state.topics.selected.id])

  /**
   * Fetch topic details on selection of a platform.
   */
  useEffect(() => {
    if(state.platforms.selected.id) {
      (async function() {
        try{
          const response = await TopicAPI.fetch({params: { platform_id: state.platforms.selected.id }})
          dispatch({ data: {
            topics: {
              selected: {},
              options: response.data
            }
          }})
        } catch(err) {
          console.error(`error in platforms.api.`)
        }
      })()
    }
  }, [state.platforms.selected.id])

  /**
   * Gets all the platforms on selection of product.
   */
  useEffect(() => {
    if(state.products.selected.id) {
      (async function() {
        try{
          const response = await PlatformAPI.fetch({params: { product_id: state.products.selected.id }})
          dispatch({ data: {
            platforms: {
              options: response.data,
              selected: {}
            }
          }})
        } catch(err) {
          console.error(`error in platforms.api.`)
        }
      })()
    }
  }, [state.products.selected.id])

  /**
   * Fetch products on page render and search query text change;
   */
  useEffect(() => {
    (async function() {
      try {
        const response = await ProductAPI.fetch({params: { query: state.searchQuery }})
        dispatch({ data: {
          products: {
            options: response.data,
            selected: {}
          }
        }})
      } catch(err) {
        console.error(`error in products.api.`)
      }
    })()
  }, [state.searchQuery])

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