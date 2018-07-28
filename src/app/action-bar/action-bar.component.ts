import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.less']
})
export class ActionBarComponent implements OnInit {
  @Input() sourcePage: string;

  constructor(private router: Router) { }
  public showModify = false;
  
  ngOnInit() {
    console.log("Hello");
  }
  
}
