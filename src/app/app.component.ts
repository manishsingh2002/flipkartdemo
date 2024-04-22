import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from './data.service';
import { firebaseConfig } from '../FireBaseConfig';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'flipkartdemo';
  data: any;
  filter: any[] = [];

  constructor(private dataService: DataService) {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes, '[[[[[[[[[[[[]]]]]]]]]]]]]]]]]');
  // }
  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }

  updatedata(item: any) {
    console.log(item);
  }
  onFilteredData(data: any) {
    // console.log(data);
    this.filter = data;
  }
}
