<script lang="ts">
  import { goto } from "$app/navigation";
  import { surrealConnect } from "$lib/surreal";
  import { Surreal } from "surrealdb.js";
  import { t } from 'svelte-i18n'

  export let type: 'signin' | 'signup' = 'signin'

  let username = ''
  let password = ''

  async function login() {
    const db = new Surreal()
    await surrealConnect(db)

    try {
      const token = await db?.[type]({
        SC: 'user',
        NS: 'dev',
        DB: 'dev',
        username,
        password,
      })

      localStorage.setItem('surmsg-token', token!)
      goto('/', {
        replaceState: true,
      })
    } catch (e) {
      console.error('error:', e)
    }

  }
</script>

<form on:submit|preventDefault={login}>
  <input type="text" bind:value={username} placeholder={$t('username')}>
  <input type="password" bind:value={password} placeholder={$t('password')}>
  <button type="submit">{ type === 'signin' ? $t('login') : $t('register') }</button>
  <br>
  {#if type === 'signin'}
    <a href="/register">{ $t('noAccount') }</a>
  {:else}
    <a href="/login">{ $t('areadyHaveAccount') }</a>
  {/if}
</form>