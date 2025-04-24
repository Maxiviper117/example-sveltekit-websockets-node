import type { PageServerLoad } from './$types';

export const load = (async ({ depends }) => {
    depends('app:page');
	return {};
}) satisfies PageServerLoad;
