import React, { useReducer, useCallback, useEffect } from 'react';
import ContactUs from '../components/templates/ContactUs';
import ProductAPI from '../services/products.api';
import PlatformAPI from '../services/platforms.api';
import TopicAPI from '../services/topics.api';
import {
  contactFormReducer, contactFormInitialState,
  SEARCH_INPUT_CHANGE,
  PRODUCT_SELECTION,
  PLATFORMS, PRODUCTS,
  PLATFORM_SELECTION, RESET_SELECTED_PRODUCT,
  RESET_SELECTED_PLATFORM
} from '../reducers/contact-form.reducer';

const ContactUsPage = () => {
  const [state, dispatch] = useReducer(contactFormReducer, contactFormInitialState)
  const onTextChange = useCallback((event) => dispatch({ type: SEARCH_INPUT_CHANGE, data: event.currentTarget.value }), [])

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
   * Fetch topic details on selection of a platform.
   */
  useEffect(() => {
    if(state.selectedPlatform.id) {
      (async function() {
        try{
          const response = await TopicAPI.fetch({params: { platform_id: state.selectedPlatform.id }})
          dispatch({ data: {
            topics: response.data
          }})
        } catch(err) {
          console.error(`error in platforms.api.`)
        }
      })()
    }
  }, [state.selectedPlatform.id])

  /**
   * Gets all the platforms on selection of product.
   */
  useEffect(() => {
    if(state.selectedProduct.id) {
      (async function() {
        try{
          const response = await PlatformAPI.fetch({params: { product_id: state.selectedProduct.id }})
          dispatch({ data: {
            platforms: response.data
          }})
        } catch(err) {
          console.error(`error in platforms.api.`)
        }
      })()
    }
  }, [state.selectedProduct.id])

  /**
   * Fetch products on page render and search query text change;
   */
  useEffect(() => {
    (async function() {
      try{
        const response = await ProductAPI.fetch({params: { query: state.searchQuery }})
        dispatch({ data: {
          products: response.data
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
      {...state}
    />
  )
}

export default ContactUsPage;