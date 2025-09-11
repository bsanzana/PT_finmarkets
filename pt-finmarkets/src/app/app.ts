import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '@app/components/search-bar/search-bar.component';
import { HeaderComponent } from '@components/header/header.component';
import { SummaryComponent } from './components/summary/summary.component';
import { Header } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, InputTextModule, SearchBarComponent, SummaryComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('pt-finmarkets');
}
