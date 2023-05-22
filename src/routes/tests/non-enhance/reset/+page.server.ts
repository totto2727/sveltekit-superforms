import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from '$lib/server';
import { schema } from './schemas';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
  const form = await superValidate(schema);
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, schema);
    console.log('POST', form);

    if (!form.valid) return fail(400, { form });

    return message(form, 'Posted ok!');
  }
} satisfies Actions;
