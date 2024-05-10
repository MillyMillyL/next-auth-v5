/**
 * An array of routes that are accessible to the public
 * @type {string[]}
 * */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 * */
export const authRoutes = ["/auth/login", "/auth/signup", "/auth/error"];

/**
 * The prefix for API authentication routes.
 * Routes start with this prefix are used to API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
