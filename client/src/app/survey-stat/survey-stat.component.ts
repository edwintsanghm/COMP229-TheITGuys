import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-survey-stat',
  templateUrl: './survey-stat.component.html',
  styleUrls: ['./survey-stat.component.css']
})
export class SurveyStatComponent implements OnInit {

  dataSource:any = [];
  stat: any = {};
  isShowChart = false;
  constructor(private surveyService: SurveyService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.surveyService.getSurveySummary(params.get('id')!))
    ).subscribe((data: any) => { 
      this.dataSource = data.findedUserResponse; 
console.log(data.findedUserResponse)
      this.stat = this.dataSource.summary[0].stat;
      console.log(this.stat.hasOwnProperty("textRespond"))
      this.isShowChart = !this.stat.hasOwnProperty("textRespond");

    });

   // this.surveyService.getSurveySummary().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
 
  }

  showChart(stat: any): void  {
    console.log(stat)
    this.isShowChart = !stat.hasOwnProperty("textRespond");
    this.stat = stat;
  }

  exportexcel(): void
  {
    /* pass here the table id */

    let arr :any= [];  
    const mydata = this.dataSource.summary;

    mydata.forEach((currentValue: { title: any; stat:any}, index: any) => {
      if(!!currentValue.stat){

      let isFirst = true;
      Object.keys(currentValue.stat).map(function(key){  
        

        if(isFirst){
          arr.push({'Question':currentValue.title,'Answer':key, 'Count':currentValue.stat[key]})  
        } else{
          arr.push({'Answer':key, 'Count':currentValue.stat[key]}) 
        } 

        isFirst = false;
          return arr;  
      });  
    }
    });

    
    /*
    console.log(mydata)
    Object.keys(mydata).map(function(key){  
      console.log(key);
      console.log(mydata[key]);
        arr.push({'ans':key,
        'cnt':mydata[key]})   
        return arr;  
    });  
    */
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(  arr);
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'summary.xlsx');
 
  }
}
