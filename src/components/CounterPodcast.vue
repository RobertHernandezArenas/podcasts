<template>
	<div class="counter">
		<span class="counter__podcast">{{ counter }}</span>
	</div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
	counter: {
		type: Number,
		default: 0,
	},
});
</script>

<style scoped>
.counter {
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--theme);
	padding: 0 0.25rem;
	border-radius: 0.75rem;
	height: 25px;
	padding: 0 0.5rem;
	min-width: 45px;
}
.counter__podcast {
	color: var(--neutral-100);
	font-weight: 900;
	font-size: 1rem;
}
</style>
