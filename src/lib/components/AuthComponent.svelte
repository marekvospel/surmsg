<script lang="ts">
  import { goto } from "$app/navigation";
  import { surrealConnect } from "$lib/surreal";
  import { Surreal } from "surrealdb.js";
  import { t } from "svelte-i18n";
  import AuthInput from "./AuthInput.svelte";
  import AuthButton from "./AuthButton.svelte";
  import { manageUser } from "$lib/userstore";

  export let type: "signin" | "signup" = "signin";

  let username = "";
  let password = "";

  async function login() {
    const db = new Surreal();
    await surrealConnect(db);

    try {
      const token = await db?.[type]({
        SC: "user",
        NS: "dev",
        DB: "dev",
        username,
        password,
      });

      localStorage.setItem("surmsg-token", token!);
      goto("/", {
        replaceState: true,
      });
      manageUser.set(username);
    } catch (e) {
      console.error("error:", e);
    }
  }
</script>

<div class="flex justify-center items-center h-screen flex-col gap-8">
  <pre class="text-system-primary">                        
  _______  _________  _____   ______ ____  
 /  ___/  |  \_  __ \/     \ /  ___// ___\ 
 \___ \|  |  /|  | \/  Y Y  \\___ \/ /_/  |
/____  |____/ |__|  |__|_|  /____  /___  / 
     \/                   \/     \/_____/  
</pre>
  <form
    on:submit|preventDefault={login}
    class="flex flex-col items-start gap-2"
  >
    <AuthInput bind:value={username} placeholder={$t('username')} />
    <AuthInput type="password" bind:value={password} placeholder={$t('password')} />
    <AuthButton submit>
      {type === "signin" ? $t("login") : $t("register")}
    </AuthButton>
    <!-- <button type="submit"
      >{type === "signin" ? $t("login") : $t("register")}</button
    > -->
    <br />
    {#if type === "signin"}
      <a href="/register">{ $t('noAccount' )}</a>
    {:else}
      <a href="/login">{ $t('areadyHaveAccount') }</a>
    {/if}
  </form>
</div>
