import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Nav from "./components/Common/BottomNav";
import TopNav from "./components/Common/TopNav";

// import Header from "./components/common/Header";
import { Auth, Chat, Feed, Friends, Rooms } from "./pages";

const LoggedInRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <TopNav />
                <div style={{ padding: "3rem 0 3rem 0" }}>
                    <Switch>
                        <Route exact path="/" component={Feed} />
                        <Route exact path="/friends" component={Friends} />
                        <Route exact path="/messages" component={Rooms} />
                        <Route exact path="/chat/:roomId/:toId" component={Chat} />
                    </Switch>
                </div>
                <Nav />
                <Redirect from="*" to="/" />
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
