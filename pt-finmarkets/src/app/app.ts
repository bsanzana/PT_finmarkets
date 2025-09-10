import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '@components/search-bar-/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, InputTextModule, SearchBarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {


  protected readonly title = signal('pt-finmarkets');

}

