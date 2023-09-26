<script lang="ts">
  import { t } from "svelte-i18n";
  import { createEventDispatcher } from "svelte";
  import AuthButton from "../AuthButton.svelte";
  import AuthInput from "../AuthInput.svelte";
  const dispatch = createEventDispatcher();

  export let newMessage = "";
</script>

<div class="w-full">
  <form
    on:submit|preventDefault={() => dispatch("sendMessage")}
    class="flex flex-row gap-4 items-center"
  >
    <AuthInput bind:value={newMessage} placeholder={$t("message")} />
    <AuthButton submit>{$t("send")}</AuthButton>
  </form>
</div>
