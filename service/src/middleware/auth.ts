/* eslint-disable*/
import fetch from 'node-fetch';
const auth = async (req, res, next) => {

  try {
   // const Authorization = req.header('Authorization')

  //  if (!Authorization)
  //     throw new Error('无访问权限,请点击这里登录')
	// 	await 	testAuthorization(Authorization)
		next()
  }
  catch (error) {

    res.send({ status: 401, message: error.message ?? 'Please authenticate.', data: null })
  }
}
const testAuthorization= async function(Authorization){
	const response = await fetch('https://api.shixianjia.com/api/app/user/basic-infor', {method: 'GET',headers:{Authorization}});
	const data:any = await response.json();
	if(!data.isAllowGPT)	throw new Error('对不起,您的账号没有开通实现家GPT服务的使用权限,请向管理员申请开通权限')
}

export { auth }
