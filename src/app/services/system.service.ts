import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  AutocompleteDataSource,
  AutocompletePage
} from '../models/autocomplete.model'
import { System } from '../models/system.model'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class SystemService
  implements AutocompleteDataSource<System> {

  private readonly list: System[] = []

  constructor(private http: HttpClient) {
    this.loadMock()
  }

  search(
    search: string,
    page: number
  ): Observable<AutocompletePage<System>> {

    const pageSize = 5
    const filtered = this.list.filter(item =>
      this.normalize(item.name).includes(this.normalize(search))
    )

    const start = page * pageSize

    return of({
      items: filtered.slice(start, start + pageSize),
      hasMore: start + pageSize < filtered.length
    })
  }

  private loadMock() {
    this.http
      .get<System[]>('assets/mocks/systems.json')
      .subscribe({
      next: (data) => this.list.push(...data),
      error: (err) => console.error(err),
    })
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }
}
