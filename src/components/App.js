import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    return (
      <div>
        hello
      </div>
    )
  }
}

function mapState (calendar) {
  const days = [
    'sunday', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday'
  ]
  return {
    calendar: days.map(day => ({
      day,
      meals: { ...calendar[day] }
    }))
  }
}

export default connect(mapState)(App)
