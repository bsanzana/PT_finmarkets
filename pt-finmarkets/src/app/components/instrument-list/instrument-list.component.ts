import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-instrument-list',
    imports: [],
    templateUrl: './instrument-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentListComponent implements OnInit {

    ngOnInit(): void { }

}
