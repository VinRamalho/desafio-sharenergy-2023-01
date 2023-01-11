import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useContext } from "react";
import ListUsers from "./pages/ListUsers/ListUsers";
import StatusCat from "./pages/StatusCat/StatusCat";
import RandomDog from "./pages/RandomDog/RandomDog";
import Login from "./pages/Login/Login";
import Crud from "./pages/Crud/Crud";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { AuthProvider, AuthContext } from "./Contexs/auth";

const AppRoutes = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const Private = ({ children }) => {
    const { authenticad, loading } = useContext(AuthContext);

    if (loading) {
      return (
        <div className="container">
          <Spin indicator={antIcon} />
        </div>
      );
    }

    if (!authenticad) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Private>
                <ListUsers />
              </Private>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/status-cat"
            element={
              <Private>
                <StatusCat />
              </Private>
            }
          />
          <Route
            exact
            path="/dog-random"
            element={
              <Private>
                <RandomDog />
              </Private>
            }
          />
          <Route
            exact
            path="/crud"
            element={
              <Private>
                <Crud />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
