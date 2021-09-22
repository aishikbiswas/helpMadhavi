import { Component } from '@angular/core';
import { fromEvent, Subject, Subscription} from "rxjs";
import { exhaustMap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exhauseMapTest';
  subject = new Subject;
  private subscription: Subscription;
  constructor(private http: HttpClient) { }
  callMap(){
    this.subject.next("sampleValue");
  }
  ngAfterViewInit() {
    this.subscription = this.subject.pipe(
      exhaustMap((value) => this.getData(value))
    ).subscribe((res)=>{
      //call your resulting function
      console.log(res);
    })
  }
  getData(value) {
    //value is whatever you send from the button;
    return this.http.get("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1");
  }
}
