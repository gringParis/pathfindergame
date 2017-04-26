
import React from 'react'
import ReactDom from 'react-dom'
//import Grid from "./components/grid"
require('./style/style.scss')

import { Provider } from "react-redux"
import GameContainer from "./containers/gameContainer"
//initialize a single gameLogic Object for the whole app ( this is more a test than a necessary design as gamelogic use external states and can finaly be initialized anywhere)
// redux is used to keep record of current states
//but i keep this patern for futur projects where it be usefull
import gameLogic from "./gameLogic"
import storeFn from "./store"
gameLogic.props.fromApp = true
var store = storeFn(gameLogic)


export default class App extends React.Component
{
	constructor(props)
	{
		super(props)
	}

	render()
	{
		return(
			<div class="testClass">
				<GameContainer />
			</div>
		)
	}
}
ReactDom.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))