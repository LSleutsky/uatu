import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('./layouts/main.tsx', [
    index('./routes/index.tsx'),
    route('/login', './routes/login.tsx'),
    route('/register', './routes/register.tsx')
  ])
] satisfies RouteConfig;
