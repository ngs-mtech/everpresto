import http, {endpoints} from '../utils/http';
import CollectionActionTypes from './ActionTypes';
import {createFlashMessage} from '../../../actions/AppActionCreators';

export default {

  /**
   * Sends the AJAX request to create a collection on the server,
   * the reason why we don't send any data is because when a collection
   * is first created, it defaults to the title `Untitled` and the session
   * data is already stored on the server for `user_id`, so there's really
   * nothing for us to send
   *
   * @return {Function} - The thunk that makes the API call
   */
  create() {
    return (dispatch) => {
      dispatch();

      http.post(endpoints.collections.create.path)
        .then(({collection}) => {
          dispatch(this.createSuccess(collection));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  createSuccess(collection) {
    return {
      type: CollectionActionTypes.CREATE_COLLECTION_SUCCESS,
      data: {collection}
    };
  }

};
