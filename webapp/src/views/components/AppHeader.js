import { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { clearAllState } from '../../store/actions/state';

class AppHeader extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	};

	render() {
		return (
		<header className="main-header">
			<a href="" className="logo">
				<span className="logo-lg"><b>Dashboard</b></span>
			</a>
			<nav className="navbar navbar-static-top">
				<a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"/>
				<span className="icon-bar"/>
				<span className="icon-bar"/>
			</a>

			<div className="navbar-custom-menu">
				<ul className="nav navbar-nav">
					<li>
						<a style={{ cursor: 'pointer' }} data-toggle="control-sidebar" onClick={ this.onSignout.bind(this) }>
							<i className="fa fa-sign-out"/>
						</a>
					</li>
				</ul>
			</div>
			</nav>
		</header>
		);
	}

	onSignout() {
		this.props.dispatch(clearAllState());
		browserHistory.push('/login');
	}
}

export default AppHeader;