<template>
	<section class="sidebar">
		<div class="sidebar__header">
			<img
				class="sidebar__image"
				:src="details.image"
				:alt="`artwork ${details.name}`"
			/>
		</div>
		<div class="sidebar__body">
			<h3 class="sidebar__title" :title="details.name">{{ details.name }}</h3>
			<p class="sidebar__author">by {{ details.artist }}</p>
		</div>
		<div class="sidebar__footer">
			<p class="sidebar__title">Description:</p>
			<p class="sidebar__description">
				{{ details.summary }}
			</p>
		</div>
	</section>
</template>

<script setup>
defineProps({
	details: {
		type: Object,
		default: {
			image: '/images/default.png',
			name: 'Default Title',
			artist: 'Default Artist',
			summary:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam distinctio explicabo, mollitia commodi et iusto, sequi vero alias unde quasi nulla adipisci dolore, minima facilis! Placeat sapiente impedit eligendi obcaecati!',
		},
	},
});
</script>

<style scoped>
.sidebar {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 0 1rem;
	min-width: 280px;
	max-width: 280px;
	border-radius: 0.25rem;
	margin: 0 1rem;
	max-height: auto;
	box-shadow:
		rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
		rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.sidebar__header {
	display: flex;
	justify-content: center;
	bottom: 60%;
	width: 220px;
	height: 220px;
	padding: 2rem 0 1rem 0;
}
.sidebar__image {
	display: block;
	max-width: 100%;
	object-fit: contain;
}
.sidebar__body {
	padding: 1rem 0;
	width: 100%;
	border-top: 1px solid var(--neutral-90);
}
.sidebar__title {
	font-weight: 900;
}
.sidebar__author {
	font-style: italic;
}
.sidebar__footer {
	padding: 1rem 0;
	border-top: 1px solid var(--neutral-90);
}
.sidebar__title:nth-child(1) {
	margin-bottom: 0.25rem;
}
.sidebar__description {
	font-size: 14px;
}
</style>
