import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Calendar from "react-calendar";
import './index.css';
import axiosLibraRepository from "./custom-axios/axiosLibraRepository";
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "./custom-axios/axios";
import qs from 'qs'


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
