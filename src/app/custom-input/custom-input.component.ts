import { Component, effect, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <input
      type="text"
      (input)="onInput($event)"
      (blur)="onBlur()"
      [disabled]="disabled()"
      [value]="formattedValue()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  formattedValue = signal<string | null>('');
  formattedValueEffect = effect(() => {
    if (this.formattedValue()) {
      this.onChange(this.formattedValue());
      console.log(this.formattedValue());
    }
  });
  disabled = signal(false);

  onInput(event: Event): void {
    let value = (event.target as HTMLInputElement).value;

    // Remove non-digits
    value = value.replace(/[^0-9]/g, '');
    this.formattedValue.set(value);
  }

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.formattedValue.set(value?.toString() || null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(_isDisabled: boolean): void {
    this.disabled.set(_isDisabled);
  }
}
