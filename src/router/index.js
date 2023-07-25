import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: () => import('@/views/MainPodcastView.vue'),
		},
		{
			path: '/podcast/:id',
			name: 'details',
			component: () => import('@/views/DetailsPodcastView.vue'),
		},
		{
			path: '/podcast/:podcastId/episode/:episodeId',
			name: 'episode',
			component: () => import('@/views/EpisodePodcastView.vue'),
		},
	],
});

export default router;
