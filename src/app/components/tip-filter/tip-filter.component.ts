import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrandService } from '../../services/brand.service'
import { Brand } from '../../models/brand.model'
import { Channel } from '../../models/channel.model'
import { AutocompleteFieldComponent } from '../autocomplete-field/autocomplete-field.component'
import { Model } from '../../models/model.model'
import { ModelService } from '../../services/model.service'
import { ChannelService } from '../../services/channel.service'
import { System } from '../../models/system.model'
import { Part } from '../../models/part.model'
import { SystemService } from '../../services/system.service'
import { PartService } from '../../services/part.service'
import { CheckboxFieldComponent } from "../checkbox-field/checkbox-field.component"
import { TipService } from '../../services/tip.service'
import { TipFilter } from '../../models/tip-filter.model'
import { FormsModule } from "@angular/forms"
import { SearchFieldComponent } from "../search-field/search-field.component";

@Component({
  selector: 'app-tip-filter',
  standalone: true,
  imports: [
    AutocompleteFieldComponent,
    CommonModule,
    CheckboxFieldComponent,
    FormsModule,
    SearchFieldComponent
],
  templateUrl: './tip-filter.component.html',
  styleUrls: ['./tip-filter.component.scss']
})
export class TipFilterComponent {

  @ViewChild('channelAutocomplete') channelAutocomplete!: AutocompleteFieldComponent<Channel>
  @ViewChild('systemAutocomplete') systemAutocomplete!: AutocompleteFieldComponent<System>
  @ViewChild('partAutocomplete') partAutocomplete!: AutocompleteFieldComponent<Part>
  @ViewChild('brandAutocomplete') brandAutocomplete!: AutocompleteFieldComponent<Brand>
  @ViewChild('modelAutocomplete') modelAutocomplete!: AutocompleteFieldComponent<Model>
  @Output() tipFilter = new EventEmitter<TipFilter>()
  @Output() tipFilterClear = new EventEmitter<void>()

  searchTextFilter: string = ''
  channelFilter?: Channel|undefined
  systemFilter?: System|undefined
  partFilter?: Part|undefined
  brandFilter?: Brand|undefined
  modelFilter?: Model|undefined
  onlyWithProductFilter: boolean = false

  constructor(
    public tipService: TipService,
    public channelService: ChannelService,
    public systemService: SystemService,
    public partService: PartService,
    public brandService: BrandService,
    public modelService: ModelService
  ) {}

  channelLabel = (c: Channel) => c?.name
  systemLabel = (s: System) => s?.name
  partLabel = (p: Part) => p?.name
  brandLabel = (b: Brand) => b?.name
  modelLabel = (m: Model) => m?.name 

  onChannelSelected(channel: Channel) {
    this.channelFilter = channel
  }

  onSystemSelected(system: System) {
    this.systemFilter = system
  }

  onPartSelected(part: Part) {
    this.partFilter = part
  }

  onBrandSelected(brand: Brand) {
    this.brandFilter = brand
    this.modelFilter = undefined
    this.modelAutocomplete?.clearInput()
  }

  onModelSelected(model: Model) {
    this.modelFilter = model
  }

  applyFilters() {
    const filter = {
      searchText: this.searchTextFilter,
      channelId: this.channelFilter?.id,
      systemId: this.systemFilter?.id,
      partId: this.partFilter?.id,
      brandId: this.brandFilter?.id,
      modelId: this.modelFilter?.id,
      onlyWithProduct: this.onlyWithProductFilter
    } as TipFilter

    this.tipFilter.emit(filter)
  }

  cleanFilters() {
    this.searchTextFilter = ''
    this.channelFilter = undefined
    this.systemFilter = undefined
    this.partFilter = undefined
    this.brandFilter = undefined
    this.modelFilter = undefined
    this.onlyWithProductFilter = false

    this.channelAutocomplete?.clearInput()
    this.systemAutocomplete?.clearInput()
    this.partAutocomplete?.clearInput()
    this.brandAutocomplete?.clearInput()
    this.modelAutocomplete?.clearInput()

    this.tipFilterClear.emit()
  }
}
