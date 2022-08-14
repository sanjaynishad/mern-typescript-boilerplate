export const AppRoutesConst = Object.freeze({
    // public
    login: 'login',
    register: 'register',

    // user role
    profile: 'profile',

    // admin role
    admin: '/admin', // absolute path
    dashboard: 'dashboard',
    users: 'users',
} as const);