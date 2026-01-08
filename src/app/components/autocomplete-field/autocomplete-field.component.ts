import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { AutocompleteContext, AutocompleteDataSource } from '../../models/autocomplete.model'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-autocomplete-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss']
})
export class AutocompleteFieldComponent<T> implements OnInit {

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger

  @Input({ required: true }) label!: string
  @Input({ required: true }) dataSource!: AutocompleteDataSource<T>
  @Input({ required: true }) displayWith!: (item: T) => string
  @Input() context?: AutocompleteContext
  
  @Output() valueChange = new EventEmitter<T>()

  state = {
    items: [] as T[],
    page: 0,
    hasMore: true,
    loading: false,
    search: ''
  }

  ngOnInit() {
    this.load()
  }

  selectedItem?: T

  onInputChange(value: string) {
    if (!value) {
      this.clearInput()
    }

    this.onSearch(value)
  }

  onSearch(value: string) {
    this.state.search = value
    this.state.page = 0
    this.state.items = []
    this.state.hasMore = true

    setTimeout(() => {
      this.load()
    })
  }

  load() {
    if (this.state.loading || !this.state.hasMore) return

    this.state.loading = true

    this.dataSource
      .search(
        this.state.search,
        this.state.page,
        this.context
      )
      .subscribe(res => {
        this.state.items.push(...res.items)
        this.state.hasMore = res.hasMore
        this.state.page++
        this.state.loading = false
      })
  }

  onSelected(item: T) {
    this.valueChange.emit(item)
  }

  clearInput() {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = ''
    }

    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.closePanel()
      this.autocompleteTrigger._onChange('')
    }

    this.onSearch('')

    this.selectedItem = undefined

    this.valueChange.emit(undefined)
  }

  onClearClick(event: MouseEvent) {
    event.stopPropagation()
    this.clearInput()
  }
}