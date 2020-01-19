/**
 * Custom Hook that makes an API call when the
 * loading flag is updated to true from where it is called.
 */
import { useEffect } from 'react';

type APIFunc = () => Promise<{data: {}}>;
type onSuccess = (response: {
  data: {
    error?: {}
  }}) => any;

const useFetchAPI = (
  isLoading: boolean,
  apiFunc: APIFunc,
  onSuccess: onSuccess
)  => {
  useEffect(() => {
    if(isLoading) {
      (async function() {
        try {
          const response = await apiFunc()
          onSuccess(response)
        } catch(err) {
          console.log(`cannot fetch results.`)
        }
      })();
    }
  }, [isLoading])
  return { isLoading }
}

export default useFetchAPI;