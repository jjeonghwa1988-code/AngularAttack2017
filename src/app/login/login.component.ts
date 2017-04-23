import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
// import * as Caman from "Caman";

declare var Caman: any;
Caman.remoteProxy = Caman.IO.useProxy('http://hellosofts.com/caman_proxy.php');

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
        //   this.brightness(5).render(function() {
        //     console.log(this.toBase64());
        //   });
        // });


	    });
	  console.log(response);

	});

  }

  
  SaveImage() {
    Caman("#canvas", function() {
          //console.log(this.toBase64());
        let a  = document.createElement('a');
            a.href = this.toBase64();
            a.download = Date() +'_image.png';
            a.click();
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
            //this.save('assets/hello.jpg');
          });

        });

   console.log(c.renderer.c);
  
    alert('applied')
  }

  PreviewImage(event) {
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
     canvas = <HTMLCanvasElement>document.getElementById('canvas');
     ctx = canvas.getContext("2d");

     let img2 = new Image();
     img2.crossOrigin = '';
     img2.src = "assets/test.jpg";

    let uploadFile = (<HTMLInputElement>window.document.getElementById('browseFile')).value;

    console.log(uploadFile);
    // let fileList: FileList = event.target.files;
    // if (fileList.length > 0) {
    //   let file: File = fileList[0];
    //   let url = URL.createObjectURL(file)
    //   console.log(file);
    // }
  }

  drawImage() {
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
     canvas = <HTMLCanvasElement>document.getElementById('canvas');
     ctx = canvas.getContext("2d");

     let img2 = new Image();
     img2.crossOrigin = '';
     img2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg";
     ctx.drawImage(img2, 0, 0, 500, 500);

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

  ApplyFilter(ev) {
    // let hue = parseInt(document.getElementById('#hue'));
    let hue = document.getElementById('#hue');
    console.log('changing filter', ev);
  }

  ResetImage() {
    Caman("#canvas", function() {
          this.revert(true).render();
        });
  }

  Brightness() {
    Caman("#canvas", function() {
          this.brightness(10).render();
        });
  }

  Noise() {
    Caman("#canvas", function() {
          this.noise(10).render();
        });
  }

  Sepia() {
    Caman("#canvas", function() {
          this.sepia(10).render();
        });
  }

  Contrast() {
    Caman("#canvas", function() {
          this.contrast(10).render();
        });
  }

  Colorize() {
    Caman("#canvas", function() {
          this.colorize(60, 105, 218, 10).render();
        });
  }

  Vintage() {
    Caman("#canvas", function() {
          this.vintage().render();
        });
  }
  Lomo() {
    Caman("#canvas", function() {
          this.lomo().render();
        });
  }
  Emboss() {
    Caman("#canvas", function() {
          this.emboss().render();
        });
  }
  TiltShift() {
    Caman("#canvas", function() {
          this.tiltShift({
            angle: 90,
            focusWidth: 600
          }).render();
        });
  }

  RadialBlur() {
    Caman("#canvas", function() {
          this.radialBlur().render();
        });
  }

  EdgeEnhance() {
    Caman("#canvas", function() {
          this.edgeEnhance().render();
        });
  }

  Posterize() {
    Caman("#canvas", function() {
          this.posterize(8, 8).render();
        });
  }

  Clarity() {
    Caman("#canvas", function() {
          this.clarity().render();
        });
  }

  OrangePeel() {
    Caman("#canvas", function() {
          this.orangePeel().render();
        });
  }

  SinCity() {
    Caman("#canvas", function() {
          this.sinCity().render();
        });
  }

  SunRise() {
    Caman("#canvas", function() {
          this.sunrise().render();
        });
  }

  CrossProcess() {
    Caman("#canvas", function() {
          this.crossProcess().render();
        });
  }


  HdrEffect() {
    Caman("#canvas", function() {
          this.contrast(10);
          this.contrast(10);
          this.jarques();
          this.render();
        });
  }



}
