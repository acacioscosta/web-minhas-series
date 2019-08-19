import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Genre from './Components/Genre/Genre'
import Series from './Components/Series/Series'

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/genres' component={Genre} />
        <Route exact path='/series' component={Series} />
      </div>
    </Router>
  );
}

export default App
