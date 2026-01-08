import { AfterViewInit, Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TipFilterComponent } from "../../../components/tip-filter/tip-filter.component"
import { TipCardComponent } from "../../../components/tip-card/tip-card.component"
import { Tip } from "../../../models/tip.model"
import { TipService } from "../../../services/tip.service"
import { TipFilter } from "../../../models/tip-filter.model"

@Component({
  selector: 'app-tip-list',
  standalone: true,
  imports: [
    CommonModule,
    TipFilterComponent,
    TipCardComponent
],
  templateUrl: './tip-list.page.html',
  styleUrls: ['./tip-list.page.scss']
})
export class TipListPage implements AfterViewInit {

  tips: Tip[] = []

  constructor(private tipService: TipService) {}

  onFilterChange(filter: TipFilter) {
    this.tips = []

    this.tipService.search(filter).subscribe(result => {
      this.tips = result
    })

    this.loadInstagramScript()
  }

  onClearFilters() {
    this.tips = []
    this.loadInstagramScript()
  }

  ngAfterViewInit() {
    this.loadInstagramScript()
  }

  private loadInstagramScript() {
    if (!(window as any).instgrm) {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }

    this.renderInstagramEmbeds()
  }

  private renderInstagramEmbeds() {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  }
}