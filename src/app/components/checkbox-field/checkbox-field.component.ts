import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent {

  @Input() checked = false
  @Input({ required: true }) label!: string

  @Output() checkedChange = new EventEmitter<boolean>()

  onChange(event: MatCheckboxChange) {
    this.checkedChange.emit(event.checked)
  }
}