import { Component, OnInit } from '@angular/core';
import { TopBarService } from './top-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title = "Jason Dam's Site";
  components: string[];
  destination: string = '';

  constructor(service: TopBarService) { 
    this.components = service.getNavComponent();
  }

  ngOnInit(): void {
  }

  routeNav(location: string){
    if(location == "Home" || location == this.title){
      return '';
    } else {
      this.destination = location.toLowerCase();
      return this.destination;
    }
  }
}
