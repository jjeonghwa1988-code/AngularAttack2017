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

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hello = 'hello testing';
  profilepic = '';

  title = 'NgWarriors | Photo Parlour!';


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
    // creating canvas object
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
     canvas = <HTMLCanvasElement>document.getElementById('canvas');
     ctx = canvas.getContext("2d");
     // creating image object
     let img2 = new Image();
     img2.onload = function() {
        canvas.width = img2.width;
      canvas.height = img2.height;
          ctx.drawImage(img2, 0, 0, img2.width,img2.height);
      };

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

        

          //  toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f60852')
          // .then(dataUrl => {
          //   console.log('RESULT:', dataUrl);
          //   img2.src = dataUrl;
          // })



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
   // let c = Caman("#canvas", function() {
   //        this.brightness(10);
   //        this.contrast(30);
   //        this.sepia(60);
   //        this.saturation(-30);
   //        this.render(function() {
   //          //console.log(this.toBase64());
   //          //this.save('assets/hello.jpg');
   //        });

   //      });

   // console.log(c.renderer.c);

   toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f60852')
  .then(dataUrl => {
    console.log('RESULT:', dataUrl)
  })
  
    alert('applied')
  }

  // getBase64(file: any) {
  //    var reader = new FileReader();
  //    reader.readAsDataURL(file);
  //    reader.onload = function () {
  //      //console.log(reader.result);
  //      return reader.result;
  //    };
  //    reader.onerror = function (error) {
  //      //console.log('Error: ', error);
  //    };
  // }

  PreviewImage(event) {
    // creating canvas object
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
     canvas = <HTMLCanvasElement>document.getElementById('canvas');
     ctx = canvas.getContext("2d");
     // creating image object
     let img2 = new Image();
     img2.onload = function() {
        canvas.width = img2.width;
      canvas.height = img2.height;
          ctx.drawImage(img2, 0, 0, img2.width,img2.height);
      };
      // parsing browsed files
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      // Reading files as  base64
      var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = function () {
         console.log(reader.result);
         // assiging image  to draw
         img2.src =  reader.result;
         // return reader.result;
       };
       reader.onerror = function (error) {
         //console.log('Error: ', error);
       };
    }
  }

  drawImage() {
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
     canvas = <HTMLCanvasElement>document.getElementById('canvas');
     ctx = canvas.getContext("2d");

     let img2 = new Image();
     // img2.crossOrigin = '';
     // img2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg";
     // ctx.drawImage(img2, 0, 0, 500, 500);

     img2.onload = function() {
          ctx.drawImage(img2, 0, 0, 200, 200);
      };
      img2.src = "data:image/png;base64,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";

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

    //ctx.drawImage(img2, 0, 0, 500, 500);

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
