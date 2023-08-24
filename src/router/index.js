import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
  },
  {
    path: '/MQTT',
    name: 'MQTT',
    component: () => import(/* webpackChunkName: "about" */ '../views/MQTTView.vue'),
  },
  {
    path: '/WebSocket',
    name: 'WebSocket',
    component: () => import(/* webpackChunkName: "about" */ '../views/WebSocketView.vue'),
  },
  {
    path: '/Modbus',
    name: 'Modbus',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModbusView.vue'),
  },
  {
    path: '/COAP',
    name: 'COAP',
    component: () => import(/* webpackChunkName: "about" */ '../views/COAPView.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue'),
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import(/* webpackChunkName: "about" */ '../views/test2.vue'),
  },
  {
    path: '/OPCUA',
    name: 'OPCUA',
    component: () => import(/* webpackChunkName: "about" */ '../views/OPCUAView.vue'),
  },
  {
    path: '/IoTCore',
    name: 'IoTCore',
    component: () => import(/* webpackChunkName: "about" */ '../views/IoTCoreView.vue'),
  },
  {
    path: '/GRPC',
    name: 'GRPC',
    component: () => import(/* webpackChunkName: "about" */ '../views/GRPCView.vue'),
  },
  {
    path: '/Documentation',
    name: 'Documentation',
    component: () => import(/* webpackChunkName: "about" */ '../views/Documentation.vue'),
  },
  {
    path: '/HTTPS',
    name: 'HTTPS',
    component: () => import(/* webpackChunkName: "about" */ '../views/HTTPSView.vue'),
  },
  
  {
    path: '/Monitor',
    name: 'Monitor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Monitor.vue'),
    meta: {
      requiresAuth: true, // Add the 'requiresAuth' meta field to the route
    },
  },


  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the bearer token is present
    //
    document.title = to.meta.title || 'Manufacturing SCADA';

    const sessionCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_Token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //console.log(sessionCookie);
    const token = sessionCookie; // Retrieve the token from local storage or any other storage mechanism

    if (token) {
      // Token exists, allow access to the route
      next();
    } else {
      // Token doesn't exist, redirect to the login page or display an error
      next('/login');
    }
  } else {
    // Route doesn't require authentication, allow access
    next();
  }
});

export default router;
