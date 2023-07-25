<template>
	<main class="main">
		<PodcastCard @get-podcastid="getPodcastId" :podcasts="podcastList" />
	</main>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import PodcastCard from '@/components/PodcastCard.vue';

// Composables
import { usePodcast } from '@/composables/usePodcast';
const { podcastList } = usePodcast();

const getPodcastId = id => {
	console.log('ESTE ES EL ID:::>', id);
};

onBeforeMount(() => {});
</script>

<style scoped>
.main {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10rem;
	height: auto;
	padding: 8rem 0 2rem 0;
	width: 90%;
	margin: 0 auto;
}
</style>
