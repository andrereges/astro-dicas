import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Tip } from '../models/tip.model'
import { TipFilter } from '../models/tip-filter.model'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class TipService {

  private readonly list: Tip[] = []

  constructor(private http: HttpClient) {
    this.loadMock()
  }

  search(filter: TipFilter): Observable<Tip[]> {

    const normalizedFilter = {
      searchText: this.normalize(filter.searchText || ''),
      channelId: filter.channelId || undefined,
      brandId: filter.brandId || undefined,
      modelId: filter.modelId || undefined,
      systemId: filter.systemId || undefined,
      partId: filter.partId || undefined,
      onlyWithProduct: filter.onlyWithProduct === true
    }

    const result = this.list.filter(t => {

      const matchesSearch =
        !normalizedFilter.searchText ||
        this.normalize(t.title).includes(normalizedFilter.searchText) ||
        this.normalize(t.summary).includes(normalizedFilter.searchText) ||
        this.normalize(t.part.name).includes(normalizedFilter.searchText) ||
        this.normalize(t.system.name).includes(normalizedFilter.searchText) ||
        this.normalize(t.model.name).includes(normalizedFilter.searchText) ||
        this.normalize(t.brand.name).includes(normalizedFilter.searchText)

      return (
        (!normalizedFilter.searchText || matchesSearch) &&
        (!normalizedFilter.channelId  || t.channel.id === normalizedFilter.channelId) &&
        (!normalizedFilter.brandId    || t.brand.id   === normalizedFilter.brandId) &&
        (!normalizedFilter.modelId    || t.model.id   === normalizedFilter.modelId) &&
        (!normalizedFilter.systemId   || t.system.id  === normalizedFilter.systemId) &&
        (!normalizedFilter.partId     || t.part.id    === normalizedFilter.partId) &&
        (!normalizedFilter.onlyWithProduct || t.onlyWithProduct === true)
      )
    })

    return of(result)
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  private loadMock() {
    this.http
      .get<Tip[]>('assets/mocks/tips.json')
      .subscribe({
        next: (data) => this.list.push(...data),
        error: (err) => console.error(err),
      })
  }
}