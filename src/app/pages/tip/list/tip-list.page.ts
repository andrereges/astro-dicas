import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core"
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
export class TipListPage implements OnInit, AfterViewInit {

  private instagramReady = false
  processed = false
  tips: Tip[] = []
  filter: TipFilter = {}

  constructor(
    private tipService: TipService,
    private instagramEmbedService: InstagramEmbedService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTips({})
  }

  ngAfterViewInit() {
    this.loadInstagramIfNeeded()
  }

  onFilterChange(filter: TipFilter) {
    this.loadTips(filter)
  }

  private loadTips(filter: TipFilter) {
    this.processed = false

    this.tips = []

    this.tipService.search(filter).subscribe(result => {
      this.tips = result

      this.changeDetectorRef.detectChanges()

      requestAnimationFrame(() => {
        this.instagramEmbedService.process()
      })

      this.processed = true
    }) 
  }

  private loadInstagramIfNeeded() {
    if (this.instagramReady) {
      return
    }

    this.instagramEmbedService.load()
    this.instagramReady = true
  }
}