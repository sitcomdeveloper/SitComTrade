import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-groups-info',
  templateUrl: './groups-info.component.html',
  styleUrls: ['./groups-info.component.css']
})
export class GroupsInfoComponent implements OnInit {
  info: number;
  groupDetails: any;
  frontend = true;
  backend = true;
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GroupsService) { }

  ngOnInit() {
    // for getting data for general-info
    const info = +this.route.snapshot.paramMap.get('setItem');
    console.log(info);
    this.groupService.getGroupDetails(info).subscribe(res => {
      this.groupDetails = res;
      console.log('groupDetails', res);
    });
  }
  hideshow() {
    this.frontend = false;
    this.backend = true;
  }

}
