<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	import { io } from 'socket.io-client';
	onMount(() => {
		const authToken = 'your_jwt_token_here'; // Replace with actual token retrieval logic

		const socket = io('http://localhost:3000', {
			auth: {
				token: authToken
			}
		});

		socket.on('eventFromServer', (message) => {
			showMsg = true;
			invalidate('app:page');
			console.log('Received:', message);
			// Additional logic can be added here if needed
		});

		return () => {
			socket.disconnect();
		};
	});

	let showMsg = $state(false);

	import type { Action } from 'svelte/action';

	const useTimeout: Action = (node) => {
		$effect(() => {
			// create timeout then hide the node
			const timeout = setTimeout(() => {
				showMsg = false;
				// or you can use
				// node.style.display = 'none';
			}, 5000);

			return () => {
				clearTimeout(timeout); // teardown goes here
			};
		});
	};
</script>

{#if showMsg}
	<p class="rounded bg-green-300 px-4 py-2" use:useTimeout>
		Data has been updated! Page refreshed.
	</p>
{/if}

<h1>Welcome to SvelteKit with Socket.IO!</h1>
