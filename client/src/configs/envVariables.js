const Reset = '\x1b[0m';
const FgYellow = '\x1b[33m';

// Set the environment
const APP_ENV = 'prod';
let APP_HOST = '';

// Choose API base URL
switch (APP_ENV) {
  case 'local':
    console.log('🔗 Connecting to Local Backend');
    APP_HOST = 'http://localhost:5000';
    break;

  case 'prod':
    console.log('🌐 Connecting to Render Backend');
    APP_HOST = 'https://socialconnect-backend.onrender.com';
    break;

  default:
    console.log('⚙️ Connecting to Default (Local)');
    APP_HOST = 'http://localhost:5000';
    break;
}

// Display connection info
console.log(FgYellow, `Environment: ${APP_ENV}`, Reset);
console.log(FgYellow, `API Host: ${APP_HOST}`, Reset);

export default APP_HOST;
