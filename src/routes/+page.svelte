<script lang="ts">
  import { messages, useSurreal } from '$lib/surreal'

  let newMessage = ''

  async function sendMessage() {
    const db = await useSurreal()
    const me = await db.info()
    await db.create('message', {
      content: newMessage,
      author: me?.id,
      created: new Date()
    })
  }
</script>

{#each $messages as message}
  <li>&lt;{message.author}&gt; {message.content}</li>
{/each}
<br>
<form on:submit|preventDefault={sendMessage}>
  <input bind:value={newMessage}>
  <button type="submit">Send</button>
</form>