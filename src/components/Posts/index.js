import React from 'react'
import { connect } from 'react-redux'
import requireAuth from 'components/requireAuth'

class Posts extends React.Component {
  render() {
    return (
      <div>this is posts index</div>
    )
  }
}

export default connect(null)(requireAuth(Posts))
