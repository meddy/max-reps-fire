import ReactDOM from 'react-dom';

import createStore from './bootstrap/createStore';
import createRouter from './bootstrap/createRouter';

import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './bootstrap/firebaseServices';
import './resources/spinner.css';

const store = createStore();

ReactDOM.render(
  createRouter(store),
  document.getElementById('root')
);
