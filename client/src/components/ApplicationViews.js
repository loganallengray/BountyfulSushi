import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import BountyList from "./bounty/BountyList";
import BountyDetails from "./bounty/BountyDetails";
import UserBountyList from "./bounty/UserBountyList";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="bounties">
                    <Route index element={isLoggedIn ? <BountyList /> : <Navigate to="/login" />} />
                    <Route path=":id" element={isLoggedIn ? <BountyDetails /> : <Navigate to="/login" />} />
                    <Route path="user/:userId" element={isLoggedIn ? <UserBountyList /> : <Navigate to="/login" />} />
                    {/* <Route path="add" element={isLoggedIn ? <VideoForm /> : <Navigate to="/login" />} /> */}
                </Route>
                {/* <Route path="users">
                    <Route path=":id" element={isLoggedIn ? <UserVideos /> : <Navigate to="/login" />} />
                </Route> */}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
};

export default ApplicationViews;