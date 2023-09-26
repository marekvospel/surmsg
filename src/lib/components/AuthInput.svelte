<script lang="ts">
  export let type: "text" | "password" = "text";
  export let value: string;
  export let placeholder: string;
</script>

{#if type === "password"}
  <div class="flex flex-col w-full gap-2">
    <input type="password" class="type-text" {placeholder} bind:value />
  </div>
{:else}
  <div class="flex flex-col w-full gap-2 h-full">
    <input type="text" class="type-text" {placeholder} bind:value />
  </div>
{/if}

<style scoped lang="scss">
  .type-text {
    @apply px-2 py-2 text-lg text-black rounded-md w-full h-full;
  }
</style>
