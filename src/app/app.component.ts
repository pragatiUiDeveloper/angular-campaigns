import { Component } from '@angular/core';
import { CampaignService } from 'src/app/campaignService.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  campaigns: any;
  response: any;
  value:Date;
  eventTime: any;
  display: boolean = false;
  currentCampaign: any;

  constructor(private campaignService: CampaignService, private http: HttpClient) { }

  ngOnInit() {
      this.campaignService.getCampaigns().subscribe(res=>{
        this.response=res['campaigns'];
        //this.campaigns=res['campaigns'];
        this.response.forEach(element => {
          element['dateFormatted']=new Date(element['date']);
          const diffTime =  element['dateFormatted'].getTime()-new Date().getTime() ;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          element['dayDiff']=diffDays;
          console.log(element['dateFormatted'].toDateString(),diffDays);
        });
        //initially past campaigns
        this.eventTime='past'
        this.campaigns =this.response.filter(element => element['dayDiff']<0);
        this.campaigns.forEach(element => {
          element['dayDiffLine']=Math.abs(element['dayDiff'])+ ' day(s) ago';
        });
      });
  }

  listCampaigns(eventTime){
    this.eventTime=eventTime;
    if(eventTime=='upcoming'){
      this.campaigns= this.response.filter(element => element['dayDiff']>0);
      this.campaigns.forEach(element => {
        element['dayDiffLine']=Math.abs(element['dayDiff'])+ ' day(s) remaining';
      });
    } else if (eventTime=='past') {
      this.campaigns =this.response.filter(element => element['dayDiff']<0);
      this.campaigns.forEach(element => {
        element['dayDiffLine']=Math.abs(element['dayDiff'])+ ' day(s) ago';
      });
    } else {
      this.campaigns =this.response.filter(element => element['dayDiff']==0);
      this.campaigns.forEach(element => {
        element['dayDiffLine']=' i.e. Today !';
      });
    }
  }

  scheduleCampaign(id,e:Event){
    this.response.forEach(element => {
      if(element.id==id){
        element['date']=e.target['value'].toDateString();
        element['dateFormatted']=new Date(element['date']);
          const diffTime =  element['dateFormatted'].getTime()-new Date().getTime() ;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          element['dayDiff']=diffDays;
      }
    });
    console.log(this.response);
    this.listCampaigns(this.eventTime)
  }

  rowDeatils(campaign){  
    this.currentCampaign=campaign;
    console.log(this.currentCampaign)
    this.display = true;
  }

}


