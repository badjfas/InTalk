import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Nav from "./components/Common/Nav";

import { Add, Auth, Feed, Friends, Mypage, Rooms, Major, Notifications, GroupChat, PostDetail } from "./pages";

const LoggedInRoutes = ({ getNotifications, messageCount }) => {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/post/:id" component={PostDetail} />
                    <Route exact path="/friends" component={Friends} />
                    <Route exact path="/add" component={Add} />
                    <Route exact path="/messages" component={Rooms} />
                    <Route exact path="/mypage" component={Mypage} />
                    <Route exact path="/group" component={Major} />
                    <Route exact path="/groupchat/:id" component={GroupChat} />
                    <Route exact path="/notifications" component={Notifications} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Nav getNotifications={getNotifications} messageCount={messageCount} />
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

const AppRoutes = ({ isLogin, getNotifications, messageCount }) => {
    return isLogin ? (
        <LoggedInRoutes getNotifications={getNotifications} messageCount={messageCount} />
    ) : (
        <LoggedOutRoutes />
    );
};

export default AppRoutes;
