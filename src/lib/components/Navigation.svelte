<script lang="ts">
	import { tick, type ComponentType } from 'svelte';
	import { Home, Search, ListMusic, type Icon } from 'lucide-svelte';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';

	export let desktop: boolean;

	let isMobileMenuOpen = false;
	$: isOpen = desktop || isMobileMenuOpen;

	let openMenuButton: HTMLElement;
	let closeMenuButton: HTMLElement;
	let lastFocusableElement: HTMLAnchorElement;

	const menuItems: { label: string; path: string; icon: ComponentType<Icon> }[] = [
		{ label: 'Home', path: '/', icon: Home },
		{ label: 'Search', path: '/search', icon: Search },
		{ label: 'Playlists', path: '/playlists', icon: ListMusic }
	];

	const openMenu = async () => {
		isMobileMenuOpen = true;
		// tick的作用是可以确保元素已经被渲染
		await tick();
		closeMenuButton.focus();
	};
	const closeMenu = async () => {
		isMobileMenuOpen = false;
		// 这里其实可以不需要, 因为open按钮已经存在了
		await tick();
		openMenuButton.focus();
	};

	// 导航拦截器
	beforeNavigate(() => {
		isMobileMenuOpen = false;
	});
</script>

<svelte:head>
	{#if !desktop && isMobileMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="nav-content" class:desktop class:mobile={!desktop}>
	{#if !desktop && isMobileMenuOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="overlay" on:click={closeMenu} transition:fade={{ duration: 200 }} />
	{/if}
	<nav aria-label="Main">
		{#if !desktop}
			<button bind:this={openMenuButton} on:click={openMenu} aria-expanded={isOpen}>Open</button>
		{/if}
		<div
			class="nav-content-inner"
			class:is-hidden={!isOpen}
			style:visibility={isOpen ? 'visible' : 'hidden'}
		>
			{#if !desktop}
				<button bind:this={closeMenuButton} on:click={closeMenu}>Close</button>
			{/if}
			<img src={logo} class="logo" alt="logo" />
			<ul>
				{#each menuItems as item}
					<li class:active={item.path === $page.url.pathname}>
						<a href={item.path}>
							<svelte:component
								this={item.icon}
								focusable="false"
								aria-hidden="true"
								color="var(--text-color)"
								size={26}
								strokeWidth={2}
							/>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: var(--sidebar-color);
			opacity: 0.75;
			z-index: 100;
			@include breakpoint.up('md') {
				display: none;
			}
		}
		.logo {
			max-width: 100%;
			width: 130px;
		}
		.nav-content-inner {
			// padding: 20px;
			min-width: var(--sidebar-width);
			background-color: var(--sidebar-color);
			height: 100vh;
			overflow: auto;
			display: none;
			ul {
				padding: 0;
				margin: 20px 0 0;
				list-style: none;
				li {
					&.active {
						a {
							opacity: 1;
						}
					}
					a {
						display: flex;
						align-items: center;
						text-decoration: none;
						color: var(--text-color);
						font-size: functions.toRem(14);
						font-weight: 500;
						padding: 5px;
						margin: 10px 0;
						opacity: 0.7;
						transition: opacity 0.2s;
						&:hover,
						&:focus {
							opacity: 1;
						}
						:global(svg) {
							margin-right: 12px;
						}
					}
				}
			}
		}

		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: flex;
					flex-direction: column;
				}
			}
		}

		&.mobile .nav-content-inner {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			transition:
				transform 0.2s,
				opacity 0.2s;
			&.is-hidden {
				transition:
					transform 0.2s,
					opacity 0.2s,
					visibility 0.2s;
				transform: translateX(-100%);
				opacity: 0;
			}
			@include breakpoint.down('md') {
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
