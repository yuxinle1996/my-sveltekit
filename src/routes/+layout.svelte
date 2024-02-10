<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { Navigation, Header } from '$components';

	export let data: LayoutData;

	// topbar实例
	let topbar: HTMLElement;
	// 滚动高度
	let scrollY: number;
	let headerOpacity: number = 0;
	$: if (topbar) {
		headerOpacity = scrollY / topbar?.offsetHeight < 1 ? scrollY / topbar?.offsetHeight : 1;
	}

	$: user = data.user;
</script>

<svelte:window bind:scrollY />

<div id="main">
	<div id="slider">
		<Navigation desktop={true} />
	</div>
	<div id="content">
		<div id="topbar" bind:this={topbar}>
			<div
				class="topbar-bg"
				style:background-color="var(--header-color)"
				style:opacity={headerOpacity}
			/>
			<Header />
		</div>
		<!-- 暂时用user取反,等能登录了再解开 -->
		<main id="main-content" class:logged-in={!user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
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
				}
			}
		}
	}
</style>
