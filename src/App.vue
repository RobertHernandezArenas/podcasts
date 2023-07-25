<template>
	<header class="header">
		<Navigation :title="state.app.name">
			<LoadingIcon :config="state.loadConfig" />
		</Navigation>

		<SearchBoxPodcast
			v-model="state.podcast.searchTerm"
			@input="handleSearchBox"
			v-show="state.app.isSearchboxShowed"
		>
			<CounterPodcast
				:counter="
					state.podcast.filteredList?.length == 0
						? state.podcast.list?.length
						: state.podcast.filteredList?.length
				"
			/>
		</SearchBoxPodcast>
	</header>

	<RouterView v-slot="{ Component }">
		<KeepAlive>
			<component :is="Component" />
		</KeepAlive>
	</RouterView>
</template>

<script setup>
import { onBeforeMount, watchEffect } from 'vue';
// Components
import Navigation from '@/components/Navigation.vue';
import SearchBoxPodcast from '@/components/SearchBoxPodcast.vue';
import CounterPodcast from '@/components/CounterPodcast.vue';
import LoadingIcon from '@/components/icon/LoadingIcon.vue';

// Route
import { useRoute } from 'vue-router';
const route = useRoute();

// Composable
import { usePodcast } from '@/composables/usePodcast';
const { state, getPodcasts, handleSearchBox } = usePodcast();

//

watchEffect(() => {
	state.app.isSearchboxShowed = route.name === 'main';
});

onBeforeMount(() => {
	// Obtener los datos almacenados en el caché
	const podscatsCachedAt = localStorage.getItem('podcastsRequested_at');
	const podcastsCached = localStorage.getItem('podcasts');
	const currentTime = Date.now();
	if (
		!podcastsCached &&
		!podscatsCachedAt &&
		currentTime - podscatsCachedAt >= 24 * 60 * 60 * 1000
	) {
		getPodcasts();
	} else {
		state.podcast.list = JSON.parse(podcastsCached);
		state.loadConfig.isShowed = false;
	}
});
</script>
