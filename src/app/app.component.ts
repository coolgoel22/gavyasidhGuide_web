import { Component, NgZone } from '@angular/core';

// Import services here....
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showLoader:boolean = false;

  constructor(private dataService:DataService,
              private zone: NgZone
            ){}

  ngOnInit(){
    this.dataService.loaderState.subscribe((result: boolean) => {
      this.zone.run(()=>{
        this.showLoader = result;
      });
    });
  }
}
