import { reactive, computed, onMounted, readonly } from 'vue';
import axios from 'axios';

// STATE
let state = reactive({
	app: {
		name: 'Podcaster',
		isSearchboxShowed: true,
		loadPage: false
	},

	loadConfig: {
		isShowed: true,
		width: 40,
		height: 40,
		color: '#1E70B3',
	},

	podcast: {
		details: { id: null },
		episodes: [],
		filteredList: [],
		list: [],
		searchTerm: '',
	},
});

export const usePodcast = () => {
	// API Requests
	const getPodcasts = async (podcastsNumber = 100) => {
		try {
			// Obtener el timestamp actual en milisegundos
			const currentTime = Date.now();

			// Realizar una nueva solicitud a la API
			const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://itunes.apple.com/us/rss/toppodcasts/limit=${podcastsNumber}/genre=1310/json`,
			)}`;

			const response = await axios.get(url);
			if (response.status === 200) {
				const { feed } = JSON.parse(response.data.contents);
				state.podcast.list = feed.entry.map(entry => ({
					id: entry.id.attributes['im:id'],
					contentType: entry['im:contentType'].attributes.label,
					name: entry['im:name'].label,
					artist: entry['im:artist'].label,
					image: entry['im:image'][2].label,
					summary: entry['summary'].label,
				}));

				state.loadConfig.isShowed = false;
				localStorage.setItem('podcasts', JSON.stringify(state.podcast.list));
				localStorage.setItem('podcastsRequested_at', currentTime);
				state.podcast.list = JSON.parse(localStorage.getItem('podcasts')) || [];
				return state.podcast.list;
			}
		} catch (error) {
			console.log('getPodcasts Error ::>', error);
		}
	};

	const getPodcastDetails = async (podcastsId = state.podcast.details.id) => {
		try {
			const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://itunes.apple.com/lookup?id=${podcastsId}`,
			)}`;

			const response = await axios.get(url);
			if (response.status === 200) {
				const { results } = await JSON.parse(response.data.contents);
				const { 0: data } = results;
				state.podcast.details = { ...data };
				//console.log('Hola:::>', state.podcast.details);
				state.loadConfig.isShowed = false;
			}
		} catch (error) {
			console.log('[PODCASTS DETAILS ERROR]::>', error);
		}
	};
	const getPodcastEpisodes = async (podcastsId = state.podcast.details.id) => {
		try {
			const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://itunes.apple.com/lookup?id=${podcastsId}&entity=podcastEpisode&limit=9  `,
			)}`;

			const response = await axios.get(url);
			console.log(response);
			if (response.status === 200) {
				const data = await JSON.parse(response.data.contents);
				state.podcast.episodes = [...data.results];
				console.log('Hola:::>', state.podcast.episodes);
				state.loadConfig.isShowed = false;
				return state.podcast.episodes;
			}
		} catch (error) {
			console.log('getPodcastEpisodes Error ::>', error);
		}
	};

	/*const getPodcastsDetailsAndEpisodes = async () => {
		// Ejecutar ambas funciones de forma simultánea utilizando Promise.all
		await Promise.all([getPodcastDetails(), getPodcastEpisodes()]);
	};*/

	// Methods
	const searchMyPodcast = id => {
		return state.podcast.list.find(podcast => podcast.id === id);
	};

	function formatDate(inputDate) {
		const date = new Date(inputDate);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	function formatMilToMinSec(milliseconds) {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		// Formatea los segundos para que siempre tenga 2 dígitos
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

		return `${minutes}:${formattedSeconds}`;
	}

	// Computed Properties
	const podcastList = computed(() => {
		return state.podcast.filteredList.length <= 0
			? state.podcast.list
			: state.podcast.filteredList;
	});

	// Handler Events
	const handleSearchBox = e => {
		state.podcast.searchTerm = e.target.value;

		const searchTermFormated = state.podcast.searchTerm.toLowerCase();

		state.podcast.filteredList = state.podcast.list.filter(podcast => {
			const nameMatch = podcast.name.toLowerCase().includes(searchTermFormated);
			const artistMatch = podcast.artist
				.toLowerCase()
				.includes(searchTermFormated);
			return nameMatch || artistMatch;
		});
	};

	return {
		state,
		getPodcasts,
		getPodcastEpisodes,
		getPodcastDetails,
		podcastList,
		handleSearchBox,
		searchMyPodcast,
		formatDate,
		formatMilToMinSec,
	};
};
