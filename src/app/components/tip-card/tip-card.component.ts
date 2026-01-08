import {
  Component,
  Input
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatChipsModule } from '@angular/material/chips'
import { MatCardModule } from '@angular/material/card'
import { Tip } from '../../models/tip.model'

@Component({
  selector: 'app-tip-card',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './tip-card.component.html',
  styleUrls: ['./tip-card.component.scss']
})
export class TipCardComponent {

  @Input({ required: true })
  tips: Tip[] = []
}
