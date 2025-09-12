import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { InstrumentListComponent } from '../instrument-list/instrument-list.component';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { FormsModule } from '@angular/forms';
import { ConstituentsService } from '../../services/constituens.services';
import { Constituent } from '../../interfaces/constituens.interface';
@Component({
  selector: 'app-tab',
  imports: [CommonModule, TabsModule, InstrumentListComponent, FormsModule],
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  activeTab = signal('0');
  constituensService = inject(ConstituentsService);
  constituents = signal<Constituent[]>([]);
  error = signal<boolean>(false);

  indexes = { '0': 'IPSA', '1': 'IGPA', '2': 'NASDAQ', '3': 'DOW JONES', '4': 'SP/BVL' };
  half = signal<number>(0);
  leftData = signal<Constituent[]>([]);
  rightData = signal<Constituent[]>([]);

  constructor() {
    effect(() => {
      console.log('Active tab changed to:', this.activeTab());
      this.loadData();
    });
  }

  loadData() {
    this.constituensService
      .getConstituents(this.indexes[this.activeTab() as keyof typeof this.indexes])
      .subscribe({
        next: (res) => {
          this.constituents.set(res.data.constituents);
          this.half.set(Math.ceil(this.constituents().length / 2));
          this.leftData.set(this.constituents().slice(0, this.half()));
          this.rightData.set(this.constituents().slice(this.half()));
          this.error.set(false);
        },
        error: (error: any) => {
          console.error(error);
          this.error.set(true);
        },
      });
  }

  onTabChange($event: any) {
    this.activeTab.set($event);
  }
  ngOnInit() {}
}
