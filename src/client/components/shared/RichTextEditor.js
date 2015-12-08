import React, {Component, PropTypes} from 'react';
import ReactQuill, {Toolbar} from 'react-quill';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Card from '.././ui/Card';
import replaceWordWithHtml from '../.././utils/replaceWordWithHtml';

const defaultColors = [
  'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
  'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
  'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
  'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
  'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
  'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
  'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
  'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
  'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
  'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
  'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
  'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
].map((color) => ({ value: color }));

const customToolbarItems = [
  { label:'Formats', type:'group', items: [
    { label:'Size', type:'size', items: [
      { label:'Normal',  value:'10px' },
      { label:'Smaller', value:'13px' },
      { label:'Larger',  value:'18px' },
      { label:'Huge',    value:'32px' }
    ]},
    { type:'separator' },
    { label:'Alignment', type:'align', items: [
      { label:'', value:'center' },
      { label:'', value:'left' },
      { label:'', value:'right' },
      { label:'', value:'justify' }
    ]}
  ]},

  { label:'Text', type:'group', items: [
    { type:'bold', label:'Bold' },
    { type:'italic', label:'Italic' },
    { type:'strike', label:'Strike' },
    { type:'underline', label:'Underline' },
    { type:'separator' },
    { type:'color', label:'Color', items: defaultColors },
    { type:'background', label:'Background color', items: defaultColors },
    { type:'separator' },
    { type:'link', label:'Link' }
  ]},
  { label:'Blocks', type:'group', items: [
    { type:'bullet', label:'Bullet' },
    { type:'separator' },
    { type:'list', label:'List' }
  ]}
];

const PLACEHOLDER_TAG = 'mark';
const PLACEHOLDER_CLASS = 'template-placeholder';
const EMPTY_BODY = '<div><br></div>';
const displayName = 'RichTextEditor';

export default class RichTextEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string.isRequired,
    className: PropTypes.string,
    onBodyChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    templatePlaceholders: PropTypes.array,
    title: PropTypes.string.isRequired,
    titlePlaceholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    body: '',
    title: '',
    titlePlaceholder: 'Untitled Document',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.text !== findDOMNode(this.refs.quill.refs.editor).firstChild.innerHTML;
  }

  componentDidMount() {
    if (!Boolean(this.props.body)) this._showPlaceholder();
  }

  render() {
    const {body, className, title, titlePlaceholder} = this.props;
    const classes = classNames(className, displayName);

    return (
      <Card className={classes}>
        <ReactQuill 
          className={`${displayName}-main`}
          onChange={this._handleBodyChange}
          ref='quill'
          theme='snow'
          value={body}>
          <Toolbar
            items={customToolbarItems}
            key='toolbar'
            ref='toolbar'
            theme='snow'/>
          <input
            className={`${displayName}-main-title-input`}
            onChange={this._handleTitleChange}
            placeholder={titlePlaceholder}
            type='text'
            value={title}/>
          <div
            className={`${displayName}-main-content-input`}
            contentEditable
            dangerouslySetInnerHTML={{__html: body}}
            key='editor'
            ref='editor'></div>
        </ReactQuill>
      </Card>
    );
  }

  _handleTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  }

  _handleBodyChange = (body) => {
    if (body === EMPTY_BODY) this._showPlaceholder();
    this.props.onBodyChange(
      this._highlightPlaceholders(body, this.props.templatePlaceholders)
    );
  }

  _highlightPlaceholders = (text, placeholders = this.props.templatePlaceholders) => {
    return placeholders.reduce((alteredText, placeholder) => {
      return replaceWordWithHtml(text, placeholder, PLACEHOLDER_TAG, PLACEHOLDER_CLASS);
    }, text);
  }

  _showPlaceholder = () => {
    const editor = this.refs.quill.refs.editor;
    editor.firstChild.innerHTML = '';
  }

}