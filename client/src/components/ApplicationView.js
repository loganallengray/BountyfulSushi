import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import BountyList from "./bounty/BountyList";
import BountyDetails from "./bounty/BountyDetails";
import BountyAddForm from "./bounty/BountyAddForm";
import BountyEditForm from "./bounty/BountyEditForm";
import UserBountyList from "./bounty/userBounty/UserBountyList";
import NotFound from "./NotFound";
import UserBountyDetails from "./bounty/userBounty/UserBountyDetails";
import UserList from "./user/UserList";
import UserDetails from "./user/UserDetails";
import UserEditForm from "./user/UserEditForm";
import SushiList from "./sushi/SushiList";
import SushiDetails from "./sushi/SushiDetails";
import SushiAddForm from "./sushi/SushiAddForm";
import SushiEditForm from "./sushi/SushiEditForm";

const ApplicationView = ({ isLoggedIn, userProfile }) => {
    if (userProfile?.userType?.id === 1) {
        return (
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="bounties">
                        <Route index element={isLoggedIn ? <BountyList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":id" element={isLoggedIn ? <BountyDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="add" element={isLoggedIn ? <BountyAddForm /> : <Navigate to="/login" />} />
                        <Route path="edit/:id" element={isLoggedIn ? <BountyEditForm userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="user/:userId" element={isLoggedIn ? <UserBountyList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="user/:userId/:id" element={isLoggedIn ? <UserBountyDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="users">
                        <Route index element={isLoggedIn ? <UserList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":id" element={isLoggedIn ? <UserDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="edit/:id" element={isLoggedIn ? <UserEditForm userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="sushi">
                        <Route index element={isLoggedIn ? <SushiList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":id" element={isLoggedIn ? <SushiDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="add" element={isLoggedIn ? <SushiAddForm /> : <Navigate to="/login" />} />
                        <Route path="edit/:id" element={isLoggedIn ? <SushiEditForm userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="bounties">
                        <Route index element={isLoggedIn ? <BountyList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":id" element={isLoggedIn ? <BountyDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="user/:userId" element={isLoggedIn ? <UserBountyList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="user/:userId/:id" element={isLoggedIn ? <UserBountyDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="sushi">
                        <Route index element={isLoggedIn ? <SushiList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":id" element={isLoggedIn ? <SushiDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        )
    }
};

export default ApplicationView;