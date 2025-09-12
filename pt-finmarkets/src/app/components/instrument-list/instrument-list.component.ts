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
  imports: [CommonModule, TableModule, ProgressSpinnerModule],
  templateUrl: './instrument-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentListComponent {
  data = input<Constituent[]>([]);
}
