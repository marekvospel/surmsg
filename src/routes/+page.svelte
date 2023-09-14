<script lang="ts">
  import { messages, useSurreal } from '$lib/surreal'
  import { t } from 'svelte-i18n'

  let newMessage = ''

  async function sendMessage() {
    const db = await useSurreal()
    const me = await db.info()
    await db.create('message', {
      content: newMessage,
      author: me?.id,
      created: new Date()
    })
    newMessage = ''
  }

  function logout() {
    localStorage.removeItem('surmsg-token')
    window.location.reload()
  }
</script>

<button type="button" on:click={logout}>
  {$t('logout')}
</button>

{#each $messages as message}
  <li>&lt;{message.author}&gt; {message.content}</li>
{/each}
<br>
<form on:submit|preventDefault={sendMessage}>
  <input bind:value={newMessage} placeholder="{$t('message')}">
  <button type="submit">{$t('send')}</button>
</form>