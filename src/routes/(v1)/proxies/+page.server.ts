import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from '$lib/server/index.js';
import { z } from 'zod';

const schema = z.object({
	bool: z.boolean()
});

export const load = (async () => {
	const form = await superValidate(schema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, schema);
		console.log('POST', form);

		return { form };
	}
} satisfies Actions;