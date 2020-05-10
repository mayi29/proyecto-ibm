import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { discardPeriodicTasks } from '@angular/core/testing';



@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

  uploadForm: FormGroup;

  private URL_NL = 'http://localhost:3000/api/';

  txt
  textnl
  nl
  data_twitter=[];

  public form = {
    text: null
  }

  public form1 = {
    bucket: "covid-19-2020",
    name: null
  }

  public formtwitter={

    hashtag: null
  }


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

PostNL(){
  console.log(this.form);
  this.httpClient.post<any>(`${this.URL_NL}upload-text`, this.form).subscribe(
    (res) => this.textnl=res,
    (err) => console.log(err),
  );

}

PostNLObjectStorages(){
  console.log(this.form1);
  const options = {responseType: 'text' as 'json'}
  this.httpClient.post<any>(`${this.URL_NL}list`, this.form1, options).subscribe(
    (res) => this.txt=res,
    (err) => console.log(err),
  );


}


ObjectNL(){
  console.log(this.txt);
  var entrada = {"text":this.txt}
  this.httpClient.post<any>(`${this.URL_NL}upload-text`, entrada).subscribe(
    (res) => this.nl=res,
    (err) => console.log(err),
    
);
}

GetTwitts(){
  this.httpClient.get<any>(`${this.URL_NL}tweets/`+ this.formtwitter.hashtag).subscribe(
    (res) => {
      this.data_twitter.push(res)
  console.log(res) },
    (err) => console.log(err),
  );

}


}
