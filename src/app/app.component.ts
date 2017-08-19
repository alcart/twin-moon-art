import { Component, OnInit,Renderer2, HostBinding,PLATFORM_ID, Inject,AfterViewInit} from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import {Router, NavigationEnd} from '@angular/router'
import {Globals} from './globals.service'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
 export class AppComponent implements OnInit{
   constructor(private _router: Router, private renderer: Renderer2, @Inject(PLATFORM_ID) private platform_id) {}
   navbarBackground = 'transparent';
   originalnavbarBackground = 'black';
   height = '13vh';
   body: any;
   white_navbar = false;
   @HostBinding('style.background-color')
   bg;
   isBrowser = isPlatformBrowser(this.platform_id);

   ngOnInit() {
     if (this.isBrowser){
       this.body = document.getElementsByTagName('body')[0]
     }
     this.renderer.listen('window', 'scroll', (event) =>{
       if (this.isBrowser){
         if (window.scrollY > 75){
           this.height = '12vh';
           this.navbarBackground = 'rgba(32,32,32,0.6)';
         }
         else {
           this.height = '13vh';
           this.navbarBackground = this.originalnavbarBackground;
         }
       }
     });
     this._router.events.subscribe((event) => {
       if (event instanceof NavigationEnd){
         switch (event.urlAfterRedirects) {
           case '/':
            this.white_navbar = false;
            break;
           case '/artworks':
            this.renderer.setStyle(this.body, 'background', "#E2E2E2")
            this.white_navbar = false;
            break;
           case '/contact-us':
            this.renderer.setStyle(this.body, 'background', "white")
            this.white_navbar = false;
            break
         }
         if (event.urlAfterRedirects == '/'){
           this.originalnavbarBackground = 'transparent'
         }
         else {
           this.originalnavbarBackground = '#232323';
         }
         this.navbarBackground = this.originalnavbarBackground;
         console.log(this.navbarBackground)
       }
     })
   }
}
