import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	plugins: [vue()],
	base: 'https://RobertHernandezArenas.github.io',
	server: {
		port: 3000,
		compression: true,
	},
	vueCompilerOptions: {
		productionMode: true,
	},
	build: {
		cssCodeSplit: false,
		rollupOptions: {
			input: 'index.html',
			output: {
				// entryFileNames: `assets/[name].js`,
				// chunkFileNames: `assets/[name].js`,
				// assetFileNames: `assets/[name].[ext]`,
				manualChunks: { vue: ['vue'] },
			},
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
