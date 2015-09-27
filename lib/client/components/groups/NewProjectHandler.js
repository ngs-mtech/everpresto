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

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _actionsNewProjectActions = require('../.././actions/NewProjectActions');

var _actionsNewProjectActions2 = _interopRequireDefault(_actionsNewProjectActions);

var _storesNewProjectStore = require('../.././stores/NewProjectStore');

var _storesNewProjectStore2 = _interopRequireDefault(_storesNewProjectStore);

var _projectsInvoiceSelector = require('./projects/InvoiceSelector');

var _projectsInvoiceSelector2 = _interopRequireDefault(_projectsInvoiceSelector);

var _sharedCurrencyInputField = require('.././shared/CurrencyInputField');

var _sharedCurrencyInputField2 = _interopRequireDefault(_sharedCurrencyInputField);

var _sharedInputFieldLabel = require('.././shared/InputFieldLabel');

var _sharedInputFieldLabel2 = _interopRequireDefault(_sharedInputFieldLabel);

var _sharedInputField = require('.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var _sharedMultiselectField = require('.././shared/MultiselectField');

var _sharedMultiselectField2 = _interopRequireDefault(_sharedMultiselectField);

var _sharedTextField = require('.././shared/TextField');

var _sharedTextField2 = _interopRequireDefault(_sharedTextField);

var _sharedContentEditable = require('.././shared/ContentEditable');

var _sharedContentEditable2 = _interopRequireDefault(_sharedContentEditable);

var NewProjectHandler = (function (_ReactTemplate) {
  _inherits(NewProjectHandler, _ReactTemplate);

  function NewProjectHandler(props) {
    _classCallCheck(this, NewProjectHandler);

    _get(Object.getPrototypeOf(NewProjectHandler.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_updateState', '_setTitle', '_setDescription', '_setBudget', '_updateAssignees');
  }

  _createClass(NewProjectHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesNewProjectStore2['default'].listen(this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesNewProjectStore2['default'].getState();
      return {
        project: state.project,
        errors: state.errors
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        project: state.project,
        errors: state.errors
      });
    }
  }, {
    key: '_setTitle',
    value: function _setTitle(title) {
      _actionsNewProjectActions2['default'].setTitle(title);
    }
  }, {
    key: '_setDescription',
    value: function _setDescription(description) {
      _actionsNewProjectActions2['default'].setDescription(description);
    }
  }, {
    key: '_setBudget',
    value: function _setBudget(value) {
      _actionsNewProjectActions2['default'].setBudget(value);
    }
  }, {
    key: '_updateAssignees',
    value: function _updateAssignees(employees) {
      _actionsNewProjectActions2['default'].setAssignees(employees);
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;
      var employees = [{ id: 1, name: 'Johnny Ji' }, { id: 2, name: 'Jason Derulo' }, { id: 3, name: 'Mom Agnes' }, { id: 4, name: 'My Little Bird' }];

      return _react2['default'].createElement(
        'div',
        { className: 'new-project-handler-wrapper' },
        _react2['default'].createElement(
          'div',
          { className: 'form-content' },
          _react2['default'].createElement(_sharedInputField2['default'], {
            error: null,
            label: 'Title',
            onInputChange: this._setTitle
          }),
          _react2['default'].createElement(
            'div',
            { className: 'left-content' },
            _react2['default'].createElement(_sharedTextField2['default'], {
              label: 'Description',
              onInputChange: this._setDescription
            }),
            _react2['default'].createElement(_projectsInvoiceSelector2['default'], {
              invoiceMethod: s.project.invoice.method,
              paymentDates: s.project.invoice.paymentDates
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'right-content' },
            _react2['default'].createElement(_sharedMultiselectField2['default'], {
              label: 'Assignees',
              error: s.errors.assignees,
              options: employees,
              onUpdateSelections: this._updateAssignees
            }),
            _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(_sharedInputFieldLabel2['default'], { labelClass: 'budget-label', labelName: 'Budget', shrinkLabel: false }),
              _react2['default'].createElement(_sharedCurrencyInputField2['default'], {
                className: 'budget-input',
                onChange: this._setBudget
              })
            )
          )
        )
      );
    }
  }]);

  return NewProjectHandler;
})(_sharedReactTemplate2['default']);

exports['default'] = NewProjectHandler;
module.exports = exports['default'];