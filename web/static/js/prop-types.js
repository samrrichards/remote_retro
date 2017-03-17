//
// Reusable, domain-specific prop types
//
import { PropTypes } from 'react';

// could be an enum if this is a fixed set of strings?
export const category = PropTypes.string

export const user = PropTypes.shape({
  given_name: PropTypes.string,
  online_at: PropTypes.number,
  facilitator: PropTypes.boolean,
})

export const users = PropTypes.arrayOf(PropTypes.object)

export const retroChannel = PropTypes.shape({
  on: PropTypes.func,
  push: PropTypes.func,
})

const idea = PropTypes.shape({
  category,
  body: PropTypes.string,
})

export const ideas = PropTypes.arrayOf(idea)

