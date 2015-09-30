'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _sharedExitFormIcon = require('.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var _sharedInputField = require('.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var NewGroupForm = (function (_ReactTemplate) {
  _inherits(NewGroupForm, _ReactTemplate);

  function NewGroupForm(props) {
    _classCallCheck(this, NewGroupForm);

    _get(Object.getPrototypeOf(NewGroupForm.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_exitForm', '_toggleMember');
  }

  _createClass(NewGroupForm, [{
    key: '_addMember',
    value: function _addMember(member) {}
  }, {
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var p = this.props;
      var members = undefined;

      if (p.currentUser.contacts) {
        members = _lodash2['default'].map(p.currentUser.contacts, function (contact, i) {
          return _react2['default'].createElement(
            'li',
            { key: i, className: 'member-item', onClick: _this._toggleMember },
            _react2['default'].createElement(
              'strong',
              null,
              contact.lastName
            ),
            ', ',
            contact.firstName
          );
        });
      } else {
        members = _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h3',
            null,
            'You have no contacts'
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Click here to invite some people!'
          )
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'new-group-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        _react2['default'].createElement(
          'h2',
          null,
          'New Group'
        ),
        _react2['default'].createElement(_sharedInputField2['default'], {
          type: 'text',
          placeholder: 'Your Group Name'
        }),
        _react2['default'].createElement(
          'h2',
          null,
          'Add members'
        ),
        _react2['default'].createElement(
          'ul',
          { className: 'add-members-list' },
          members
        )
      );
    }
  }]);

  return NewGroupForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewGroupForm;

NewGroupForm.propTypes = {
  currentUser: _react2['default'].PropTypes.object.isRequired
};
module.exports = exports['default'];