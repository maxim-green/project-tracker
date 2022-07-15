import React from 'react';
import { Navigate } from 'react-router-dom';
import ProjectPage from 'pages/ProjectPage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';

export type RouteType = {
  path: string
  component: React.ReactNode
}

export enum Routes {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/registration',
  PROJECT_DEFAULT= '/project',
  PROJECT= '/project/:projectId',
}

export const publicRoutes: RouteType[] = [
  { path: Routes.LOGIN, component: <LoginPage /> },
  { path: Routes.REGISTER, component: <RegistrationPage /> },
  { path: Routes.HOME, component: <Navigate to="/login" /> },
];

export const privateRoutes: RouteType[] = [
  { path: Routes.PROJECT_DEFAULT, component: <ProjectPage /> },
  { path: Routes.PROJECT, component: <ProjectPage /> },
  { path: Routes.HOME, component: <Navigate to="/project" /> },
];
