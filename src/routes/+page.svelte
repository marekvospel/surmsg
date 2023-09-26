<script lang="ts">
  import { messages, useSurreal } from "$lib/surreal";
  import { t } from "svelte-i18n";
  import AuthButton from "$lib/components/AuthButton.svelte";
  import NewMessage from "$lib/components/msgs/NewMessage.svelte";
  let newMessage = "";

  async function sendMessage() {
    if (!!newMessage) {
      const db = await useSurreal();
      const me = await db.info();
      await db.create("message", {
        content: newMessage,
        author: me?.id,
        created: new Date(),
      });
      newMessage = "";
    }
  }

  function logout() {
    localStorage.removeItem("surmsg-token");
    window.location.reload();
  }
</script>

<div class="flex flex-row 2xl:px-wrap2xl gap-8">
  <div class="mt-10">
    <AuthButton size="small" on:click={logout}>
      {$t("logout")}
    </AuthButton>
  </div>

  <ul
    class="flex flex-col gap-2 h-[calc(100vh-84px)] overflow-scroll w-full relative bottom-0"
  >
    {#each $messages as message}
      <li>&lt;{message.author.replace(/^user:/, "")}&gt; {message.content}</li>
    {/each}
    <br />
  </ul>
</div>

<div class="w-screen bg-system-dark-700 2xl:px-wrap2xl py-4 absolute bottom-0">
  <NewMessage bind:newMessage on:sendMessage={() => sendMessage()} />
</div>
