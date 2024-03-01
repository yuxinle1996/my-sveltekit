import { browser } from '$app/environment';

// 用于刷新token
export default async function fetchRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	path: string
) {
	const req = fetch(path);
	if (!browser) return req;
	const res = await req;
	if (res.status === 401) {
		// 如果有多个请求同时发生401，那么会同时发起多个刷新token的请求
		// await fetch('/api/auth/refresh');
		if (!window.refreshPromise) {
			window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
				window.refreshPromise = null;
			});
		}
		await window.refreshPromise;
		return fetch(path);
	} else {
		return res;
	}
}
