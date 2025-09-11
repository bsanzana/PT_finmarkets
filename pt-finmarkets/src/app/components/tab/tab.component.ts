import { ChangeDetectionStrategy, Component, signal, type OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { InstrumentListComponent } from '../instrument-list/instrument-list.component';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tab',
  imports: [CommonModule, TabsModule, InstrumentListComponent, FormsModule],
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  activeTab = signal('0');

  onTabChange($event: any) {
    this.activeTab.set($event);
  }
  ngOnInit() {}
}
