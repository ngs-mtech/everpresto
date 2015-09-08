import React from 'react';

import Spinner from './Spinner';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

// wrapper component for protecting authenticated components

export default (ComponentToBeRendered) => {  
  class ProtectedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { currentUser: AuthStore.getCurrentUser() };
      this._updateState = this._updateState.bind(this);
    }
    componentDidMount() {
      this._unsubscribe = AuthStore.listen(this._updateState);

      let jwt = localStorage.getItem('jwt');
      let unauthorized = !this.state.currentUser && !jwt;
      
      if (jwt) AuthActions.autoLoginUser(jwt);
      if (unauthorized) this.context.router.transitionTo('/login');
    }
    componentWillUnmount() {
      this._unsubscribe();
    }
    _updateState(state) {
      this.setState({ currentUser: state.currentUser });
    }
    render() {
      let s = this.state;

      if (s.currentUser) {
        return <ComponentToBeRendered {...this.props} currentUser={s.currentUser} />;
      } else {
        return <Spinner fullScreen={true} />;
      }
    }
  }

  ProtectedComponent.contextTypes = {
    router: React.PropTypes.func
  };

  return ProtectedComponent;
}