<script>
	import { invalidateAll } from '$app/navigation';
</script>

<form
	method="post"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				accept: 'application/json' // 用于判断是执行redirect还是return json
			}
		});
		// 此时有个问题, 清除了cookie, 但是页面没有重定向到登录页面
		if (response.ok) {
			// 它会标记所有页面级别的数据加载函数(load)为无效，这样它们就会在下一次页面更新时重新运行。
			invalidateAll();
			// 重定向到登录页面
			// location.href = '/login';
		}
	}}
>
	<button type="submit">退出登录</button>
</form>
