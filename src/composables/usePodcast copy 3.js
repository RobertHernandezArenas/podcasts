import { ref, onMounted } from 'vue';
import axios from 'axios';

export const usePodcast = () => {
	const podcasts = ref([]);
	const dataPodcastsDetails = ref([]);
	const isShowed = ref(true);
	const getPodcasts = async (podcastsNumber = 100) => {
		try {
			// Obtener los datos almacenados en el caché
			const cachedData = localStorage.getItem('podcastsData');
			const cachedTimestamp = localStorage.getItem('podcastsTimestamp');

			// Obtener el timestamp actual en milisegundos
			const currentTime = Date.now();

			// Si los datos están en el caché y ha pasado menos de un día desde la última solicitud, utilizar los datos del caché
			if (
				cachedData &&
				cachedTimestamp &&
				currentTime - cachedTimestamp <= 24 * 60 * 60 * 1000
			) {
				state.podcast.list = JSON.parse(cachedData);
				isShowed.value = false;
			} else {
				// Realizar una nueva solicitud a la API
				const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
					`https://itunes.apple.com/us/rss/toppodcasts/limit=${podcastsNumber}/genre=1310/json`,
				)}`;

				const response = await axios.get(url);
				if (response.status === 200) {
					isShowed.value = false;
					// console.log(response);
					const { feed } = JSON.parse(response.data.contents);
					feed.entry.map(entry => {
						entry = {
							id: entry.id.attributes['im:id'],
							contentType: entry['im:contentType'].attributes.label,
							name: entry['im:name'].label,
							artist: entry['im:artist'].label,
							image: entry['im:image'][2].label,
						};
						state.podcast.list.push(entry);
						//console.log('ENTRY:::>', entry);
					});

					// Guardar los datos y el timestamp de la solicitud en el caché
					localStorage.setItem(
						'podcastsData',
						JSON.stringify(state.podcast.list),
					);
					localStorage.setItem('podcastsTimestamp', currentTime);
				}
			}
			//console.log(state.podcast.list);
		} catch (error) {
			console.log('getPodcasts Error ::>', error);
		}
	};

	const filterPodcasts = searchTerm => {
		if (!searchTerm) {
			isShowed.value = false;
			return (state.podcast.list = []);
		}

		const lowerCaseSearchTerm = searchTerm.toLowerCase();
		const filteredPodcasts = state.podcast.list.filter(
			podcast =>
				podcast.name.toLowerCase().includes(lowerCaseSearchTerm) ||
				podcast.artist.toLowerCase().includes(lowerCaseSearchTerm),
		);

		isShowed.value = false;
		state.podcast.list = filteredPodcasts;
	};

	return {
		getPodcasts,
		podcasts,
		isShowed,
		filterPodcasts,
	};
};
