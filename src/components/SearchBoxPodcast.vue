import { toRefs } from 'vue';
<template>
	<div class="searchbox">
		<slot></slot>
		<div class="searchbox__container">
			<input
				@input="$emit('catch-search-term', searchTerm)"
				class="searchbox__input"
				type="search"
				placeholder="Filter podcast..."
			/>
		</div>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
	searchTerm: {
		type: String,
	},
});
const { searchTerm } = toRefs(props);
defineEmits(['catch-search-term']);
</script>

<style scoped>
.searchbox {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100px;
	padding: 2rem;
	width: 100%;
	margin: 0 auto;
	gap: 1rem;
}

.searchbox__input {
	height: 40px;
	font-size: 1rem;
	border: 1px solid var(--neutral-80);
	border-radius: 0.25rem;
	padding: 1rem;
}
.searchbox__input:focus {
	outline: 1px solid var(--theme-light);
	border: none;
}

@media only screen and (min-width: 1200px) {
	.searchbox {
		width: 85%;
	}
}
</style>
