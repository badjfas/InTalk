import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Nav from "./components/Common/Nav";

import { Add, Auth, Chat, Feed, Friends, Mypage, Rooms } from "./pages";

const LoggedInRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <div style={{}}>
                    <Switch>
                        <Route exact path="/" component={Feed} />
                        <Route exact path="/friends" component={Friends} />
                        <Route exact path="/add" component={Add} />
                        <Route exact path="/messages" component={Rooms} />
                        <Route exact path="/chat/:roomId/:toId" component={Chat} />
                        <Route exact path="/mypage" component={Mypage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
                <Nav />
            </BrowserRouter>
        </Fragment>
    );
};

const LoggedOutRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Auth} />
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
};

const AppRoutes = ({ isLogin }) => {
    return isLogin ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

export default AppRoutes;
