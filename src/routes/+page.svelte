<script lang="ts">
  import { messages, useSurreal } from "$lib/surreal";
  import { t } from "svelte-i18n";
  import AuthButton from "$lib/components/AuthButton.svelte";
  import NewMessage from "$lib/components/msgs/NewMessage.svelte";
  import { manageUser } from "$lib/userstore";
  import { onMount } from "svelte";
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
  // let scroll: HTMLElement | null;

  // onMount(() => (scroll = document.getElementById("messages")));

  // $: if (scroll !== null) console.log(scroll?.scrollTop);
  // if (scroll !== null){

  // }
  // $: $messages,
</script>

<div class="flex flex-row 2xl:px-wrap2xl gap-8">
  <div class="mt-10 flex-shrink-0 w-64">
    <AuthButton size="small" on:click={logout}>
      {$t("logout")}
    </AuthButton>
    <p>Logged in as {$manageUser}</p>
  </div>

  <ul
    id="messages"
    class="flex flex-col gap-2 h-[calc(100vh-84px)] overflow-scroll w-full relative bottom-0 items-start pb-4"
  >
    {#each $messages as message, id}
      {#if message.author.replace(/^user:/, "") === $manageUser}
        <li id="message-{id}" class="self-end max-w-[60%]">
          <div
            class="flex flex-col bg-gray-700 px-4 py-2 rounded-lg rounded-tr-none"
          >
            <a class="text-system-primary" href="#">
              {message.author.replace(/^user:/, "")}:
            </a>
            <p class="grow-0 break-words">
              {message.content}
            </p>
          </div>
        </li>
      {:else}
        <li id="message-{id}" class="max-w-[60%]">
          <div
            class="flex flex-col bg-gray-700 px-4 py-2 rounded-lg rounded-tl-none grow-0"
          >
            <a class="text-system-primary grow-0" href="#">
              {message.author.replace(/^user:/, "")}:
            </a>
            <p class="grow-0 break-words">
              {message.content}
            </p>
          </div>
        </li>
      {/if}
    {/each}
    <br />
  </ul>
</div>

<div class="w-screen bg-system-dark-700 2xl:px-wrap2xl py-4 absolute bottom-0">
  <NewMessage bind:newMessage on:sendMessage={() => sendMessage()} />
</div>
