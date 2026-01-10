import { AfterContentInit, Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TipFilterComponent } from "../../../components/tip-filter/tip-filter.component"
import { TipCardComponent } from "../../../components/tip-card/tip-card.component"
import { Tip } from "../../../models/tip.model"
import { TipService } from "../../../services/tip.service"
import { TipFilter } from "../../../models/tip-filter.model"
import { MenuTopComponent } from "../../../components/menu-top/menu-top.component";

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
export class TipListPage implements OnInit, AfterContentInit {

  tips: Tip[] = []
  filter: TipFilter = {}

  constructor(private tipService: TipService) { }

  ngOnInit(): void {
    this.loadInstagramScript()
  }

  ngAfterContentInit(): void {
    this.tipService.search(this.filter).subscribe(result => {
      this.tips = result
    })

    setInterval(() => this.renderInstagramEmbeds())
  }

  onFilterChange(filter: TipFilter) {
    this.tips = []

    this.tipService.search(filter).subscribe(result => {
      this.tips = result
    })

    setInterval(() => this.renderInstagramEmbeds())
  }

  onClearFilters() {
    this.tips = []
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