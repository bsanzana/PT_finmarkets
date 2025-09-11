import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-instrument-item',
    imports: [],
    templateUrl: './instrument-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentItemComponent implements OnInit {

    ngOnInit(): void { }

}
