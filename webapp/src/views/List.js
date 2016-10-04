import React, { Component } from 'react';
import { connect } from 'react-redux';

//import BaseComponent from './generic/base-component';
import { clearAllState } from '../actions/state';
import TableView from './widgets/TableView';
import Confirm from './widgets/Confirm';
import Notifier from './widgets/Notifier';
import Search from './widgets/Search';

class List extends Component {
	constructor(props) {
		super(props);
		this.url = '/static/assets/list.json';
		this.pageSize = 10;
	}

	componentWillUnmount() {
		this.props.dispatch(clearAllState());
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.error && nextProps.error !== this.props.error) {
			this.refs.notifier.warning(nextProps.emsg);
		}
	}

	render() {
		return (
		<div className="list-view">
			<section className="content-header">
				<h1>List</h1>
			</section>
			<section className="content">
				<div className="box">
					<div className="box-header">
						<div className="box-tools">
							<a className="btn wrap primary" onClick={ this.onSearch.bind(this) }><i className="fa fa-search"/>Search</a>
						</div>
					</div>
					<TableView url={ this.url } pageSize={ this.pageSize } columns={ this.columns() }/>
				</div>
			</section>

			<Notifier ref="notifier"/>
			<Confirm ref="confirm"/>
			<Search ref="search" url={ this.url } pageSize={ this.pageSize } dispatch={ this.props.dispatch }/>
		</div>
		);
	}

	/***
	 * table columns
	 */
	columns() {
		return [{
			columnName: '_id',
			displayName: 'ID',
			customComponent: React.createClass({
				render: function() {
					return <span>{ this.props.data }</span>;
				}
			})
		}, {
			columnName: 'title',
			displayName: 'Title',
			customComponent: React.createClass({
				render: function() {
					return <span>{ this.props.data }</span>;
				}
			})
		}, {
            columnName: 'amount',
            displayName: 'Amount',
            customComponent: React.createClass({
                render: function() {
                    return <span>{ this.props.data }</span>;
                }
            })
		}, {
			columnName: 'status',
			displayName: '状态',
			customComponent: React.createClass({
				render: function() {
					const status = this.props.data;
					let el = '';
					switch (status) {
						case 0: {
							el = <span className="label label-primary">Unpaid</span>
							break;
						}
						case 1: {
							el = <span className="label label-success">Success</span>
							break;
						}
						case 2: {
							el = <span className="label label-warning">Refunded</span>
							break;
						}
						case 3: {
							el = <span className="label label-danger">Failed</span>
							break;
						}
					}
					return el;
				}
			})
		}, {
			columnName: 'updated_at',
			displayName: 'Last Updated',
			customComponent: React.createClass({
				render: function() {
					return <span>{ new Date(this.props.data*1).format('yyyy/MM/dd hh:mm') }</span>;
				}
			})
		}];
	}


	/***************************************************************************
	 * events
	 * ***************************************************************************/
	onSearch() {
		this.refs.search.show({
			items: [{
				label: 'Title',
				name: 'title',
				type: 'text'
			}, {
				label: 'DateInterval',
				name: 'created_at',
				type: 'dateinterval'
			}],
			callback: ((value) => {
				console.log(value);
			})
		});
	}
}

function mapStateToProps() {
	return {};
}

export default connect(mapStateToProps)(List);