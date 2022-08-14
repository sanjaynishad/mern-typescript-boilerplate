import 'antd/dist/antd.css';
import "./assets/styles/util.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import React, { Suspense } from 'react';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, } from 'react-router-dom';
import { AppRoutesConst } from './app-const';

import GuestLayout from './layouts/GuestLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import { PageLoader } from './components/PageLoader';

const NotFoundPage = React.lazy(() => import("./pages/404"));
const RegisterPage = React.lazy(() => import("./pages/Register"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const ProfilePage = React.lazy(() => import("./pages/Profile"));
const AdminDashboardPage = React.lazy(() => import("./pages-admin/AdminDashboard"));
const UsersPage = React.lazy(() => import("./pages-admin/Users"));

const NotFoundSuspense =
  () => (<Suspense fallback="Not found!">
    <NotFoundPage />
  </Suspense>);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Public Routes */}
          <Route element={<GuestLayout />}>
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

            {/* Not Found */}
            {/* <Route path="*" element={<NotFoundSuspense />} /> */}
          </Route>

          {/* Auth Routes */}
          <Route element={<MainLayout />}>
            <Route index element={<div>Home page <Link to="asd">Link2s</Link> </div>} />
            <Route path={AppRoutesConst.profile} element={
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            } />

            {/* Not Found */}
            <Route path="*" element={<NotFoundSuspense />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path={AppRoutesConst.admin} element={<AdminLayout />} >
          <Route index element={<Navigate to={AppRoutesConst.dashboard} replace />} />

          <Route path={AppRoutesConst.dashboard} element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboardPage />
            </Suspense>
          } />
          <Route path={AppRoutesConst.users} element={
            <Suspense fallback={<PageLoader />}>
              <UsersPage />
            </Suspense>
          } />

          <Route path="*" element={<NotFoundSuspense />} />
        </Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
