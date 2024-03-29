import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

declare function customInitFunctions(): any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public shared: SharedService) { }

  ngOnInit() {
    // customInitFunctions();
  }

}
