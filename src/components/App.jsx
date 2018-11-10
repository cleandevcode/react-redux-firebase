import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from 'components/Home'
import Posts from 'components/Posts'
import HeaderNav from 'components/common/HeaderNav'
import SignUp from 'components/auth/SignUp'
import "assets/styles/app.scss"

class App extends React.Component {

  componentWillMount() {
    // firebaseApp.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log('logged in')
    //   } else {
    //     console.log('not logged in')
    //   }
    // })
  }

  render() {
    return (
      <div>
        <HeaderNav />
        <section className="app-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/posts" component={Posts} />
          <Route path="/signup" component={SignUp} />
        </section>
      </div>
    )
  }
}

export default connect(null)(App)
