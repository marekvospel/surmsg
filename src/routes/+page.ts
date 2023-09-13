import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { useSurreal } from "$lib/surreal";

export const load: PageLoad = async () => {
  if (browser) {
    if (!localStorage.getItem('surmsg-token')) {
      throw redirect(301, '/login')
    }

    const surrealdb = await useSurreal()
    try {
      await surrealdb.authenticate(localStorage.getItem('surmsg-token')!)
      await surrealdb.info()
    } catch {
      localStorage.removeItem('surmsg-token')
      throw redirect(301, '/login')
    }
  }
}