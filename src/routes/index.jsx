import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Home } from '../components'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Home}/>
                <Redirect to = "/" />
            </Switch>
        </BrowserRouter>
    )
}
