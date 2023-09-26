<script lang="ts">
  export let link: string = "#";
  // export let text: string;
  export let type:
    | "outer"
    | "dark-outer"
    | "dark"
    | "positive"
    | "negative"
    | "disabled"
    | undefined = undefined;
  export let customClases: string = "";
  export let submit: boolean | null = false;
  export let size: "small" | "custom" | undefined = undefined;
  export let cursor: "cursor-pointer" | "cursor-default" = "cursor-pointer";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

{#if link !== "#"}
  <a
    href={link}
    class:outer={type === "outer"}
    class="button {type ??
      'bg-system-primary text-white'} {cursor} {customClases} {size ??
      'px-7 lg:px-10 py-3'}"
    on:click={() => dispatch("click")}
  >
    <slot />
    <!-- {text} -->
  </a>
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button
    type={submit ? "submit" : "button"}
    class="button {type ??
      'bg-system-primary text-white active'} {cursor} {customClases} {size ??
      'px-7 lg:px-10 py-3'}"
    on:click={() => dispatch("click")}
  >
    <slot />
    <!-- {text} -->
  </button>
{/if}

<style scoped>
  .button {
    @apply flex items-center /*lg:text-lg*/ justify-center font-bold rounded-lg duration-200 text-center select-none;
  }
  .active {
    @apply /*hover:scale-105*/ cursor-pointer;
  }
  .outer {
    @apply border-2 border-solid border-system-primary;
  }
  .dark-outer {
    @apply border-2 border-solid border-system-dark-900 text-black;
  }
  .dark {
    @apply bg-system-dark-900 text-white;
  }
  .positive {
    @apply bg-green-500 text-white;
  }
  .negative {
    @apply bg-system-red text-white;
  }
  .small {
    @apply px-2 py-1 /*lg:px-5*/;
  }
  .disabled {
    @apply bg-gray-500 cursor-default;
  }
</style>
