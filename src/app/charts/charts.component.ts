import { Component, OnInit, VERSION } from '@angular/core';
import { AdminService } from '../adminServices/admin.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  constructor(private mainservice: AdminService) {}
  ngOnInit(): void {
    this.mainservice.getOrders(new Date()).subscribe((x: any) => {
      var y: any = document.getElementById('chart');
      //   new Chart(y, {
      //     type: 'bar',
      //     data: {
      //       labels:x[0].Transactions[0].ProductId ,
      //       datasets: [{
      //         label: '# of Votes',
      //         data: [12, 19, 3, 5, 2, 3],
      //         borderWidth: 1
      //       }]
      //     },
      //     options: {
      //       scales: {

      //       }
      //     }
      // })
    });
  }
  click() {}

  private barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  private barChartLabels: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  private barChartType: string = 'bar';
  private barChartLegend: boolean = true;

  private barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];

  // events
  private chartClicked(e: any): void {}

  private chartHovered(e: any): void {}
}
