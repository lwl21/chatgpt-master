/* eslint-disable*/
import Oidc from 'oidc-client'
export const mgr = new Oidc.OidcClient({
	authority: 'https://passport.shixianjia.com', //认证服务器(登录站点)
	client_id: 'House_App', //客户端id(必选)
	redirect_uri: location.origin + '/assets/signin-callback.html', //重定向url(认证服务器回调的客户端页面)
	post_logout_redirect_uri: location.origin + '/assets/signout-callback.html', //退出登录后返回的页面
	response_type: 'id_token token', //授权类型(必选)
	scope: 'openid profile house', //表示申请的权限范围(可选项)
	filterProtocolClaims: true, //协议声明
	loadUserInfo: true //用户信息
})

