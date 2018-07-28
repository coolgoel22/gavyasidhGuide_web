import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-gau-chikitsha',
  templateUrl: './gau-chikitsha.component.html',
  styleUrls: ['./gau-chikitsha.component.less']
})
export class GauChikitshaComponent implements OnInit {

  public diseaseList: Array<any>;
  public isGauChikitsak: Boolean;

  constructor(private router: Router,
              private dataService: DataService,
              private zone: NgZone) {
    
    this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd && e.url.indexOf("/gauChikitsha") != -1){
        this.ngOnInit();
        this.fetchData();
      }
    });
  }
      
  ngOnInit() {
    // this.diseaseList = [{"name":"1","med":[{"medName":"6","prescribedBy":"Vikram goel","desc":"7"},{"medName":"4","prescribedBy":"Vikram goel","desc":"5"},{"medName":"8","prescribedBy":"Vikram goel","desc":"9"},{"medName":"2","prescribedBy":"Vikram goel","desc":"3"}]},{"name":"Ab","med":[{"medName":"Med3","prescribedBy":"Vikram goel","desc":"Des3"},{"medName":"Med1","prescribedBy":"Vikram goel","desc":"Description 1"},{"medName":"Med2","prescribedBy":"Vikram goel","desc":"Description 2"}]},{"name":"Abc","med":[{"medName":"Mnb","prescribedBy":"Vikram goel","desc":"Qwrt"},{"medName":"Dhgy","prescribedBy":"Vikram goel","desc":"Fhiughs"},{"medName":"Qwe","prescribedBy":"Vikram goel","desc":"Vhgvb jfdtuu hfjv vh"}]},{"name":"Absolutely ","med":[{"medName":"Medicine 1","prescribedBy":"Vikram goel","desc":"Description 1"},{"medName":"Medicine 3","prescribedBy":"Vikram goel","desc":"Description 3"},{"medName":"Medicine 2","prescribedBy":"Vikram goel","desc":"Description 2"}]},{"name":"Bukhar","med":[{"medName":"Medicine 1","prescribedBy":"Vikram goel","desc":"This is detailed description ription of medicine.\nI like its description \n\n\nU also would like it"},{"medName":"Medicine 2","prescribedBy":"Vikram goel","desc":"Short description"}]},{"name":"Cold and cough","med":[{"medName":"Sulphur","prescribedBy":"Vikram goel","desc":"To drop any kind of "},{"medName":"Kalmegh ","prescribedBy":"Vikram goel","desc":"This is very good medicine for cold and cough specially when it occurs in winter seasons"}]},{"name":"बुखार","med":[{"medName":"दवा","prescribedBy":"Vikram goel","desc":"इलाज"}]}];
  }

  fetchData(){
    this.dataService.showLoader();
    this.dataService.getHomeoMedicines();
    this.dataService.allHomeoMedicineObservable.subscribe(res=>{
      if(res){
        this.dataService.hideLoader();
        this.zone.run(()=>{
          this.diseaseList = res;
        });
      }
    });
    this.dataService.getVerifyLoginObservable().subscribe(res=>{
      if(res && res.user){
        let profile = JSON.parse(res.user);
        this.zone.run(()=>{
          this.isGauChikitsak = profile.isGauChikitshak;
        });
      }
    });
  }
  addMedicine($event, disease: any){
    $event.stopPropagation();
    this.dataService.addMedInDisease(disease.name);
    this.router.navigate(['/addInGauChikitsha']);
  }
}
