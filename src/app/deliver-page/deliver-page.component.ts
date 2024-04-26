import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-deliver-page',
  templateUrl: './deliver-page.component.html',
  styleUrl: './deliver-page.component.css',
})
export class DeliverPageComponent {
  userdaata: any = [];
  finalPricetoPaid: any;
  maindata: any;
  maindata2: any;
  constructor(private dataService: DataService) {
    // dataService.getData().subscribe((data) => {
    //   this.maindata2 = data;
    //   console.log(this.maindata2);
    // });
    //
    this.maindata = of(dataService.getData());

    this.maindata.subscribe(
      (val: any) => console.log(val),
      (error: any) => console.log('error'),
      () => console.log('complete')
    );
  }

  ngOnInit() {
    this.userdaata = this.dataService.getuserdata();
    console.log('result of', this.userdaata);
    this.finalPricetoPaid = this.dataService.setfinalprice();
    //
  }
  // ngOnInit() {
  //   this.userdaata = this.dataService.userdetailevent;
  //   this.finalPricetoPaid = this.dataService.setfinalprice();
  // }
}
