import type { LayoutServerLoad } from './$types';
import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

// 每次请求时调用，用于加载用户信息 以及token过期时的刷新
export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	if (!accessToken) {
		return {
			user: null
		};
	}
	const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `bearer ${accessToken}`
		}
	});
	if (!profileRes.ok) {
		return {
			user: null
		};
	}

	if (profileRes.status === 401 && refreshToken) {
		// refresh the token and try again
		const refreshRes = await fetch('/api/auth/refresh');
		if (!refreshRes.ok) {
			return {
				user: null
			};
		}
		throw redirect(307, url.pathname);
	}

	const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
	return {
		user: profile
	};
};
