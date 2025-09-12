import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { HistoryService } from '../../services/history.service';

describe('SearchBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule, SelectButtonModule],
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    }).compileComponents();
  });

  it('should create the search bar', () => {
    const fixture = TestBed.createComponent(SearchBarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render SelectButton', () => {
    const fixture = TestBed.createComponent(SearchBarComponent);
    const selectBtn = fixture.debugElement.query(By.css('p-selectbutton, p-select'));
    expect(selectBtn).toBeTruthy();
  });
});
