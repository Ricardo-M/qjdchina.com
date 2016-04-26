import React, {Component, createFactory} from "react";
import {findDOMNode} from "react-dom";
import {createStore} from "redux"
import {parse} from "cookie";
import {afterSign, xhrTimeout} from "./util";
import {province, city, region} from "../component/area_config";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import Menu from "../component/menu";
import Crumb from "../component/crumb";
let store = createStore((state = [], action) => {
	if(state[action.type]){
		for(let i in action){
			state[action.type][i] = action[i];
		}
	}else{
		state[action.type] = action;
	}
	return state;
});
//进度条
class Progress extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/manage/auth/status",
			timeout : 2000,
		}).done(data => {
			afterSign(data, data => {
				let _option = data.data,
					option = this.state.option,
					userClass = this.state.userClass,
					index = (_option.length - 1) * 2;
				_option.map((list, index) => {
					option[index * 2].date = list.gmtCreated.split(/\s/)[0];
				});
				this.setState({
					index,
					option
				}, () => {
					userClass.setState({
						step : index > 0 ? 0 : 1
					});
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("认证进度", dialog);
		});
	}
	render(){
		let lists = [],
			index = this.state.index || 0,
			option = this.state.option;
		option && option.map((list, index) => {
			lists.push(
				<li key={index}>
					<span>
						{list.name}
					</span>
					{
						list.date ? <span>{list.date}</span> : []
					}
				</li>
			);
		});

		return (
			<div className="progress">
				<div className={`bar ${option[index].className} success`}>
					<p></p>
					<i></i>
					<i></i>
					<i></i>
					<ul>
						{lists}
					</ul>
				</div>
				<p>
					{option[index].message}
				</p>
			</div>
		);
	}
}
//进度条配置
Progress.defaultProps = {
	option : [
		{
			className : "step1",
			name : "认证申请",
			message : "您的审核已开始，我们将尽快安排专属服务人员与您联系"
		},
		{
			className : "step1",
			name : "提交资料",
			message : "您的审核已开始，我们将尽快安排专属服务人员与您联系"
		},
		{
			className : "step2",
			name : "完成提交",
			message : "您的资料已成功提交，请等待审核结果"
		},
		{
			className : "step2",
			name : "资料审核",
			message : "您的资料已成功提交，请等待审核结果"
		},
		{
			className : "step3",
			name : "审核成功",
			message : "您的认证已成功"
		}
	]
};
//表格－单行
class Tr extends Component{
	constructor(props){
		super(props);
		this.state = {
			option : props.option,
			index : props.index
		};
		store.dispatch({
			type : this.state.option.file_cate_code,
			component : this
		});
		this.handleUpload = () => {
			let option = this.state.option;
			store.getState().dialog.component.setState({
				option : {
					title : {
						iconClassName : "upload",
						name : "文件上传",
						btnClose : 1
					},
					content : createFactory(DialogContent)({}),
					message : 0
				},
				isShow : 1
			}, () => {
				store.getState().dialogContent.component.setState({
					code : this.state.option.file_cate_code,
					option : option.uploads
				});
			});
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			index = this.state.index,
			option = this.state.option,
			arrUpload = option.uploads;
		return (
			<tr className={option.isUploadRequired - 0 ? "required" : "normal"}>
				<td>
					{index}
				</td>
				<td>
					{option.file_cate_name}
				</td>
				<td>
					<span onClick={this.handleUpload}>
						{arrUpload.length ? "编辑" : "上传"}
					</span>
				</td>
			</tr>
		);
	}
}
//表格
class Table extends Component{
	constructor(props){
		super(props);
		this.state = {
			option : props.option
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			title = this.props.title,
			option = this.state.option;
		option.map((list, index) => {
			lists.push(
				<Tr key={index} option={list} index={index + 1} />
			);
		});
		return (
			<table>
				<thead>
					<tr>
						<th>
							{title.index}
						</th>
						<th>
							{title.name}
						</th>
						<th>
							{title.upload}
						</th>
					</tr>
				</thead>
				<tbody>
					{lists}
				</tbody>
			</table>
		);
	}
}
Table.defaultProps = {
	title : {
		index : "序号",
		name : "资料名称",
		upload : "操作"
	}
};
//认证表单
class Form extends Component{
	constructor(){
		super();
		this.state = {
			option : []
		};
		let dialog = store.getState().dialog.component;
		store.dispatch({
			type : "form",
			component : this
		});
		this.handleSubmit = () => {
			let option = this.state.option;
			if(option.filter((list, index) => {
				return list.uploads.length && list.isUploadRequired - 0;
			}).length < option.filter((list, index) => {
				return list.isUploadRequired - 0;
			}).length){
				dialog.setState({
					option : {
						title : {
							iconClassName : "warning",
							name : "错误提醒",
							btnClose : 1
						},
						content : 0,
						message : "请上传星标文件"
					},
					isShow : 1
				});
			}else{
				$.ajax({
					url : "/api/manage/authfile/submit",
					timeout : 2000
				}).done(data => {
					afterSign(data, data => {
						let t = setTimeout(() => {
							clearTimeout(t);
							location.href = "/manage/corporation";
						}, 1000);
					}, dialog);
				});
			}
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/manage/authfile/list",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				this.setState({
					option : data.data.authFileInfoLists
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("认证资料列表", dialog);
		});
	}
	render(){
		return (
			<form className="frmAuth">
				<Table option={this.state.option} />
				<input className="singleBtn" type="button" value="提交审核" onClick={this.handleSubmit} />
			</form>
		);
	}
}
class File extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialog = store.getState().dialog.component;
		this.handleDelete = () => {
			let id = this.state.option.fileId,
				code = this.state.code;
			$.ajax({
				url : `/api/manage/authfile/delete?fileCateCode=${code}&fileUploadId=${id}`,
				timeout : 2000
			}).done(data => {
				afterSign(data, data => {
					let _data = data.data;
					store.getState().dialogContent.component.setState({
						option : _data.uploads
					}, () => {
						let form = store.getState().form,
							formOption = form.component.state.option;
						formOption[formOption.findIndex((list, index) => {
							return list.file_cate_code === _data.file_cate_code;
						})].uploads = _data.uploads;
						form.component.setState({
							option : formOption
						});
					});
				});
			}).fail(xhr => {
				xhrTimeout("删除资料文件", dialog);
			});
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let index = this.state.index,
			fileId = this.state.option ? this.state.option.fileId : "";
		return (
			<li>
				<a href={`/api/stream/authfile?fileUploadId=${fileId}`} target="_blank">{`文件${index + 1}`}</a>
				<i className="del" onClick={this.handleDelete}></i>
			</li>
		);
	}
}
class Files extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			option = this.state.option;
		option && option.map((list, index) => {
			lists.push(
				<File index={index} key={index} option={list} code={this.state.code} />
			);
		});
		return (
			<ul>
				{lists}
			</ul>
		);
	}
}
class DialogContent extends Component{
	constructor(){
		super();
		this.state = {};
		let dialog = store.getState().dialog.component;
		store.dispatch({
			type : "dialogContent",
			component : this
		});
		this.handleUpload = e => {
			$(findDOMNode(this)).ajaxSubmit({
				type : "post",
				url : "/api/manage/authfile/upload",
				processData : 1,
				success : data => {
					afterSign(data, data => {
						$.ajax({
							type : "post",
							url : "/api/manage/authfile/reassure",
							xhrTimeout : 2000,
							data : {
								fileCateCode : this.state.code,
								filePath : data.data.authFile
							}
						}).done(data => {
							afterSign(data, data => {
								let __data = _data.data;
								this.setState({
									option : __data.uploads
								}, () => {
									let form = store.getState().form,
										formOption = form.component.state.option;
									formOption[formOption.findIndex((list, index) => {
										return list.file_cate_code === __data.file_cate_code;
									})].uploads = __data.uploads;
									form.component.setState({
										option : formOption
									}, () => {
										e.value = "";
									});
								});
							});
						}).fail(xhr => {
							xhrTimeout("上传资料文件", dialog);
						});
					}, dialog);
				}
			});
		};
	}
	render(){
		return (
			<form className="content">
				<Files option={this.state.option} code={this.state.code} />
				<div className="singleBtn">
					<input type="file" multiple="multiple" name="upload" onChange={this.handleUpload} />
				</div>
			</form>
		);
	}
}
class Main extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.handleClick = () => {
			this.setState({
				status : 1
			});
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/manage/getcredit",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				let _data = data.data;
				this.setState({
					authorized : _data.status === "DONE",
					creditLimit : _data.creditLine
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("授信额度", dialog);
		});
	}
	render(){
		let lists = [],
			infos,
			state = this.state,
			authorized = state.authorized,
			info = state.info;
		info && info.map((list, index) => {
			infos = [];
			list.option.map((_list, _index) => {
				infos.push(
					<p key={_index}>
						<span className="name">
							{`${_list.name}:`}
						</span>
						<span className="value">
							{_list.value}
						</span>
					</p>
				);
			});
			lists.push(
				<div className="info" key={index}>
					<h2>
						{list.name}
					</h2>
					{infos}
				</div>
			);
		});
		return (
			<div className="mainArea">
				<div className="w1000">
					<Menu index={0} />
					{
						state.status ? (
							<div className="content infoPart">
								<h1>
									{state.title}
								</h1>
								<a className={`auth ${state.authorized ? "authorized" : "notAuthorized"}`} onClick={this.handleClick}>
									<span>
										{state.authorized ? "通过认证" : "授信资料未认证"}</span>
									<br />
									<span>
										{state.authorized ? `信用额度${state.creditLimit}元` : "点击上传"}
									</span>
								</a>
								{lists}
							</div>
						) : (
							<div className="content authPart">
								<Crumb option={
									[
										{
											name : "企业信息",
											href : "/manage/corporation"
										},
										{
											name : "认证进度"
										}
									]
								} />
								<h1>
									{this.state.title}
								</h1>
								<Progress userClass={this} />
								{
									this.state.step ? <Form /> : []
								}
								<p>地址：杭州市滨江区秋溢路289号5楼</p>
								<p>电话：400-826-582</p>
								<p>邮编：310000</p>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}
Main.defaultProps = {
	title : "企业名称"
};
class Page extends Component{
	constructor(){
		super();
		this.state = {};
		store.dispatch({
			type : "page",
			component : this
		});
		this.getAuth = () => {
			$.ajax({
				url : "/api/manage/corporation/info",
				timeout : 2000
			}).done(data => {
				let _data = data.data,
					signType = data.code === "101001002" ? 1 : !(data.code - 0) ? 2 : 0;
				if(data.code === "101001002" || !(data.code - 0)){
					this.setState({
						signType,
						mobile : parse(document.cookie).username
					});
					this.refs.main.setState({
						title : _data.corpName,
						info : [
							{
								name : "基本资料",
								option : [
									{
										name : "工商注册号",
										value : _data.regCode
									},
									{
										name : "办公地址",
										value : `${province[_data.provinceCode]}${city[_data.provinceCode][_data.cityCode] || ""}${region[_data.cityCode] && region[_data.cityCode][_data.areaCode] || city[_data.provinceCode][_data.areaCode]}${_data.address}`
									}
								]
							},
							{
								name : "联系信息",
								option : [
									{
										name : "联系人",
										value : _data.contactName
									},
									{
										name : "手机号",
										value : _data.mobile
									}
								]
							}
						]
					});
				}
			}).fail(xhr => {
				xhrTimeout("个人信息", store.getState().dialog.component);
			});
		};
	}
	componentDidMount(){
		this.getAuth();
	}
	render(){
		let state = this.state;
		return (
			<div className="page">
				<Dialog store={store} />
				<Header store={store} signType={state.signType} mobile={state.mobile} />
				<Main ref="main" />
				<Footer />
			</div>
		);
	}
}
const init = (render) => {
	render(
		<Page />,
		document.querySelector(".main")
	);
}
export {
	Page,
	init
};