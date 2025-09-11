import { ChangeDetectionStrategy, Component, effect, inject, type OnInit } from '@angular/core';
import { ResumenService } from '../../services/resumen.service';
import { HistoryService } from '../../services/history.service';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-summary',
  imports: [CommonModule, TabsModule],
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  resumenService = inject(ResumenService);
  historyService = inject(HistoryService);
  selectedIndex = this.historyService.selectedIndex;
  resumenIndexSelected = this.resumenService.resumenIndexSelected;

  constructor() {
    effect(() => {
      this.selectedIndex();
      this.loadData();
    });
  }

  ngOnInit(): void {}

  loadData() {
    this.resumenService.getResumen(this.selectedIndex().path.replace(/^history-/, '')).subscribe({
      next: (res) => {
        this.resumenIndexSelected.set(res);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
