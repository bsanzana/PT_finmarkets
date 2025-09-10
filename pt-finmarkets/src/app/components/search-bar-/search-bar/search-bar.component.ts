import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [FormsModule, InputTextModule],
})
export class SearchBarComponent implements OnInit {

    value!: string;

  constructor() { }

  ngOnInit() {
  }

}
