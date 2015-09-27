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

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _sharedReactTemplate = require('../.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _notesNoteForm = require('../.././notes/NoteForm');

var _notesNoteForm2 = _interopRequireDefault(_notesNoteForm);

var _sharedFileUploader = require('../.././shared/FileUploader');

var _sharedFileUploader2 = _interopRequireDefault(_sharedFileUploader);

var _sharedExitFormIcon = require('../.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var _sharedBlendedInputField = require('../.././shared/BlendedInputField');

var _sharedBlendedInputField2 = _interopRequireDefault(_sharedBlendedInputField);

var _actionsAppActions = require('../../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var NewArticleForm = (function (_ReactTemplate) {
  _inherits(NewArticleForm, _ReactTemplate);

  function NewArticleForm(props) {
    _classCallCheck(this, NewArticleForm);

    _get(Object.getPrototypeOf(NewArticleForm.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_handleUpdateFileUploads', '_handleTitleChange', '_handleDescriptionChange', '_exitForm');
  }

  _createClass(NewArticleForm, [{
    key: '_getInitialState',
    value: function _getInitialState() {
      return {
        files: []
      };
    }
  }, {
    key: '_handleTitleChange',
    value: function _handleTitleChange(title) {
      console.log('Title: ', title);
    }
  }, {
    key: '_handleDescriptionChange',
    value: function _handleDescriptionChange(description) {
      console.log('Desciption: ', description);
      // update the description of the new article
    }
  }, {
    key: '_handleUpdateFileUploads',
    value: function _handleUpdateFileUploads(files) {
      this.setState(files);
    }
  }, {
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;

      return _react2['default'].createElement(
        'div',
        { className: 'new-article-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        _react2['default'].createElement(_notesNoteForm2['default'], {
          onTitleChange: this._handleTitleChange,
          onDescriptionChange: this._handleDescriptionChange
        }),
        _react2['default'].createElement(_sharedFileUploader2['default'], {
          files: s.files,
          onUpdateFiles: this._handleUpdateFileUploads
        })
      );
    }
  }]);

  return NewArticleForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewArticleForm;

NewArticleForm.propTypes = {
  contacts: _react2['default'].PropTypes.array
};
module.exports = exports['default'];