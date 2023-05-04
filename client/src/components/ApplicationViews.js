import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import BountyList from "./bounty/BountyList";
import HomePage from "./HomePage";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="bounties">
                    <Route index element={<BountyList />} />
                    {/* <Route index element={isLoggedIn ? <BountyList /> : <Navigate to="/login" />} /> */}
                    {/* <Route path="add" element={isLoggedIn ? <VideoForm /> : <Navigate to="/login" />} />
                    <Route path=":id" element={isLoggedIn ? <VideoDetails /> : <Navigate to="/login" />} /> */}
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