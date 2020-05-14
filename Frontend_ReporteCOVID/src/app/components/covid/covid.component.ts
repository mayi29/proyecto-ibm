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

  loading

  private URL_NL = 'http://localhost:3000/api/';

  txt
  textnl
  nl
  loading2

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
  this.loading = true
  this.httpClient.post<any>(`${this.URL_NL}upload-text`, this.form).subscribe(
    (res) => {
      this.textnl=res
      this.loading = false
    },
    (err) => {
      this.loading = false
      console.log(err)
    },
  );

}

PostNLObjectStorages(){
  this.loading = true
  console.log(this.form1);
  const options = {responseType: 'text' as 'json'}
  this.httpClient.post<any>(`${this.URL_NL}list`, this.form1, options).subscribe(
    (res) => {
      this.loading = false
      this.txt=res
    },
    (err) => {
      this.loading = false
      console.log(err)
    },
  );
}


ObjectNL(){
  this.loading2 = true
  console.log(this.txt);
  var entrada = {"text":this.txt}
  this.httpClient.post<any>(`${this.URL_NL}upload-text`, entrada).subscribe(
    (res) => {
      this.loading2 = false
      this.nl=res
    },
    (err) => {
      this.loading2 = false
      console.log(err)
    },
    
);
}

GetTwitts(){
  this.loading = true
  this.data_twitter = []
  this.httpClient.get<any>(`${this.URL_NL}tweets/`+ this.formtwitter.hashtag).subscribe(
    (res) => {
      this.loading = false
      this.data_twitter.push(res)
  console.log(res) },
    (err) => { 
    this.loading = false
    console.log(err) 
  },
  );

}


}
