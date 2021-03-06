import React, {Component, createFactory} from "react";
import {parse} from "cookie";
import {afterSign, xhrTimeout} from "../pack/util";
import SignIn from "./signin";
import SignUp from "./signup";
class TopNav extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.state.store.dispatch({
			type : "topNav",
			component : this
		});
		let dialog,
			path,
			t,
			userClass;
		this.signIn = () => {
			dialog = this.state.store.getState().dialog.component;
			dialog.setState({
				option : {
					title : {
						iconClassName : "info",
						name : "用户登录",
						btnClose : this.state.auth ? () => {
							location.href = "/";
						} : 1
					},
					content : createFactory(SignIn)({
						dialog : dialog,
						referer : path
					}),
					message : 0
				},
				isShow : 1
			});
		};
		this.signOut = () => {
			dialog =  this.state.store.getState().dialog.component;
			userClass = this.state.userClass;
			$.ajax({
				url : "/api/user/signout",
				timeout : 2000
			}).done(data => {
				afterSign(data, data => {}, dialog);
				t = setTimeout(() => {
					clearTimeout(t);
					if(location.pathname === "/"){
						this.setState({
							mobile : 0
						}, () => {
							userClass.setState({
								signType : 0
							}, () => {
								userClass.updateSubscribers();
							});
						});
					}else{
						location.href = "/";
					}
				}, 1000);
			}).fail(xhr => {
				xhrTimeout("退出系统结果", dialog);
			});
		};
		this.signUp = () => {
			dialog = this.state.store.getState().dialog.component;
			dialog.setState({
				option : {
					title : {
						iconClassName : "info",
						name : "注册帐号",
						btnClose : 1
					},
					content : createFactory(SignUp)({
						dialog : dialog
					}),
					message : 0
				},
				isShow : 1
			});
		};
	}
	componentDidMount(){
		this.setState({
			mobile : parse(document.cookie).username
		});
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state,
			mobile = state.mobile,
			signType = state.signType >> 1;
		return (
			<div className="topNav">
				<div className="w1000">
					<a href="/introduction">联系我们</a>
					{
						mobile ? (
							<div className="anchor" onClick={this.signOut}>退出</div>
						) : (
							<div className="anchor" onClick={this.signUp}>注册</div>
						)
					}
					{
						mobile ? (
							<div className="info">
								<a href={signType ? "/manage/corporation" : "/user/join"}>{mobile}</a>
								<a href={signType ? "/manage/corporation" : "/user/join"}>个人中心</a>
								<a href="/user/findPwd">修改密码</a>
							</div>
						) : (
							<div className="anchor" onClick={this.signIn}>登录</div>
						)
					}
				</div>
			</div>
		);
	}
}
TopNav.defaultProps = {
	option : {
		mobile : "",
		authorized : 0
	}
};
class MenuBar extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			state = this.state,
			option = state.option;
		option.map((list, index) => {
			if(index === option.length - 1){
				lists.push(
					<a key={index} href={state.signType >> 1 ? "/manage/project" : "/user/join"}>
						{list.name}
					</a>
				);
			}else{
				lists.push(
					<a key={index} href={list.href}>
						{list.name}
					</a>
				);
			}
		});
		return (
			<div className="menuBar">
				<div className="w1000">
					<a className="logo" href="/"></a>
					<p className="headMenu">
						{lists}
					</p>
				</div>
			</div>
		);
	}
}
MenuBar.defaultProps = {
	option : [
		{
			name : "首页",
			href : "/"
		},
		{
			name : "产品介绍",
			href : "/product"
		},
		{
			name : "帮助中心",
			href : "/wiki"
		},
		{
			name : "关于我们",
			href : "/introduction"
		},
		{
			name : "我的项目",
			href : "/manage/project"
		}
	]
};
class Header extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.state.store.dispatch({
			type : "header",
			component : this
		});
		this.updateSubscribers = () => {
			let subscriber = this.state.subscriber;
			subscriber && subscriber.map(list => {
				list.forceUpdate();
			});
		};
	}
	componentDidMount(){
		this.setState({
			signType : parse(document.cookie).signtype
		});
	}
	componentDidUpdate(){
		this.updateSubscribers();
	}
	render(){
		let state = this.state;
		return (
			<div className="header">
				<TopNav store={state.store} signType={state.signType} userClass={this} />
				<MenuBar signType={state.signType} />
			</div>
		);
	}
}
Header.defaultProps = {
	signType : 0
};
export default Header;