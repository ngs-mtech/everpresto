import Immutable from 'immutable';
import AppActionTypes from './../action_types/AppActionTypes';

const initialState = Immutable.fromJS({
  flash: {
    color: null,
    message: null
  }
});

// Do NOT mutate state passed in by doing `state = state.set(...)`, simply return `state.set(...)`

/**
 * The reducer for the `app` state in the store, not to be confused with the state of the entire app.
 *
 * @param  {Object} state - The `app` state section of the store.
 * @param  {Object} action - The return object of the action triggered by the `AppActionsCreator`
 * @return {Object} - The new state
 */
export default function appReducer(state = initialState, action) {

  switch (action.type) {

    // Creates a flash message
    case AppActionTypes.CREATE_FLASH_MESSAGE:
      return state.get('flash').merge(action.data);

    default:
      return state;

  }

}