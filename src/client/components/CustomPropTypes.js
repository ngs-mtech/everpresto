import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CustomPropTypes = {

  collection: ImmutablePropTypes.contains({
    _id: PropTypes.string.isRequired,
    _owner: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    documents: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  document: ImmutablePropTypes.map,

  template: ImmutablePropTypes.contains({
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    rawText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })

};

export default CustomPropTypes;