import { Observable } from 'rxjs'

export interface AutocompletePage<T> {
  items: T[]
  hasMore: boolean
}

export interface AutocompleteDataSource<T> {
  search(
    search: string,
    page: number,
    context?: AutocompleteContext
  ): Observable<AutocompletePage<T>>
}

export interface AutocompleteContext {
  channelId?: string
  brandId?: string
  modelId?: string
  systemId?: string
  partId?: string
  onlyWithProduct?: boolean
}
