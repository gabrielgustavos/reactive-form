import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  styleUrls: ["./input.component.scss"],
})
export class InputComponent {
  @Output() blurEvent = new EventEmitter<any>();
  @Output() keyupEvent = new EventEmitter<any>();
  @Input() label: string;
  @Input() type: string;
  @Input() control: any;
  @Input() placeholder: string;
  @Input() maxlength: number;
  value: string;

  onChange: (value: string) => void = () => {};
  onTouch: () => void = () => {};

  writeValue(value: string) {
    this.value = value;
    this.onChange(this.value);
    this.onTouch();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  onBlur(event: any) {
    this.blurEvent.emit(event);
  }

  onKeyUp(event: any) {
    this.keyupEvent.emit(event);
  }
}
