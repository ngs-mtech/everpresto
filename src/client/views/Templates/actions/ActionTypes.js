import {createConstants} from 'create-reducer-redux';

export default createConstants([
  'CREATE_TEMPLATE_SUCCESS',
  'DELETE_TEMPLATE_SUCCESS',

  'FETCH_TEMPLATES',
  'FETCH_TEMPLATES_ERROR',
  'FETCH_TEMPLATES_SUCCESS',

  'RESET_TEMPLATE_BEING_EDITED',
  'SET_TEMPLATE_BEING_EDITED',

  'UPDATE_TEMPLATE',
  'UPDATE_TEMPLATE_ERROR',
  'UPDATE_TEMPLATE_SUCCESS'
]);
