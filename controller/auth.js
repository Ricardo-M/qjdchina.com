import {Route as RouteStatic} from "./static";
import {Route as RouteApi} from "./api";
let ligalRoute = [];
const assembleLigalRoute = (route, signType) => {
		return route.filter(list => {
			return ~list.signType.indexOf(signType);
		});
	},
	getLigalRoute = (signType, pathType) => {
		return assembleLigalRoute(pathType ? RouteApi : RouteStatic, signType);
	};
export default (router) => {
	let redisClient,
		redisKey,
		redisPromise,
		specificOption,
		pathType;
	router
		.all("*", (req, res, next) => {
			redisKey = req.cookies.sso_cookie;
			pathType = ~req.path.search(/^\/api\/.*/);
			redisPromise = new Promise((resolve, reject) => {
				if(redisKey){
					req.sessionStore.client.get(redisKey, (err, data) => {
						if(err){
							reject(err);
						}else{
							if(data){
								resolve(JSON.parse(data).member ? 2 : 1);
							}else{
								res.clearCookie("sso_cookie");
								resolve(0);
							}
						}
					});
				}else{
					resolve(0);
				}
			});
			redisPromise.then(signType => {
				specificOption = getLigalRoute(signType, pathType).filter(list => {
					return req.path === list.route && (req.method.toLowerCase() === list.method || "get");
				})[0];
				if(specificOption){
					next();
				}else{
					if(pathType){
						res.json({
							code : 401,
							message : "无权限访问"
						});
					}else{
						res.redirect(`/?referer=${req.path}`);
					}
				}
			}, err => {
				res.redirect("/");
			});
		});
	return router;
};