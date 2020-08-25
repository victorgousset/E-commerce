import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Sky from 'react-sky';
import sakura from './bg-assets/sakura1.png';
// import sakura2 from './bg-assets/sakura2.png';

ReactDOM.render(
  <React.StrictMode>
    <Sky images={{0: sakura}} how={30} time={60} size={'120px'} background={''}/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
