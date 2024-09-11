import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import NoMatch from './noMatch';
import Splash from './Splash';
import PrivateRoute from './PrivateRoute';
import UserHeader from './UserHeader';
import Dashboard from '../user/Dashboard';
import AdminDashboard from '../admin/AdminDashboard';
import MainDashboard from '../main/MainDashboard';
import Login from '../main/Login';
import Register from '../main/Register';
import EmployeeBoard from '../admin/menu/EmployeeBoard';
import UserBoard from '../admin/menu/UserBoard';
import ProfileBoard from '../admin/menu/ProfileBoard';
import PostUser from '../admin/employees/PostUser';
import UpdateUser from '../admin/employees/UpdateUser';
import AddUser from '../admin/users/AddUser';
import PatchUser from '../admin/users/PatchUser';

const Routing = () => {
  const location = useLocation();

  // Determine the header based on the current path
  const headerComponent = () => {
    if (location.pathname === '/') {
      return <Splash />;
    } else if (location.pathname.startsWith('/login') || location.pathname.startsWith('/register')) {
      return <Splash />;
    } else if (location.pathname.startsWith('/user')) {
      return <UserHeader />;
    } else {
      return <Header />;
    }
  };

  return (
    <>
      {headerComponent()}
      <Routes>
        <Route path='/' element={<MainDashboard />} />
        <Route
          path='/user'
          element={
            <PrivateRoute allowedRoles={['USER']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/employees'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <EmployeeBoard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/users'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <UserBoard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/profile'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <ProfileBoard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/employees/employee'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <PostUser />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/employees/employee/:id'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <UpdateUser />
            </PrivateRoute>
          }
        />
        {/* user related files */}
        <Route
          path='/admin/users/user'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/users/user/:id'
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <PatchUser />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NoMatch />} />
        <Route path='/user/*' element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Routing;

