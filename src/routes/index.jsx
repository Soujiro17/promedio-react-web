import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Frecuencia, Home } from '../components'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Home}/>
                <Route exact path = "/tabla-frecuencia" component = {Frecuencia}/>
                <Redirect to = "/" />
            </Switch>
        </BrowserRouter>
    )
}
