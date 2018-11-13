import React from 'react'
import { connect } from 'react-redux'
import * as alerts from 'utils/alerts'

export default (ChildComponent) => {
  class ComposedComponent extends React.Component {

    componentDidMount() {
      this.shouldNavigateAway()
    }

    componentDidUpdate() {
      this.shouldNavigateAway()
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/login")
        alerts.error('You must be logged in to access this page.')
      }
    }

    render() {
      return <ChildComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  return connect(mapStateToProps)(ComposedComponent)
}


