import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TipFilterComponent } from "../../../components/tip-filter/tip-filter.component"
import { TipCardComponent } from "../../../components/tip-card/tip-card.component"
import { Tip } from "../../../models/tip.model"
import { TipService } from "../../../services/tip.service"
import { TipFilter } from "../../../models/tip-filter.model"
import { MenuTopComponent } from "../../../components/menu-top/menu-top.component"
import { InstagramEmbedService } from "../../../services/instagram-embed.service"

@Component({
  selector: 'app-tip-list',
  standalone: true,
  imports: [
    CommonModule,
    TipFilterComponent,
    TipCardComponent,
    MenuTopComponent
  ],
  templateUrl: './tip-list.page.html',
  styleUrls: ['./tip-list.page.scss']
})
export class TipListPage implements OnInit {

  processed = false
  tips: Tip[] = []
  filter: TipFilter = {}

  constructor(
    private tipService: TipService,
    private instagramEmbedService: InstagramEmbedService
  ) {}

  ngOnInit() {
    this.tipService.search({}).subscribe(result => {
      this.tips = result
    })

    if (this.tips.length && !this.processed) {
      this.instagramEmbedService.load()
      this.instagramEmbedService.process()
      this.processed = true
    }
  }

  onFilterChange(filter: TipFilter) {
    this.tips = []

    this.tipService.search(filter).subscribe(result => {
      this.tips = result

     setTimeout(() => this.instagramEmbedService.process(), 0)
    })
  }

  onClearFilters() {
    this.tips = []
  }
}