import { SimpleChanges } from '@angular/core';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() stat = {};
  constructor() { }
  chart: any;

  ngOnChanges(changes: SimpleChanges) :void {
    if(this.chart)
      this.chart.destroy();
    this.buildChart();
  }
  ngOnInit(): void {
    // this.buildChart();
  }

  buildChart() {
    console.log(this.stat)
    let labels = Object.keys(this.stat);

    let values = Object.values(this.stat);

      this.chart = new Chart('myChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of repsonse',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
  }
}
