import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() click: EventEmitter<any> = new EventEmitter()

  @Input() text: string
  @Input() type: string
  @Input() disabled: boolean = false

  handleClick(event: any) {
    this.click.emit(event)
  }
}
