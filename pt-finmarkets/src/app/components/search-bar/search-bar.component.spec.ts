import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { Index } from '../../interfaces/index.interface';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let historyService: HistoryService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule, SelectButtonModule],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), HistoryService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    historyService = TestBed.inject(HistoryService);
    fixture.detectChanges();
  });

  it('Al cambiar el índice, se debe propagar el cambio al servicio', () => {
    const nuevo: Index = { name: 'BCI', path: 'history-BCI.json' };
    const spy = spyOn(historyService.selectedIndex, 'set').and.callThrough();
    component.onIndexChange(nuevo);
    expect(spy).toHaveBeenCalledOnceWith(nuevo);
    expect(historyService.selectedIndex()).toEqual(nuevo);
  });
});
