// host.component.spec.ts (o dentro del spec de integración)
import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { HeaderComponent } from '@components/header/header.component';
import { HistoryService } from '@services/history.service';
import { ResumenService } from '@services/resumen.service';
import { provideHttpClient } from '@angular/common/http';

class ResumenServiceMock {
  resumenIndexSelected = signal<any | null>(null);
  getResumen = jasmine.createSpy('getResumen').and.callFake(() =>
    of({
      data: {
        price: {
          lastPrice: 123,
          performanceAbsolute: 0.12,
          performanceRelative: 0.34,
        },
      },
    }),
  );
}

@Component({
  selector: 'app-host',
  template: `
    <app-search-bar></app-search-bar>
    <app-header></app-header>
  `,
  standalone: true,
  imports: [SearchBarComponent, HeaderComponent],
})
class HostComponent {}

describe('Integración: SearchBar + Header', () => {
  let fixture: ComponentFixture<HostComponent>;
  let historyService: HistoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        HistoryService,
        { provide: ResumenService, useClass: ResumenServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    historyService = TestBed.inject(HistoryService);
    fixture.detectChanges();
  });

  it('Refleja en <h1> del Header el cambio de índice hecho desde el SearchBar', () => {
    // 1) Tomar el H1 actual
    const h1 = () => fixture.nativeElement.querySelector('app-header h1') as HTMLElement;
    expect(h1().textContent?.trim()).toBe(historyService.selectedIndex().name);

    // 2) Disparar cambio en el p-select del SearchBar (simula usuario)
    const selectDebug = fixture.debugElement.query(By.css('app-search-bar p-select'));
    const nuevo = { name: 'IPSA', path: 'history-IPSA.json' };

    // (onChange)="onIndexChange($event.value)"
    selectDebug.triggerEventHandler('onChange', { value: nuevo });
    fixture.detectChanges();

    // 3) Verificar que el Header muestra el nuevo nombre
    expect(h1().textContent?.trim()).toBe('IPSA');
  });

  it('Cambiando valor directamente en el servicio y viendo como se refleja en la UI', () => {
    const h1 = () => fixture.nativeElement.querySelector('app-header h1') as HTMLElement;

    historyService.selectedIndex.set({ name: 'CAP', path: 'history-CAP.json' });
    fixture.detectChanges();

    expect(h1().textContent?.trim()).toBe('CAP');
  });
});
