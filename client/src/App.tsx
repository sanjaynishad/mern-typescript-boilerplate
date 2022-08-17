import 'antd/dist/antd.css';
import "./assets/styles/util.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import { AppRoutesConst } from './app-const';

import GuestLayout from './layouts/GuestLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import { PageLoader } from './components/PageLoader';
import { authProvider } from './api/AuthApi';
import { RequireAdmin } from './components/RequireAdmin';
import { RequireAuth } from './components/RequireAuth';

// public pages
const NotFoundPage = React.lazy(() => import("./pages/404"));
const RegisterPage = React.lazy(() => import("./pages/Register"));
const LoginPage = React.lazy(() => import("./pages/Login"));

// user auth pages
const ProfilePage = React.lazy(() => import("./pages/Profile"));

// admin pages
const AdminDashboardPage = React.lazy(() => import("./pages-admin/AdminDashboard"));
const UsersPage = React.lazy(() => import("./pages-admin/Users"));

const NotFoundSuspense = () => (<Suspense fallback="Not found!">
  <NotFoundPage />
</Suspense>);

function App() {
  authProvider.me();

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={authProvider.isLoggedIn() ? <MainLayout /> : <GuestLayout />}>
          <Route index element={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <h2>Home page</h2>
            </div>
          } />
          <Route path={AppRoutesConst.login} element={
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          } />
          <Route path={AppRoutesConst.register} element={
            <Suspense fallback={<PageLoader />}>
              <RegisterPage />
            </Suspense>
          } />

          {/* Auth Routes */}
          <Route path={AppRoutesConst.profile} element={
            <Suspense fallback={<PageLoader />}>
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            </Suspense>
          } />

          {/* Not Found */}
          <Route path="*" element={<NotFoundSuspense />} />
        </Route>

        {/* Admin Routes */}
        <Route path={AppRoutesConst.admin} element={<AdminLayout />} >
          <Route index element={<Navigate to={AppRoutesConst.dashboard} replace />} />

          <Route path={AppRoutesConst.dashboard} element={
            <Suspense fallback={<PageLoader />}>
              <RequireAdmin>
                <AdminDashboardPage />
              </RequireAdmin>
            </Suspense>
          } />
          <Route path={AppRoutesConst.users} element={
            <Suspense fallback={<PageLoader />}>
              <RequireAdmin>
                <UsersPage />
              </RequireAdmin>
            </Suspense>
          } />

          <Route path={AppRoutesConst.profile} element={
            <Suspense fallback={<PageLoader />}>
              <ProfilePage />
            </Suspense>
          } />

          <Route path="*" element={<NotFoundSuspense />} />
        </Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
