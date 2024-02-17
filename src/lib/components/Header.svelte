<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown, ExternalLink } from 'lucide-svelte';
	import avatar from '$assets/avatar.jpg';
	import { tippy } from '$actions';
	import LogoutButton from './LogoutButton.svelte';
	import { hideOnPopperBlur } from '$actions/tippy/tippy-plugins';

	$: user = $page.data.user;
</script>

<div class="content">
	<div class="left">
		<!-- 在非浏览器环境中 不展示此nav 利于seo, 只会有一个<nav /> -->
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div class="right">
		<div id="profile-button">
			<button
				class="profile-button"
				use:tippy={{
					content: document.getElementById('profile-menu') || undefined,
					onMount: () => {
						const template = document.getElementById('profile-menu');
						if (template) {
							template.style.display = 'block';
						}
					},
					trigger: 'click', // 触发方式
					placement: 'bottom-end', // 位置
					interactive: true, // 不加无法移入交互
					theme: 'menu'
					// hideOnEsc: false // 自定义插件(按esc键不关闭)
				}}
			>
				<!-- todo 大咪 -->
				<!-- {#if user?.images && user.images.length > 0} -->
				<img src={user?.images?.[0]?.url || avatar} alt="Avatar" />
				<!-- {/if} -->
				{user?.display_name || '大咪呀'}
				<span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" size={22} />
			</button>
		</div>
		<!-- 下拉菜单 -->
		<div id="profile-menu" style="display: none;">
			<div class="profile-menu-content">
				<ul>
					<li>
						<a
							href={user?.external_urls.spotify || 'https://www.baidu.com'}
							target="_blank"
							rel="noopener noreferrer"
						>
							查看Spotify
							<ExternalLink size={20} focusable="false" aria-hidden />
						</a>
					</li>
					<li>
						<a href="/profile">查看资料</a>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		:global(html.no-js) & {
			@include breakpoint.down('md') {
				justify-content: flex-start;
			}
		}
	}
	.profile-button {
		background: none;
		border: 1px solid var(--border);
		padding: 5px;
		border-radius: 25px;
		display: flex;
		align-items: center;
		color: var(--text-color);
		cursor: pointer;
		transition: background-color 0.2s;
		:global(html.no-js) & {
			display: none;
		}
		:global(.profile-arrow) {
			margin-left: 3px;
		}
		img {
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
		}
		&:hover {
			background-color: var(--accent-color);
		}
	}
	.profile-menu-content {
		padding: 5px 0;
		ul {
			padding: 0;
			margin: 0;
			list-style: none;
			li {
				&:hover {
					background-image: linear-gradient(rgba(255, 255, 255, 0.07) 0 0);
				}
				a :global(svg) {
					vertical-align: middle;
					margin-left: 10px;
				}
				a,
				:global(button) {
					display: inline-block;
					padding: 10px 15px;
					background: none;
					border: none;
					text-decoration: none;
					cursor: pointer;
					color: var(--menu-text-color);
					width: 100%;
					text-align: left;
					font-size: functions.toRem(14);
				}
			}
		}
	}
	:global(html.no-js) #profile-menu {
		display: block !important;
		.profile-menu-content {
			ul {
				padding: 0;
				margin: 0;
				li {
					display: inline-block;
				}
			}
		}
	}
</style>
