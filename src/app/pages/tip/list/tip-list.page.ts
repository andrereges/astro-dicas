import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from "@angular/core"
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
export class TipListPage implements OnInit, AfterViewChecked {

  processed = false
  tips: Tip[] = []
  filter: TipFilter = {}

  constructor(
    private tipService: TipService,
    private instagram: InstagramEmbedService
  ) {}

  ngOnInit() {
    this.tipService.search({}).subscribe(result => {
      this.tips = result;
    });
  }

  ngAfterViewChecked() {
    if (this.tips.length && !this.processed) {
      this.instagram.load();
      this.instagram.process();
      this.processed = true;
    }
  }

  onFilterChange(filter: TipFilter) {
    this.tips = []

    this.tipService.search(filter).subscribe(result => {
      this.tips = result

      setTimeout(() => this.renderInstagramEmbeds(), 0)
    })
  }

  onClearFilters() {
    this.tips = []
  }

  private loadInstagramScript(): Promise<void> {
    return new Promise(resolve => {
      if ((window as any).instgrm) {
        this.processed = true
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        this.processed = true
        resolve()
      }
      document.body.appendChild(script)
    })
  }

  private renderInstagramEmbeds() {
    if ((window as any).instgrm?.Embeds) {
      (window as any).instgrm.Embeds.process()
    }
  }

  async ngAfterViewInit() {
    await this.loadInstagramScript()

    this.tipService.search(this.filter).subscribe(result => {
      this.tips = result

      // Aguarda o Angular renderizar o DOM
      setTimeout(() => this.renderInstagramEmbeds(), 0)
    })
  }
}