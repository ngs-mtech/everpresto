import React, {PropTypes, Component} from 'react';
import {createFlashMessage} from '.././actions/AppActionCreators';

const handleFlashError = (ComposedComponent) => (class extends Component {

  static displayName = 'handleFlashError';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return <ComposedComponent {...this.props} handleFlashError={this._handleError} />;
  }

  _handleError = (err) => {
    this.context.dispatch(createFlashMessage('red', err));
  };

});

export default handleFlashError;
