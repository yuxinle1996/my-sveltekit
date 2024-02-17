<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import type { LayoutData } from './$types';
	import { Navigation, Header } from '$components';
	import { page } from '$app/stores';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { hideAll } from 'tippy.js';

	NProgress.configure({ showSpinner: false });

	// topbar实例
	let topbar: HTMLElement;
	// 滚动高度
	let scrollY: number;
	let headerOpacity: number = 0;
	$: if (topbar) {
		headerOpacity = scrollY / topbar?.offsetHeight < 1 ? scrollY / topbar?.offsetHeight : 1;
	}

	export let data: LayoutData;
	$: user = data.user;

	beforeNavigate(() => {
		NProgress.start();
		// hideAll(); // 写了插件可以不用这个
	});

	afterNavigate(() => {
		NProgress.done();
	});
</script>

<svelte:window bind:scrollY />

<!-- title -->
<svelte:head>
	<title>大咪练习{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
</svelte:head>

<!-- 暂时用user取反,等能登录了再解开 -->
{#if !user}
	<a href="#main-content" class="skip-link">Skip to Content</a>
{/if}

<div id="main">
	<div id="slider">
		<Navigation desktop={true} />
	</div>
	<div id="content">
		<!-- todo 大咪 -->
		<!-- {#if user} -->
		<div id="topbar" bind:this={topbar}>
			<div
				class="topbar-bg"
				style:background-color="var(--header-color)"
				style:opacity={`${headerOpacity}`}
			/>
			<Header />
		</div>
		<!-- {/if} -->
		<!-- 暂时用user取反,等能登录了再解开 -->
		<main id="main-content" class:logged-in={!user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		:global(html.no-js) & {
			@include breakpoint.down('md') {
				display: block;
			}
		}
		#content {
			flex: 1;
			#topbar {
				position: fixed;
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;
				:global(html.no-js) & {
					position: sticky;
					top: 0;
					background-color: var(--header-color);
					height: auto;
					padding: 10px 20px;
					@include breakpoint.up('md') {
						position: fixed;
					}
				}
				.topbar-bg {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: -1;
				}
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(30px + var(--header-height));
					@include breakpoint.down('md') {
						padding-top: 30px;
					}
				}
			}
		}
	}
</style>
