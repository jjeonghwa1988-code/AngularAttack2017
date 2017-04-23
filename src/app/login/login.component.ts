import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
// import * as Caman from "Caman";

declare var Caman: any;

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

        // Caman("#canvas-id", function() {
        //   this.brightness(5).render();
        // });


	    });
	  console.log(response);

	});

  }

  

  changeColor() {
   let c = Caman("#canvas", function() {
          this.brightness(10);
          this.contrast(30);
          this.sepia(60);
          this.saturation(-30);
          this.render(function() {
            //console.log(this.toBase64());
            this.save('assets/hello.jpg');
          });

        });

   console.log(c.renderer.c);
  
    alert('applied')
  }

  drawImage() {
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
     canvas = <HTMLCanvasElement>document.getElementById('canvas');
     ctx = canvas.getContext("2d");

     let img2 = new Image();
     img2.crossOrigin = '';
     img2.src = "assets/test.jpg";

     //console.log(hello);

     // var img: HTMLImageElement;
     //  var x: number = 50;
     //  var y: number = 50;
     //  img = <HTMLImageElement>document.getElementById('spaceship');
     //  img.src = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

   // let canvas = document.getElementById('canvas');
   //  let ctx = canvas.getContext('2d');

   //  /* Enable Cross Origin Image Editing */
   // let img = new Image();
   //  img.crossOrigin = '';
   //  img.src = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

    // img.onload = function() {
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0, img.width, img.height);
    // }

    ctx.drawImage(img2, 0, 0, 500, 500);

  }

  // Caman("#canvas-id", function() {});

}
