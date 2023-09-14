import { register, init, waitLocale, locale } from 'svelte-i18n'
import { browser } from '$app/environment'
import type { LayoutLoad } from './$types'

register('en', () => import('../locale/en.json'))
register('cs', () => import('../locale/cs.json'))
register('jp', () => import('../locale/jp.json'))

init({
	fallbackLocale: 'en',
	initialLocale: browser ? window.navigator.language : 'en',
})

export const load: LayoutLoad = async () => {
  if (browser) {
    locale.set(localStorage.getItem('locale'))
  }
  await waitLocale()
}