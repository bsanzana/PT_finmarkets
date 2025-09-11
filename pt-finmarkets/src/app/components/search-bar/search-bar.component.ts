import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { HistoryService } from '@services/history.service';
import { Index } from '@interfaces/index.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [FormsModule, InputTextModule, SelectModule],
})
export class SearchBarComponent implements OnInit {
  historyService = inject(HistoryService);
  indexes = this.historyService.indexes();
  selectedIndex = this.historyService.selectedIndex();

  ngOnInit() {}

  onIndexChange(index: Index) {
    if (!index) return;

    this.historyService.selectedIndex.set(index);
  }

  loadData() {
    this.historyService.getHistory('history-AGUAS-A.json').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
