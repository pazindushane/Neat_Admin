import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {faHome, faLaptopHouse, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
      })),
      state('false', style({
        width: '0px',
      })),
      transition('true => false', animate('500ms')),
      transition('false => true', animate('500ms'))
    ])
  ]
})
export class LeftNavComponent implements OnInit {

  faHome= faHome;
  faLaptopHouse= faLaptopHouse;
  faUser= faUser;


  constructor() { }

  @Input() navState = true;
  title!: string;

  ngOnInit(): void {
  }

}
