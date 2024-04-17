import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnChanges {
  title = 'flipkartdemo';
  data: any;
  filter: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, '[[[[[[[[[[[[]]]]]]]]]]]]]]]]]');
  }
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
