<script lang="ts">
	import { enhance } from '$app/forms'

	export let data

	$: ({ testTable, user } = data)
	$: hasUnverifiedEmail = data.hasUnverifiedEmail
</script>

<form
	method="POST"
	action="?/updateAccount"
	use:enhance
>
	<input
		type="email"
		name="email"
		bind:value={user.email}
	/>
	<button type="submit">Update</button>
</form>

{#if hasUnverifiedEmail}
	<form
		method="POST"
		action="?/resendEmailConfirmation"
		use:enhance
	>
		<button type="submit">Resend email confirmation</button>
	</form>
{/if}

<hr />

<div class="block">
	<p>Protected content for {user.email}</p>
	<p>server-side fetched data with RLS:</p>
	<pre>{JSON.stringify(testTable, null, 2)}</pre>
</div>
<div class="block">
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>
