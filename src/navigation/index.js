import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SchedulePage from '../schedulecalendar/SchedulePage';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

export const SessionContext = React.createContext();

export default function Navigation() {
    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'SET_USER':
            case 'SIGN_IN':
                return { ...prevState, user: action.user };
            case 'SIGN_OUT':
                return { ...prevState, user: null };
            default:
                return prevState;
        }
    }, { user: null });

    window.dispatch = dispatch;

    React.useEffect(() => {
        let user = localStorage.getItem('user');
        if (user != null) user = JSON.parse(user);
        dispatch({ type: 'SET_USER', user });
    }, []);

    const context = React.useMemo(() => ({
        user: state.user,
        signin: (username, password) => {
            fetch('http://localhost:7000/signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            })
                .then(data => data.json())
                .then(data => {
                    if (data.errmsg != null) {
                        alert(data.errmsg);
                        return;
                    }

                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch({ type: 'SIGN_IN', user: data });
                })
                .catch(err => {
                    alert("Algo salio mal");
                })
        },
        signout: () => {
            localStorage.clear();
            dispatch({ type: 'SIGN_OUT' });
        }
    }));

    return (
        <SessionContext.Provider value={context}>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={({ location }) => {
                            if (state.user == null) return <LoginScreen />;
                            else return <Redirect to="/" />;
                        }}
                    />
                    <Route
                        exact
                        path="/"
                        render={({ location }) => {
                            if (state.user == null) return <Redirect to="/login" />;
                            else return <HomeScreen />;
                        }}
                    />
                    <Route
                        exact
                        path="/schedule"
                        render={({ location }) => {
                            if (state.user == null) return <Redirect to="/login" />;
                            else return <SchedulePage />;
                        }}
                    />
                </Switch>
            </Router>
        </SessionContext.Provider>
    );
}
