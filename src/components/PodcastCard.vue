<template>
	<RouterLink
		@click="$emit(getPodcastid, podcast.id)"
		class="podcast-card__link"
		v-for="podcast in podcasts"
		:key="podcast.id"
		:to="createURLPath(podcast.contentType, podcast.id)"
		><article class="podcast-card">
			<div class="podcast-card__image">
				<img :src="podcast.image" alt="" />
			</div>
			<h2 class="podcast-card__name" :title="podcast.name">
				{{ podcast.name }}
			</h2>
			<p class="podcast-card__author" :title="podcast.artist">
				<b>Author:</b> {{ podcast.artist }}
			</p>
		</article></RouterLink
	>
	<RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

const createURLPath = (str, id) => {
	return `/${str.toLowerCase()}/${id}`;
};

const props = defineProps({
	podcasts: {
		type: Array,
		default: [],
	},
});

defineEmits(['getPodcastid']);
</script>

<style scoped>
.podcast-card__link {
	text-decoration: none;
	color: var(--neutral-20);
}
.podcast-card {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;
	flex-direction: column;
	padding: 1rem 2rem 2rem 2rem;
	background: var(--neutral-100);
	box-shadow:
		rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
		rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	min-width: 280px;
	max-width: 280px;
	min-height: 220px;
	position: relative;
	transition: box-shadow 0.25s ease-in-out;
}

.podcast-card:hover {
	box-shadow:
		rgba(0, 0, 0, 0.3) 0px 19px 38px,
		rgba(0, 0, 0, 0.22) 0px 15px 12px;
	transition: box-shadow 0.35s ease-in-out;
}

.podcast-card__image {
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 60%;
	width: 180px;
	height: 180px;
}
.podcast-card__image img {
	border-radius: 50%;
	display: block;
	width: 100%;
	object-fit: cover;
}
.podcast-card__name {
	text-align: center;
	margin: 3rem 0 0 0;
	font-size: 1.5rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.podcast-card__author {
	color: var(--neutral-60);
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
