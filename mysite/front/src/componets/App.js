import React, { Component } from 'react'
import { render } from 'react-dom'

export class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <h1 onClick={this.se}>react testing</h1>
            </div>
        )
    }
}

const appDiv = document.getElementById('app')
render(<App />, appDiv)

export default App
