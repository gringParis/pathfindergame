
import React from 'react'
import ReactDom from 'react-dom'
//import Grid from "./components/grid"
require('./style/style.scss')

import { Provider } from "react-redux"
import gameContainerFn from "./containers/gameContainer"
//initialize a single gameLogic Object for the whole app
import gameLogic from "./gameLogic"
import storeFn from "./store"
//test gameLogic passed to redux and react
gameLogic.props.fromApp = true
//inject gameLogic to store
var store = storeFn(gameLogic)
var GameContainer = gameContainerFn(gameLogic)

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