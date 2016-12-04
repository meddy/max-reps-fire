import ReactDOM from 'react-dom';

import createStore from './bootstrap/createStore';
import createRouter from './bootstrap/createRouter';

import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './bootstrap/firebaseServices';

const store = createStore();

ReactDOM.render(
  createRouter(store),
  document.getElementById('root')
);
