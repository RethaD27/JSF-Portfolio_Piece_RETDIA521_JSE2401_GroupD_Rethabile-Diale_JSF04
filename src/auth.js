/**
 * Middleware function to protect routes that require authentication.
 *
 * This function checks if a user is authenticated by verifying the presence of
 * a token in `localStorage`. If the token is missing, the user is redirected to the
 * login page. The current route's full path is passed as a query parameter, allowing
 * the user to be redirected back to the original page after successful login.
 *
 * @param {Object} to - The target Route Object being navigated to.
 * @param {Object} from - The current route being navigated away from.
 * @param {Function} next - The function to be called to resolve the hook. It accepts a single argument: the route to navigate to or `undefined` to proceed.
 */
export function requireAuth(to, from, next) {
  if (!localStorage.getItem('token')) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}
