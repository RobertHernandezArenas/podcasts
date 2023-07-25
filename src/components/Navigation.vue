<template>
	<nav class="navigation">
		<router-link to="/" class="navigation__link">
			<h1 class="navigation__title">{{ title }}</h1></router-link
		>
		<slot></slot>
	</nav>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: 'Podcaster',
	},
});
</script>

<style scoped>
.navigation {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow:
		rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
		rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	padding: 1rem 2rem;
}

.navigation__link {
	display: inline-block;
	width: min-content;
	text-decoration: none;
}
.navigation__title {
	color: var(--theme);
	letter-spacing: -0.1rem;
	font-weight: 700;
}
</style>
