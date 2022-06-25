import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store';
// import { positions, transitions, Provider as AlertProvider } from 'react-alert';
// import alertTemplate from 'react-alert-template-basic'
import 'mapbox-gl/dist/mapbox-gl.css'

// const options={
//   timeout:5000,
//   position:positions.TOP_CENTER,
//   transition:transitions.FADE
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <AlertProvider template={alertTemplate} {...options}> */}
    <App />
    {/* </AlertProvider> */}
  </Provider>

);

