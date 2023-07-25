{}
<template>
	<section class="details">
		<div @click="goBack" class="details__goback">
			<p class="details__symbol"><span>&#8592;</span> Atras</p>
		</div>
		<section class="details__viewer">
			<SidebarDetailsPodcast :details="state.podcast.details" />
			<TableEpisodesPodcast :episodes="state.podcast.episodes" />
		</section>
	</section>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
// Components
import SidebarDetailsPodcast from '@/components/SidebarDetailsPodcast.vue';
import TableEpisodesPodcast from '@/components/TableEpisodesPodcast.vue';

// Composable
import { usePodcast } from '@/composables/usePodcast';
const { state, getPodcastDetails, getPodcastEpisodes, searchMyPodcast } =
	usePodcast();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const myPodcast = ref({});

state.podcast.details.id = route.params.id;
const goBack = () => {
	router.go(-1);
};

onBeforeMount(() => {
	state.loadConfig.isShowed = true;
	getPodcastDetails(route.params.id);
	/*state.loadConfig.isShowed = true
	getPodcastEpisodes(route.params.id);
	getPodcastDetails();
	myPodcast.value = searchMyPodcast(route.params.id);*/
});

/*onUpdated(() => {
	getPodcastEpisodes(route.params.id);
	myPodcast.value = searchMyPodcast(route.params.id);
});*/
</script>

<style scoped>
.details {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	height: auto;
	margin: 3rem auto;
	width: 90%;
}

.details__goback {
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	height: fit-content;
	margin-left: 2rem;
	padding: 1rem 2rem;
}

.details__goback:hover,
.details__symbol:hover {
	color: var(--theme);
	transition: color 0.35s ease-in-out;
}

.details__symbol,
.details__symbol span {
	color: var(--neutral-0);
	font-size: 1rem;
}

.details__symbol > span {
	font-size: 2rem;
}
.details__viewer {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	gap: 1rem;
}
</style>
