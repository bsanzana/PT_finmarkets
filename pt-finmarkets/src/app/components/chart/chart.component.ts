import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { HistoryService } from '../../services/history.service';
import { Chart } from '@interfaces/history.interface';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-chart',
  imports: [ChartModule, SelectButtonModule, FormsModule, DatePicker],
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  historyService = inject(HistoryService);
  selectedIndex = this.historyService.selectedIndex();
  chartData = signal<Chart[] | null>(null);
  options = signal({});
  data = signal({});
  stateOptions: any[] = [
    { label: '1D', value: '1D' },
    { label: '1S', value: '1S' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1A', value: '1A' },
    { label: '5A', value: '5A' },
  ];

  rangeDates = signal<Date[] | undefined>(undefined);

  buttonChart = signal<string>('1D');

  constructor() {
    effect(() => {
      this.selectedIndex;
      this.loadData();
    });

    effect(() => {
      this.rangeDates();
      this.initChart();
    });
  }

  loadData() {
    this.historyService.getHistory().subscribe({
      next: (res) => {
        this.chartData.set(res.data.chart);
        this.initChart();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  ngOnInit(): void {
    this.initChart();
  }

  onChangeChart() {
    this.rangeDates.set(undefined);
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    const chartArray = this.chartData() ?? [];
    const filtered = this.filterChartData(chartArray, this.buttonChart(), this.rangeDates());

    const labels = filtered.map((item) => item.datetimeLastPrice);
    const dataValues = filtered.map((item) => item.lastPrice);

    this.data.set({
      labels: labels.reverse(),
      datasets: [
        {
          label: [],
          data: dataValues.reverse(),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--p-blue-500'),
          tension: 0.4,
          backgroundColor: 'rgba(107, 114, 128, 0.2)',
        },
      ],
    });

    this.options.set({
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    });
  }

  filterChartData(chartArray: Chart[], range: string, dateRange?: Date[]): Chart[] {
    if (!chartArray.length) return [];

    // Si hay rango de fechas, filtra por ese rango
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      const filtered = chartArray.filter((item) => {
        const d = new Date(item.datetimeLastPriceTs * 1000);
        return d >= start && d <= end;
      });
      // Ordena de menor a mayor fecha
      return filtered.sort((a, b) => b.datetimeLastPriceTs - a.datetimeLastPriceTs);
    }

    // Si no hay rango de fechas, usa el filtro por botón (ya está ordenado)
    return this.filterChartByButton(chartArray, range);
  }

  filterChartByButton(chartArray: Chart[], range: string): Chart[] {
    if (!chartArray.length) return [];

    // Ordena por fecha descendente
    const sorted = [...chartArray].sort((a, b) => b.datetimeLastPriceTs - a.datetimeLastPriceTs);
    const latest = sorted[0];
    const latestDate = new Date(latest.datetimeLastPriceTs * 1000);

    let filtered: Chart[] = [];

    switch (range) {
      case '1D': {
        // Solo la fecha más actual
        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return (
            d.getDate() === latestDate.getDate() &&
            d.getMonth() === latestDate.getMonth() &&
            d.getFullYear() === latestDate.getFullYear()
          );
        });
        // Si hay menos de 10 datos, trae los 10 más recientes
        if (filtered.length < 10) {
          filtered = sorted.slice(0, 10);
        }
        break;
      }
      case '1S': {
        const weekStart = new Date(latestDate);
        weekStart.setDate(latestDate.getDate() - latestDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return d >= weekStart && d <= weekEnd;
        });
        if (filtered.length < 20) {
          filtered = sorted.slice(0, 20);
        }
        break;
      }
      case '1M': {
        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return (
            d.getMonth() === latestDate.getMonth() && d.getFullYear() === latestDate.getFullYear()
          );
        });
        if (filtered.length < 30) {
          filtered = sorted.slice(0, 30);
        }
        break;
      }
      case '3M': {
        const threeMonthsAgo = new Date(latestDate);
        threeMonthsAgo.setMonth(latestDate.getMonth() - 2);
        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return d >= threeMonthsAgo && d <= latestDate;
        });
        if (filtered.length < 120) {
          filtered = sorted.slice(0, 120);
        }
        break;
      }
      case '6M': {
        const sixMonthsAgo = new Date(latestDate);
        sixMonthsAgo.setMonth(latestDate.getMonth() - 5);
        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return d >= sixMonthsAgo && d <= latestDate;
        });
        if (filtered.length < 180) {
          filtered = sorted.slice(0, 180);
        }
        break;
      }
      case '1A': {
        const oneYearAgo = new Date(latestDate);
        oneYearAgo.setFullYear(latestDate.getFullYear() - 1);
        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return d >= oneYearAgo && d <= latestDate;
        });
        if (filtered.length < 365) {
          filtered = sorted.slice(0, 365);
        }
        break;
      }
      case '5A': {
        const fiveYearsAgo = new Date(latestDate);
        fiveYearsAgo.setFullYear(latestDate.getFullYear() - 5);
        filtered = sorted.filter((item) => {
          const d = new Date(item.datetimeLastPriceTs * 1000);
          return d >= fiveYearsAgo && d <= latestDate;
        });
        if (filtered.length < 1500) {
          filtered = sorted.slice(0, 1500);
        }
        break;
      }
      default:
        filtered = sorted;
    }

    return filtered;
  }
}
