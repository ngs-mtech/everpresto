import {createConstants} from 'create-reducer-redux';

export default createConstants([
  'CREATE_COLLECTION_SUCCESS',
  'DELETE_COLLECTION_SUCCESS',

  'FETCH_COLLECTION_PREVIEWS',
  'FETCH_COLLECTION_PREVIEWS_ERROR',
  'FETCH_COLLECTION_PREVIEWS_SUCCESS',

  'FETCH_COLLECTION_BEING_VIEWED_SUCCESS',

  'RESET_COLLECTION_BEING_EDITED',
  'RESET_COLLECTION_BEING_VIEWED',
  'RESET_SHOULD_FETCH_COLLECTIONS',
  'SET_COLLECTION_BEING_EDITED',
  'SET_COLLECTION_BEING_VIEWED',
  'UPDATE_COLLECTION_SUCCESS'
]);
