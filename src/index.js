import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/weather-icons.min.css';
import './css/weather-icons-wind.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
