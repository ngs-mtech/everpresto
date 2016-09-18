import React, {Component, PropTypes} from 'react';
import appConfig from '../../../../shared/config/app';
import classNames from 'classnames';
import moment from 'moment';
import CustomPropTypes from '../../CustomPropTypes';
import {truncateString} from '../../../utils/TextHelper';
import CollectionActionCreators from '../../../actions/CollectionActionCreators';
import Icon from 'ui-components/src/Icon';
import Clickable from 'ui-components/src/Clickable';
import Folder from 'ui-components/src/Folder';

const DEFAULT_TITLE = appConfig.collection.defaultTitle;
const ENTER_KEY = 13;
const displayName = 'CollectionPreviewCard';

export default class CollectionPreviewCard extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    collection: CustomPropTypes.collectionPreview.isRequired,
    height: PropTypes.number.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    maxTitleLength: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 150,
    maxTitleLength: 65,
    width: 200
  };

  render() {
    const {className, collection, contentClassName, height, width} = this.props;
    const classes = classNames(className, displayName);
    const contentClasses = classNames(contentClassName, `${displayName}-main`);
    const createdAt = moment(collection.get('createdAt')).format('MMM DD, YYYY');

    return (
      <Folder
        className={classes}
        contentClassName={contentClasses}
        height={height}
        width={width}>
        {this._renderTitle()}
        <div className={`${displayName}-main-options`}>
          <small className={`${displayName}-main-options-date`}>{createdAt}</small>
          <div>
            <Clickable onClick={this._handleEditCollection}>
              <Icon
                className={`${displayName}-main-options-icon`}
                name='create'
                size={20} />
            </Clickable>
            <Clickable onClick={this._handleDeleteCollection}>
              <Icon
                className={`${displayName}-main-options-icon`}
                name='delete'
                size={20} />
            </Clickable>
          </div>
        </div>
      </Folder>
    );
  }

  _handleEditCollection = () => {
    this.context.dispatch(
      CollectionActionCreators.setCollectionBeingEdited(this.props.collection)
    );
  }

  _handleUpdateCollection = (event) => {
    const title = event.target.value || DEFAULT_TITLE;

    this.context.dispatch(
      CollectionActionCreators.updateCollection(
        this.props.collection.get('id'),
        {title}
      )
    );
  }

  _handleEnterCollection = () => {
    this.context.router.push(`/dashboard/collections/${this.props.collection.get('id')}`);
  }

  _handleDeleteCollection = () => {
    // TODO: Add message saying how many documents are in this collection
    const confirmMessage = 'Are you sure you want to delete this folder? All it\'s documents will be deleted as well!';

    if (confirm(confirmMessage)) {
      return this.context.dispatch(
        CollectionActionCreators.deleteCollection(this.props.collection.get('id'))
      );
    }
  }

  _handleKeyPress = (event) => {
    if (event.which === ENTER_KEY) this._handleUpdateCollection(event);
  }

  _renderTitle = () => {
    const {collection, isBeingEdited, maxTitleLength} = this.props;
    const title = collection.get('title');

    if (isBeingEdited) {
      return (
        <input
          autoFocus
          className={`${displayName}-main-title-input`}
          defaultValue={title === DEFAULT_TITLE ? '' : title}
          onBlur={this._handleUpdateCollection}
          onKeyPress={this._handleKeyPress}
          ref='titleInput' />
      );
    }
    
    return (
      <button
        className={`${displayName}-main-title`}
        onClick={this._handleEnterCollection}>
        {truncateString(title, maxTitleLength)}
      </button>
    );
  }

}
