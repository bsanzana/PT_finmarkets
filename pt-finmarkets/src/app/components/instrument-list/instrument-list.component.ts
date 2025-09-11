import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  type OnInit,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConstituentsService } from '@services/constituens.services';
import { Constituent } from '@app/interfaces/constituens.interface';
import { Message } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-instrument-list',
  imports: [CommonModule, TableModule, Message, ProgressSpinnerModule],
  templateUrl: './instrument-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentListComponent {
  indexSelected = input<string | null>(null);
  constituensService = inject(ConstituentsService);
  constituents = signal<Constituent[]>([]);

  error = signal<boolean>(false);
  constructor() {
    effect(() => {
      console.log('Index selected changed to:', this.indexSelected());
      this.loadData();
    });
  }

  loadData() {
    if (!this.indexSelected()) return;
    this.constituensService
      .getConstituents(this.indexSelected()!.replace(/^constituents-/, ''))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.constituents.set(res.data.constituents);
          this.error.set(false);
        },
        error: (error: any) => {
          console.error(error);
          this.error.set(true);
        },
      });
  }
}
