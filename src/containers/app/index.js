import React from 'react'
import { Route } from 'react-router-dom'
import AlbumSwitch from '../AlbumSwitch';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <div>
    <Router>
      <Route component={AlbumSwitch} />
    </Router>
  </div>
)

export default App
