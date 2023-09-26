import Surreal from 'surrealdb.js'
import { get, readable, type Readable } from 'svelte/store'

let db: Surreal = new Surreal()
let connected = false

export async function useSurreal(): Promise<Surreal> {
  if (!connected) {
    await surrealConnect(db)
    connected = true
  }

  return db
}

export async function surrealConnect(db: Surreal): Promise<Surreal> {
  await db.connect(/*new URL('/rpc', window.location.href).href*/ 'https://surmsg.vospel.cz/rpc')

  return db
}

interface Message {
  id: string,
  content: string,
  author: string,
  created: unknown
}

export function useMessages(db: Surreal): Readable<Message[]> {

  const store = readable<Message[]>([], (set) => {
    let liveQueryId: string | undefined

    db.select('message').then(data => {
      set((data as any[]).sort((a: any, b: any) =>
        new Date(a.created).getTime() - new Date(b.created).getTime()
      ))
    }).catch(console.error)

    db.live('message', (update) => {
      if (update.action === 'CREATE') {
        const newValue = get(store)
        newValue.push(update.result as any)
        set(newValue)
      } else if (update.action === 'DELETE') {
        const newValue = get(store).filter((v) => v.id === update.result as any)
        set(newValue)
      }
    }).then(queryId => liveQueryId = queryId).catch(console.error)

    return async () => {
      if (liveQueryId)
        await db.kill(liveQueryId)
    }
  })

  return {
    ...store
  }
}

export const messages = useMessages(db!)
