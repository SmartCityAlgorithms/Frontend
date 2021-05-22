import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/authContext";
import {Loader} from "./components/Loader";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {token, login, logout, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, isAuthenticated
        }}>
            <section className="main">
                <Router>
                    <div className="container">
                        <div className="row">
                            {/*{ isAuthenticated && <Navbar /> }*/}
                            <div className="main__content-box col-12 col-md-8 col-sm-12 col-lg-8 justify-content-sm-center">
                                <div className="main__content-box-bg">
                                    <div className="main__content active-tab">
                                        {routes}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
                <div className="bgc-brown" />
                <div className="bgc-white" />
            </section>
        </AuthContext.Provider>
    );
}

export default App;
