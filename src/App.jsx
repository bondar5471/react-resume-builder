import React from "react"
import { Container } from "@material-ui/core"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Home from "./components/Home/Home"

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
