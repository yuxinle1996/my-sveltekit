import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 5173,
		strictPort: false
	},
	// preview: {
	// 	port: 4173,
	// 	strictPort: false
	// }
	define: {
		
	}
});
