import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-chart',
    imports: [],
    templateUrl: './chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {

    ngOnInit(): void { }

}
