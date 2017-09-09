import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Modal from 'react-modal'
import Loading from 'react-loading'

import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import * as API from '../utils/api'
import FoodList from './FoodList'
import ShoppingList from './ShoppingList'

class App extends Component {
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    loadingFood: false,
    ingredientModalOpen: false,
  }

  openFoodModal = ({ meal, day }) => (
    this.setState({
      foodModalOpen: true,
      meal,
      day
    })
  )

  closeFoodModal = () => (
    this.setState({
      foodModalOpen: false,
      meal: null,
      day: null,
      food: null
    })
  )

  searchFood = (e) => {
    if (!this.input.value) return

    e.preventDefault()

    this.setState({ loadingFood: true })

    API.fetchRecipes(this.input.value)
      .then(food => this.setState(() => ({
        food,
        loadingFood: false
      })))
  }

  onSelectFood = recipe => {
    const data = {
      day: this.state.day,
      meal: this.state.meal,
      recipe
    }
    this.props.selectRecipe(data)
    this.closeFoodModal()
  }

  openIngredientModalOpen = () => (
    this.setState({ ingredientModalOpen: true })
  )

  closeIngredientModalOpen = () => (
    this.setState({ ingredientModalOpen: false })
  )

  generateShoppingList = () => {
    return this.props.calendar
      .reduce((result, { meals }) => {
        const { breakfast, lunch, dinner } = meals

        breakfast && result.push(breakfast)
        lunch && result.push(lunch)
        dinner && result.push(dinner)

        return result
      }, [])
      .reduce((ings, { ingredientLines }) => {
        return [ ...ings, ...ingredientLines ]
      }, [])
  }

  render () {
    const { calendar, remove } = this.props
    const {
      foodModalOpen, loadingFood, food, ingredientModalOpen
    } = this.state
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>
        <div className='nav'>
          <h1 className='header'>UdaciMeals</h1>
          <button
            className='shopping-list'
            onClick={this.openIngredientModalOpen}>
              Shopping List
          </button>
        </div>

        <ul className='meal-types'>
          {mealOrder.map(mealType => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => (
              <h3 key={day} className='subheader'>
                {capitalize(day)}
              </h3>
            ))}
          </div>

          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map(meal => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img
                            src={meals[meal].image}
                            alt={meals[meal].label}
                          />
                          <button onClick={() => remove({meal, day})}>
                            Delete
                          </button>
                        </div>
                      : <button
                          className='icon-btn'
                          onClick={() => this.openFoodModal({meal, day})}>
                            <CalendarIcon size='30' color='#ccc' />
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading
                  className='loading'
                  delay={200}
                  type='spin'
                  color='#ccc'
                />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Find a meal
                    for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>

                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={input => this.input = input}
                      autoFocus
                      onKeyUp={e => {
                        e.keyCode === 13 && this.searchFood(e)
                      }}
                    />
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                        <ArrowRightIcon size='30' color='#ccc' />
                    </button>
                  </div>

                  {food !== null && (
                    <FoodList food={food} onSelect={this.onSelectFood} />
                  )}
                </div>}
          </div>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={ingredientModalOpen}
          onRequestClose={this.closeIngredientModalOpen}
          contentLabel='Modal'
        >
          {ingredientModalOpen && (
            <ShoppingList list={this.generateShoppingList()} />
          )}
        </Modal>
      </div>
    )
  }
}

function stateProps ({ calendar, food }) {
  const days = [
    'sunday', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday'
  ]
  return {
    calendar: days.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null

        return meals
      }, {})
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
