webpackJsonp([3],{0:function(e,t,n){"use strict";var a=n(297),o=n(154);(0,a.init)(o.render)},177:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(2),c=a(u),s=function(e){function t(e){return o(this,t),r(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),i(t,[{key:"render",value:function(){var e=this.props;return c["default"].createElement("a",{className:"case "+e.className+(this.props.userClass.props.index===this.props.index?" current":" normal"),href:e.href},c["default"].createElement("i",null),c["default"].createElement("span",null,e.name))}}]),t}(u.Component),f=function(e){function t(e){return o(this,t),r(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),i(t,[{key:"render",value:function(){var e=this,t=[],n=this.props.option;return n.map(function(n,a){t.push(c["default"].createElement(s,{name:n.name,className:n.className,href:n.href,index:a,key:a,userClass:e}))}),c["default"].createElement("div",{className:"menu"},t)}}]),t}(u.Component);t["default"]=f,f.defaultProps={option:[{name:"企业信息",className:"corporation",href:"/manage/corporation"},{name:"我的项目",className:"project",href:"/manage/project"},{name:"我的订单",className:"bill",href:"/manage/bill"},{name:"我的合同",className:"contract",href:"/manage/contract"},{name:"合作厂家",className:"manufacturer",href:"/manage/manufacturer"}]}},297:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.Page=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(2),c=a(u),s=n(154),f=n(155),p=n(168),d=n(173),m=a(d),h=n(176),v=a(h),y=n(175),g=a(y),E=n(177),b=a(E),C=n(298),S=a(C),O=(0,f.createStore)(function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];if(e[t.type])for(var n in t)e[t.type][n]=t[n];else e[t.type]=t;return e}),j=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return l(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t=O.getState().dialog.component;$.ajax({url:"/api/manage/auth/status",timeout:2e3}).done(function(n){(0,p.afterSign)(n,function(t){var n=t.data,a=e.state.option,o=e.state.userClass,r=2*(n.length-1);n.map(function(e,t){a[2*t].date=e.gmtCreated.split(/\s/)[0]}),e.setState({index:r,option:a},function(){o.setState({step:r>0?0:1})})},t)}).fail(function(e){(0,p.xhrTimeout)("认证进度",t)})}},{key:"render",value:function(){var e=[],t=this.state.index||0,n=this.state.option;return n&&n.map(function(t,n){e.push(c["default"].createElement("li",{key:n},c["default"].createElement("span",null,t.name),t.date?c["default"].createElement("span",null,t.date):[]))}),c["default"].createElement("div",{className:"progress"},c["default"].createElement("div",{className:"bar "+n[t].className+" success"},c["default"].createElement("p",null),c["default"].createElement("i",null),c["default"].createElement("i",null),c["default"].createElement("i",null),c["default"].createElement("ul",null,e)),c["default"].createElement("p",null,n[t].message))}}]),t}(u.Component);j.defaultProps={option:[{className:"step1",name:"认证申请",message:"您的审核已开始，我们将尽快安排专属服务人员与您联系"},{className:"step1",name:"提交资料",message:"您的审核已开始，我们将尽快安排专属服务人员与您联系"},{className:"step2",name:"完成提交",message:"您的资料已成功提交，请等待审核结果"},{className:"step2",name:"资料审核",message:"您的资料已成功提交，请等待审核结果"},{className:"step3",name:"审核成功",message:"您的认证已成功"}]};var N=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state={option:e.option,index:e.index},O.dispatch({type:n.state.option.file_cate_code,component:n}),n.handleUpload=function(){var e=n.state.option;O.getState().dialog.component.setState({option:{title:{iconClassName:"upload",name:"文件上传",btnClose:1},content:(0,u.createFactory)(w)({}),message:0},isShow:1},function(){O.getState().dialogContent.component.setState({code:n.state.option.file_cate_code,option:e.uploads})})},n}return l(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this.state.index,t=this.state.option,n=t.uploads;return c["default"].createElement("tr",{className:t.isUploadRequired-0?"required":"normal"},c["default"].createElement("td",null,e),c["default"].createElement("td",null,t.file_cate_name),c["default"].createElement("td",null,c["default"].createElement("span",{onClick:this.handleUpload},n.length?"编辑":"上传")))}}]),t}(u.Component),_=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state={option:e.option},n}return l(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.props.title,n=this.state.option;return n.map(function(t,n){e.push(c["default"].createElement(N,{key:n,option:t,index:n+1}))}),c["default"].createElement("table",null,c["default"].createElement("thead",null,c["default"].createElement("tr",null,c["default"].createElement("th",null,t.index),c["default"].createElement("th",null,t.name),c["default"].createElement("th",null,t.upload))),c["default"].createElement("tbody",null,e))}}]),t}(u.Component);_.defaultProps={title:{index:"序号",name:"资料名称",upload:"操作"}};var k=function(e){function t(){o(this,t);var e=r(this,Object.getPrototypeOf(t).call(this));e.state={option:[]};var n=O.getState().dialog.component;return O.dispatch({type:"form",component:e}),e.handleSubmit=function(){var t=e.state.option;t.filter(function(e,t){return e.uploads.length&&e.isUploadRequired-0}).length<t.filter(function(e,t){return e.isUploadRequired-0}).length?n.setState({option:{title:{iconClassName:"warning",name:"错误提醒",btnClose:1},content:0,message:"请上传星标文件"},isShow:1}):$.ajax({url:"/api/manage/authfile/submit",timeout:2e3}).done(function(e){(0,p.afterSign)(e,function(e){var t=setTimeout(function(){clearTimeout(t),location.href="/manage/corporation"},1e3)},n)})},e}return l(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t=O.getState().dialog.component;$.ajax({url:"/api/manage/authfile/list",timeout:2e3}).done(function(n){(0,p.afterSign)(n,function(t){e.setState({option:t.data.authFileInfoLists})},t)}).fail(function(e){(0,p.xhrTimeout)("认证资料列表",t)})}},{key:"render",value:function(){return c["default"].createElement("form",{className:"frmAuth"},c["default"].createElement(_,{option:this.state.option}),c["default"].createElement("input",{className:"singleBtn",type:"button",value:"提交审核",onClick:this.handleSubmit}))}}]),t}(u.Component),P=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=O.getState().dialog.component;return n.handleDelete=function(){var e=n.state.option.fileId,t=n.state.code;$.ajax({url:"/api/manage/authfile/delete?fileCateCode="+t+"&fileUploadId="+e,timeout:2e3}).done(function(e){(0,p.afterSign)(e,function(e){var t=e.data;O.getState().dialogContent.component.setState({option:t.uploads},function(){var e=O.getState().form,n=e.component.state.option;n[n.findIndex(function(e,n){return e.file_cate_code===t.file_cate_code})].uploads=t.uploads,e.component.setState({option:n})})})}).fail(function(e){(0,p.xhrTimeout)("删除资料文件",a)})},n}return l(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this.state.index,t=this.state.option?this.state.option.fileId:"";return c["default"].createElement("li",null,c["default"].createElement("a",{href:"/api/stream/authfile?fileUploadId="+t,target:"_blank"},"文件"+(e+1)),c["default"].createElement("i",{className:"del",onClick:this.handleDelete}))}}]),t}(u.Component),x=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return l(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=[],n=this.state.option;return n&&n.map(function(n,a){t.push(c["default"].createElement(P,{index:a,key:a,option:n,code:e.state.code}))}),c["default"].createElement("ul",null,t)}}]),t}(u.Component),w=function(e){function t(){o(this,t);var e=r(this,Object.getPrototypeOf(t).call(this));e.state={};var n=O.getState().dialog.component;return O.dispatch({type:"dialogContent",component:e}),e.handleUpload=function(t){$((0,s.findDOMNode)(e)).ajaxSubmit({type:"post",url:"/api/manage/authfile/upload",processData:1,success:function(a){(0,p.afterSign)(a,function(a){$.ajax({type:"post",url:"/api/manage/authfile/reassure",xhrTimeout:2e3,data:{fileCateCode:e.state.code,filePath:a.data.authFile}}).done(function(n){(0,p.afterSign)(n,function(n){var a=_data.data;e.setState({option:a.uploads},function(){var e=O.getState().form,n=e.component.state.option;n[n.findIndex(function(e,t){return e.file_cate_code===a.file_cate_code})].uploads=a.uploads,e.component.setState({option:n},function(){t.value=""})})})}).fail(function(e){(0,p.xhrTimeout)("上传资料文件",n)})},n)}})},e}return l(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("form",{className:"content"},c["default"].createElement(x,{option:this.state.option,code:this.state.code}),c["default"].createElement("div",{className:"singleBtn"},c["default"].createElement("input",{type:"file",multiple:"multiple",name:"upload",onChange:this.handleUpload})))}}]),t}(u.Component),T=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.handleClick=function(){n.setState({status:1})},n}return l(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t=O.getState().dialog.component;$.ajax({url:"/api/manage/getcredit",timeout:2e3}).done(function(n){(0,p.afterSign)(n,function(t){var n=t.data;e.setState({authorized:"DONE"===n.status,creditLimit:n.creditLine})},t)}).fail(function(e){(0,p.xhrTimeout)("授信额度",t)})}},{key:"render",value:function(){var e=[],t=void 0,n=this.state,a=(n.authorized,n.info);return a&&a.map(function(n,a){t=[],n.option.map(function(e,n){t.push(c["default"].createElement("p",{key:n},c["default"].createElement("span",{className:"name"},e.name+":"),c["default"].createElement("span",{className:"value"},e.value)))}),e.push(c["default"].createElement("div",{className:"info",key:a},c["default"].createElement("h2",null,n.name),t))}),c["default"].createElement("div",{className:"mainArea"},c["default"].createElement("div",{className:"w1000"},c["default"].createElement(b["default"],{index:0}),n.status?c["default"].createElement("div",{className:"content authPart"},c["default"].createElement(S["default"],{option:[{name:"企业信息",href:"/manage/corporation"},{name:"认证进度"}]}),c["default"].createElement("h1",null,this.state.title),c["default"].createElement(j,{userClass:this}),this.state.step?c["default"].createElement(k,null):[],c["default"].createElement("p",null,"地址：杭州市滨江区秋溢路289号5楼"),c["default"].createElement("p",null,"电话：400-826-582"),c["default"].createElement("p",null,"邮编：310000")):c["default"].createElement("div",{className:"content infoPart"},c["default"].createElement("h1",null,n.title),c["default"].createElement("a",{className:"auth "+(n.authorized?"authorized":"notAuthorized"),onClick:this.handleClick},c["default"].createElement("span",null,n.authorized?"通过认证":"授信资料未认证"),c["default"].createElement("br",null),c["default"].createElement("span",null,n.authorized?"信用额度"+n.creditLimit+"元":"点击上传")),e)))}}]),t}(u.Component);T.defaultProps={title:"企业名称"};var M=function(e){function t(){o(this,t);var e=r(this,Object.getPrototypeOf(t).call(this));return e.state={},e.getAuth=function(){var t=e.state.areaConfig,n=t[0],a=t[1],o=t[2];$.ajax({url:"/api/manage/corporation/info",timeout:2e3}).done(function(t){var r=t.data;"101001002"===t.code?1:t.code-0?0:2;"101001002"!==t.code&&t.code-0||e.refs.main.setState({title:r.corpName,info:[{name:"基本资料",option:[{name:"工商注册号",value:r.regCode},{name:"办公地址",value:""+n[r.provinceCode]+(a[r.provinceCode][r.cityCode]||"")+(o[r.cityCode]&&o[r.cityCode][r.areaCode]||a[r.provinceCode][r.areaCode])+r.address}]},{name:"联系信息",option:[{name:"联系人",value:r.contactName},{name:"手机号",value:r.mobile}]}]})}).fail(function(e){(0,p.xhrTimeout)("个人信息",O.getState().dialog.component)})},e}return l(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this;n.e(4,function(t){var a=n(299),o=[];for(var r in a)o.push(a[r]);e.setState({areaConfig:o},function(){e.getAuth()})})}},{key:"render",value:function(){this.state;return c["default"].createElement("div",{className:"page"},c["default"].createElement(g["default"],{store:O}),c["default"].createElement(m["default"],{store:O}),c["default"].createElement(T,{ref:"main"}),c["default"].createElement(v["default"],null))}}]),t}(u.Component),R=function(e){e(c["default"].createElement(M,null),document.querySelector(".main"))};t.Page=M,t.init=R},298:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(2),c=a(u),s=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state={option:e.option},n}return l(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.state.option;return t.map(function(t,n){e.push(c["default"].createElement("a",{href:t.href,key:n},t.name))}),c["default"].createElement("div",{className:"crumb"},e)}}]),t}(u.Component);t["default"]=s}});