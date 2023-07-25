<template>
	<div class="table">
		<h1 class="table__title">Episodes: 66</h1>
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Date</th>
					<th>Duration</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in tableData"
					:key="item.id"
					:class="index % 2 === 0 ? 'even' : 'odd'"
				>
					<td>{{ item.title }}</td>
					<td>{{ item.date }}</td>
					<td>{{ item.duration }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
const tableData = [
	{ id: 1, title: 'Item 1', date: '2023-07-20', duration: '10 min' },
	{ id: 2, title: 'Item 2', date: '2023-07-21', duration: '15 min' },
	{ id: 3, title: 'Item 3', date: '2023-07-22', duration: '12 min' },
	// Agrega más elementos a la lista según sea necesario
];
</script>

<style scoped>
.table {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 2;
	max-width: 70%;
	padding: 0 1rem;
	background: #ffffff;
}

.table__title {
	padding: 0.5rem 1.5rem;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	width: 70%;
	max-width: 70%;
}
table {
	margin: 2rem 0;
	width: 70%;
	border-collapse: collapse;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

th,
td {
	border-bottom: 1px solid var(--neutral-90);
	padding: 0.75rem;
}

th {
	background-color: var(--neutral-100);
}

tr.even {
	background-color: var(--neutral-96); /* Azul claro */
}

tr.odd {
	background-color: #ffffff; /* Blanco */
}
</style>
