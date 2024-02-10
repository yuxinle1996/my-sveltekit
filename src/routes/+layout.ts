import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

// 此文件是布局文件, 用于处理一些全局的逻辑, 比如路由守卫, 主题切换等
export const load: LayoutLoad = ({ data, url }) => {
	const { user } = data || {};
	// 已登录 重定向到首页
	if (user && url.pathname === '/login') {
		throw redirect(307, '/');
	}
	// 未登录 重定向到登录页
	// if (!user && url.pathname !== '/login') {
	// 	throw redirect(307, '/login');
	// }

	return {
		user
	};
};
