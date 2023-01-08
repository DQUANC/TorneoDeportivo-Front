import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamRestService } from 'src/app/services/teamRest/team-rest.service';
import { ActivatedRoute } from '@angular/router';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit {
  idLeague:any;
  idTeam:any;
  teams:any;

  constructor(
    private teamRest: TeamRestService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( idRuta=>{
      this.idLeague = idRuta.get('idL');
      this.updateGraph();
    });
  }

  updateGraph(){
    this.teamRest.getTeams(this.idLeague).subscribe({
      next: (res:any)=> {this.teams = res.teams;  
      this.pieChartData.labels = res.names;
      this.pieChartData.datasets[0].data = res.points;
      this.chart?.update();},
      error: (err)=>{alert(err.error.message);
        this.router.navigateByUrl('');
      }
    });
  }
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels:[] ,
    datasets: [ {
      data: []
    } ]
  };
 
@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

// Pie
public pieChartOptions: ChartConfiguration['options'] = {
  responsive: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      formatter: (value, ctx) => {
        if (ctx.chart.data.labels) {
          return ctx.chart.data.labels[ctx.dataIndex];
        }
      },
    },
  }
};


public pieChartType: ChartType = 'pie';

// events
public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}
}

