import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {ProfilePage} from "./pages/ProfilePage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" >
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
