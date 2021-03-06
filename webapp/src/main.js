import 'babel-polyfill';
// stylus
import './styles/main.styl';
// web module
import 'jquery.slimscroll';
import 'adminlte';
import 'bootstrap-datetimepicker.min.js';

import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/index';
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

import http from './utils/http';
import { setupApp } from './commons/index';
import extension from './utils/extension';
import Root from './Root';

window.APP = {};
// extensions
extension();

/***
 * set globle variables
 */
function __globals() {
	APP.user = null;
	APP.menus = {};
	APP.conditions = [];
	APP.refs = {};
}

/***
 * render
 */
function __render() {
	render(
		<Root store={store} history={history} />,
		document.getElementById('root')
	);
	// fix
	$.AdminLTE.layout.fix();
	$.AdminLTE.layout.fixSidebar();
}

/*******************************************************************
 *  launch
/*******************************************************************/

$(function() {
	__globals();

	let user = sessionStorage.getItem('local-user');
	if(!user) {
		__render();
		browserHistory.push('/login');
	} else {
		// login
		http.get('/static/assets/login.json').then((result) => {
			setupApp(result.data);
			__render();
		});
	}
});