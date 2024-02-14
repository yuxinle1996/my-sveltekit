<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown, ExternalLink } from 'lucide-svelte';
	import avatar from '$assets/avatar.jpg';
	import { tippy } from '$actions';
	import LogoutButton from './LogoutButton.svelte';

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
					trigger: 'click',
					placement: 'bottom-end',
					interactive: true // 不加无法交互
				}}
			>
				<!-- {#if user?.images && user.images.length > 0} -->
				<img src={user?.images?.[0]?.url || avatar} alt="Avatar" />
				<!-- {/if} -->
				{user?.display_name || '大咪呀'}
				<span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" size={22} />
			</button>
		</div>
		<div id="profile-menu" style="display: none;">
			<div class="profile-menu-content">
				<ul>
					<li>
						<a href={user?.external_urls.spotify} target="_blank" rel="noopener noreferrer">
							查看Spotify
							<ExternalLink size={16} focusable="false" aria-hidden />
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
</style>
