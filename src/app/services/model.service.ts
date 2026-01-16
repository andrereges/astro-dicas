import { Observable, of } from "rxjs"
import { AutocompleteContext, AutocompleteDataSource, AutocompletePage } from "../models/autocomplete.model"
import { Model } from "../models/model.model"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Injectable({ providedIn: 'root' })
export class ModelService implements AutocompleteDataSource<Model> {

  private readonly list: Model[] = []

  constructor(private http: HttpClient) {
    this.loadMock()
  }

  search(
    search: string,
    page: number,
    context?: AutocompleteContext
  ): Observable<AutocompletePage<Model>> {

    const pageSize = 5

    let filtered = this.list

    if (context?.brandId) {
      filtered = filtered.filter(
        item => item.brandId === context.brandId
      )
    }

    if (search) {
      filtered = filtered.filter(
        item => this.normalize(item.name).includes(this.normalize(search))
      )
    }

    const start = page * pageSize

    return of({
      items: filtered.slice(start, start + pageSize),
      hasMore: start + pageSize < filtered.length
    })
  }

  private loadMock() {
    this.http
      .get<Model[]>('assets/mocks/models.json')
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
