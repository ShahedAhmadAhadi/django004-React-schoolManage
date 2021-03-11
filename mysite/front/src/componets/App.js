import React, { components } from 'react'
import { render } from 'react-dom'

export class App extends Component {
    render() {
        return (
            <div>
                <h1>react testing</h1>
            </div>
        )
    }
}

const app = document.getElementById('app')
render(<App />, app)

export default App
