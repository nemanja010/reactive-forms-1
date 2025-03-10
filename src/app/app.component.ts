import { Component, effect, signal } from '@angular/core';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CustomInputComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  testFc = new FormControl<string | null>('1');
  templateValue = signal<string | null>('2');
}
