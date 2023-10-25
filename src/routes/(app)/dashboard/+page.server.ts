import { fail } from '@sveltejs/kit'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from '../$types'

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const userData = await supabase.auth.getUser()
	let hasUnverifiedEmail = false

	if (userData.data.user?.new_email) {
		hasUnverifiedEmail = true
	}

	return { hasUnverifiedEmail }
}

export const actions: Actions = {
	updateAccount: async ({ request, locals: { supabase } }) => {
		const form = await request.formData()
		const email = form.get('email')

		const { error: updateUserError } = await supabase.auth.updateUser({
			email
		})

		if (updateUserError) {
			console.log('Could not update user', updateUserError)
			return fail(500)
		}

		console.log('User email changed to', email)
	},

	resendEmailConfirmation: async ({ locals: { supabase } }) => {
		const userData = await supabase.auth.getUser()
		const newEmail = userData.data.user?.new_email

		const { error: resendEmailConfirmationError } = await supabase.auth.resend({
			type: 'email_change',
			email: newEmail
		})

		if (resendEmailConfirmationError) {
			console.log('Could not resend email verification email', resendEmailConfirmationError)
			return fail(500)
		}

		console.log('email change confirmation resent')
	}
}
