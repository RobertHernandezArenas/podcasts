<template>
	<header class="header">
		<Navigation :title="appConfig.name">
			<LoadingIcon :config="loadingIcon" v-show="isShowed" />
		</Navigation>

		<SearchBoxPodcast v-model="searchTerm" @input="handleSearchBox">
			<CounterPodcast :counter="filteredPodcasts.length" />
		</SearchBoxPodcast>
	</header>

	<RouterView v-slot="{ Component }">
		<KeepAlive>
			<component :is="Component" />
		</KeepAlive>
	</RouterView>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
// Components
import Navigation from '@/components/Navigation.vue';
import SearchBoxPodcast from '@/components/SearchBoxPodcast.vue';
import CounterPodcast from '@/components/CounterPodcast.vue';
import LoadingIcon from '@/components/icon/LoadingIcon.vue';

// Composables
import { usePodcast } from '@/composables/usePodcast';
const { getPodcasts, isShowed, podcasts } = usePodcast();
const appConfig = ref({
	name: 'Podcaster',
	loadingIcon: {
		width: 20,
		height: 20,
		color: '#1E70B3',
		isShowed: true,
	},
});
const { loadingIcon } = appConfig.value;

state.podcast.list = ref(JSON.parse(localStorage.getItem('podcastsData')));
const filteredPodcasts = ref([]);
const searchTerm = ref('');

const handleSearchBox = e => {
	searchTerm.value = e.target.value;
	console.log(searchTerm.value);

	const searchTermFormated = searchTerm.value.toLowerCase();
	state.podcast.list = state.podcast.list.filter(podcast => {
		if (
			podcast.name === searchTermFormated ||
			podcast.artist === searchTermFormated ||
			podcast.name.includes(searchTermFormated) ||
			podcast.artist.includes(searchTermFormated)
		) {
			filteredPodcasts.value.push(podcast);
		}
	});

	isShowed.value = false;
	console.log(filteredPodcasts);
};
</script>
