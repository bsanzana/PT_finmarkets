import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-tab',
    imports: [],
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {

    ngOnInit(): void { }

}
