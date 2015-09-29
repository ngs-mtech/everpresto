import React from 'react';
import _ from 'lodash';

import NoteItem from './NoteItem';

import AppActions from '../.././actions/AppActions';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
  }
  _toggleNewNoteModal() {
    AppActions.toggleModal('newNote');
  }
  render() {
    let p = this.props;
    let content;

    if (p.notes.length > 0) {
      content = _.map(p.notes, (note, i) => <NoteItem note={note} key={i} />);
    } else {
      content = (
        <h3 className='placeholder-message'>
          No notes yet... Go ahead and
          <a onClick={this._toggleNewNoteModal}> add one!</a>
        </h3>
      );
    }

    return (
      <div className='notes-list-wrapper'>
        {content}
      </div>
    );
  }
}

NotesList.propTypes = {
  notes: React.PropTypes.array.isRequired
};