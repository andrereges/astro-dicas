import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AutocompleteDataSource,
  AutocompletePage
} from '../models/autocomplete.model';
import { Channel } from '../models/channel.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChannelService
  implements AutocompleteDataSource<Channel> {

  private readonly list: Channel[] = []

  constructor(private http: HttpClient) {
    this.loadMock()
  }

  search(
    search: string,
    page: number
  ): Observable<AutocompletePage<Channel>> {

    const pageSize = 10;
    const filtered = this.list.filter(item =>
      this.normalize(item.name).includes(this.normalize(search))
    );

    const start = page * pageSize;

    return of({
      items: filtered.slice(start, start + pageSize),
      hasMore: start + pageSize < filtered.length
    });
  }

  private loadMock() {
    this.http
      .get<Channel[]>('assets/mocks/channels.json')
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
