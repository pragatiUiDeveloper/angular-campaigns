import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CampaignService {

    constructor(private http: HttpClient) {}
    configUrl = 'http://demo0316771.mockable.io/campaigns';
    getCampaigns(){
      //  return this.http.get(this.configUrl);
      return this.http.get("./assets/mydata.json");
      
    }
}
