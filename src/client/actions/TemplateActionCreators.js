import apiEndpoints from '.././apiEndpoints';
import ApiCaller from '.././utils/ApiCaller';
import AppActionCreators from './AppActionCreators';
import TemplateActionTypes from './../action_types/TemplateActionTypes';

const TemplateActionCreators = {

  /**
   * Sends the AJAX request to create the template on the server
   *
   * @param  {Immutable.Map} template - The map containing the template details
   * @return {Function}               - The thunk that makes the API call
   */
  createTemplate(template) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.templates.create.method,
        url: apiEndpoints.templates.create.path,
        data: {template}
      })
        .then((response) => {
          dispatch(this.createTemplateSuccess(response.data.template));
        })
        .catch((response) => {
          dispatch(AppActionCreators.createFlashMessage('red', response.message));
        });
    };
  },


  /**
   * Handles the successful return of a new template write
   *
   * @param  {Object} template - The recently created template
   * @return {Object}          - The data passed to the Template Reducer
   */
  createTemplateSuccess(template) {
    return {
      type: TemplateActionTypes.CREATE_TEMPLATE_SUCCESS,
      data: {template}
    };
  },


  /**
   * Fetches the templates for the current user
   *
   * @return {Function} - The thunk that makes the API call
   */
  fetchTemplates() {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.templates.index.method,
        url: apiEndpoints.templates.index.path
      })
        .then()
        .catch();
    };
  }

}

export default TemplateActionCreators;