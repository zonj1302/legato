import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={ store }>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
)
