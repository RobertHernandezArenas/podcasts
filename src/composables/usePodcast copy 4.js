import { reactive, ref, onBeforeMount } from 'vue';
import axios from 'axios';

// STATE
const state = reactive({
	app: {
		name: 'Podcaster',
	},
	iconLoad: {
		isShowed: true,
		width: 20,
		height: 20,
		color: '#1E70B3',
	},
	data: {
		podcasts: {
			list: [],
			details: {},
			episodes: [],
		},
	},
});

export const usePodcast = () => {
	const getPodcastsBackup = async (podcastsNumber = 100) => {
		try {
			const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://itunes.apple.com/us/rss/toppodcasts/limit=${podcastsNumber}/genre=1310/json`,
			)}`;

			const response = await axios.get(url);
			if (response.status === 200) {
				isShowed.value = false;
				const { feed } = JSON.parse(response.data.contents);
				state.podcast.list = feed.entry.map(entry => ({
					id: entry.id.attributes['im:id'],
					contentType: entry['im:contentType'].attributes.label,
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

	const getPodcastDetails = async (podcastsId = 788236947) => {
		try {
			const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://itunes.apple.com/lookup?id=${podcastsId}`,
			)}`;

			const response = await axios.get(url);
			const results = JSON.parse(response.data.contents);
			console.log('Result:::>', results);
			results.map(detailData => podcastsDetails.value.push(detailData));
			// console.log('Result:::>', results);
			// console.log(response);
			console.log('DETALLES PODCAST:::>', podcastsDetails.value);
		} catch (error) {
			console.log('getPodcastDetails Error ::>', error);
		}
	};

	onBeforeMount(getPodcasts);
	return {
		podcasts,
		podcastsDetails,
		getPodcasts,
		isShowed,
		getPodcastDetails,
	};
};
