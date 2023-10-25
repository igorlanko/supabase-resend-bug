import { redirect } from '@sveltejs/kit';

export const load = async ({ parent, data }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: testTable } = await supabase.from('test').select('*');
	return {
		testTable,
		user: session.user,
		hasUnverifiedEmail: data.hasUnverifiedEmail
	};
};
