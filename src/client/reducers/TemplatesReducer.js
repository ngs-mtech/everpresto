import Immutable from 'immutable';
import TemplateActionTypes from '.././action_types/TemplateActionTypes';
import {matchesAttr} from '.././utils/immutable/IterableFunctions';

const matchesId = matchesAttr('_id');

const {
  ADD_PLACEHOLDER,
  CREATE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_SUCCESS,
  FETCH_TEMPLATES_SUCCESS,
  RESET_TEMPLATE_CREATED,
  RESET_TEMPLATE_BEING_EDITED,
  SET_TEMPLATE_BEING_EDITED,
  UPDATE_TEMPLATE_SUCCESS} = TemplateActionTypes;

const initialState = Immutable.fromJS({
  shouldFetchTemplates: true,
  templateBeingEdited: null,
  templateCreated: false,
  templates: []
});

export default function templatesReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {

    case CREATE_TEMPLATE_SUCCESS:
      // Make sure we set our template being edited to our just created one,
      // so we'll be able to edit and alter it right away
      return state.merge({
        templateBeingEdited: action.data.template,
        // Makes sure to refetch the templates to include the newly created one
        shouldFetchTemplates: true
      });

    case DELETE_TEMPLATE_SUCCESS:
      return state.update('templates', (templates) => {
        return templates.delete(
          templates.findIndex(matchesId(action.data.deletedTemplateId))
        );
      }); 

    case FETCH_TEMPLATES_SUCCESS:
      return state.merge({
        shouldFetchTemplates: false,
        templates: action.data.templates
      });

    case RESET_TEMPLATE_CREATED:
      return state.set('templateCreated', false);

    case RESET_TEMPLATE_BEING_EDITED:
      return state.set('templateBeingEdited', null);

    case SET_TEMPLATE_BEING_EDITED:
      // No need to convert to Immutable.js, the template being passed in is already
      // and Immutable.Map
      const template = Immutable.is(action.data.template)
        ? action.data.template
        : Immutable.fromJS(action.data.template);
      return state.set('templateBeingEdited', template);

    case UPDATE_TEMPLATE_SUCCESS:
      return state.merge({
        shouldFetchTemplates: true,
        templateBeingEdited: null
      });

    default:
      return state;
  }

}