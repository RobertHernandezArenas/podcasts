import { ref, onMounted } from 'vue';
import axios from 'axios';

export const usePodcast = () => {
	const podcasts = ref([]);
	const isShowed = ref(true);
	const getPodcasts = async (podcastsNumber = 100) => {
		try {
			const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://itunes.apple.com/us/rss/toppodcasts/limit=${podcastsNumber}/genre=1310/json`,
			)}`;

			const response = await axios.get(url);
			if (response.status === 200) {
				isShowed.value = false;
				console.log(response);
				const { feed } = JSON.parse(response.data.contents);
				state.podcast.list = feed.entry.map(entry => ({
					id: entry.id.attributes['im:id'],
					name: entry['im:name'].label,
					artist: entry['im:artist'].label,
					image: entry['im:image'][2].label,
				}));
				return state.podcast.list;
			}
		} catch (error) {
			console.log('getPodcasts Error ::>', error);
		}
	};

	return {
		podcasts,
		isShowed,
	};
};
