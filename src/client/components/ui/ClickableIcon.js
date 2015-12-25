import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const displayName = 'ui-ClickableIcon';

export default class ClickableIcon extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired
  };

  static defaultProps = {
    size: 24
  };

  render() {
    const {className, icon, onClick, size} = this.props;
    const classes = classNames(className, displayName);

    return (
      <button className={classes} onClick={onClick}>
        <Icon icon={icon} size={size}/>
      </button>
    );
  }
}
