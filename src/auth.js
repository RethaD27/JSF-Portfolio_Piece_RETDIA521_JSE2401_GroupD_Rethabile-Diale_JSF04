export function requireAuth(to, from, next) {
  if (!localStorage.getItem('token')) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}