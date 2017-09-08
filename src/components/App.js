import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'

class App extends Component {
  render () {
    console.log(this.props);
    return (
      <div>
        hello
      </div>
    )
  }
}

function stateProps (calendar) {
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

function dispatchProps (dispatch) {
  return {
    selectRecipe: data => dispatch(addRecipe(data)),
    remove: data => dispatch(removeFromCalendar(data))
  }
}

export default connect(stateProps, dispatchProps)(App)
