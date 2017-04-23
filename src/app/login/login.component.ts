import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
export class User {
  id: number;
  name: string;
  image: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hello = 'hello testing';
  profilepic = '';

  constructor(private fb: FacebookService) {
  	let initParams: InitParams = {
      appId: '786436611511528',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);


   }

  ngOnInit() {
  }

  loginWithFacebook(): void {

    this.fb.login()
      .then((response: LoginResponse) => 
      	localStorage.setItem('curentUser', JSON.stringify(response))
      	)
      .catch((error: any) => console.error(error));

  }

  getUser() {
  	this.fb.login().then((response) => {
	  var promise = this.fb.api('/me?fields=id,name,email,picture.type(large),gender,education');
	  promise.then((res)=> {
	    // this.id = res.id;
	    //   this.name = res.name;
	    //   this.isUser = true ;
	      console.log(res);
	      console.log(res.picture.data.url);
	      this.profilepic = res.picture.data.url;
	      this.hello = 'new hello';


	    });
	  console.log(response);

	});

  }

}
