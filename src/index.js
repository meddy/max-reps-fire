import ReactDOM from 'react-dom';

import createRouter from './bootstrap/createRouter';
import createStore from './bootstrap/createStore';

import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './bootstrap/firebaseServices';

const store = createStore();

ReactDOM.render(
  createRouter(store),
  document.getElementById('root')
);
