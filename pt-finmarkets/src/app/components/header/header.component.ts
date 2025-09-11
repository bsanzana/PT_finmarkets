import { ChangeDetectionStrategy, Component, effect, inject, type OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { ResumenService } from '../../services/resumen.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [DecimalPipe],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
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
