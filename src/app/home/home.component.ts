import {
  Component,OnInit,Renderer2,
  ElementRef,PLATFORM_ID, Inject, AfterViewInit
} from '@angular/core';
import {fadeOut, TitleAnimation} from '../app.animations'
import {isPlatformBrowser} from '@angular/common';
import {Globals} from '../globals.service'

let circle_coords = [
  ["209.15","171.4"],["221.17","260.83"],["234.5","332.95"],["208.13","374.58"],["115.25","423.95"],["61.38","449.27"],["48.13","474.83"],
  ["88.17","519"],["153.56","573.62"],["254.22","680.98"],["363.32","759.26"],["390.57","737.83"],["448.86","696.72"],["471","653.08"],
  ["482.92","559.49"],["495.85","543.25"],["495.57","519.16"],["512.25","496.66"],["526.73","460.33"],["514.4","421.83"],["502.4","397.2"],
  ["504.68","373.9"],["505.32","340.54"],["502.44","322.35"],["521.53","309.62"],["524.44","294.68"],["517.56","281.51"],["505.4","249.68"],
  ["507.15","230.18"],["518.08","219.18"],["516.55","202.15"],["509.72","150.18"],["483.99","98.02"],["396.47","50.59"],["329.45","51.43"],
  ["222.44","130.51"],["331.4","758.58"]
]

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeOut,
    TitleAnimation,
  ]
})


export class AppHomeComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID)private platform_id, private globals: Globals) { }
  isBrowser:boolean = isPlatformBrowser(this.platform_id);
  coords = circle_coords;
  animated = false;
  iconOnHover = true;
  main_display = 'block';
  main_height = '80vh';
  second_display = 'none';
  start_animation = false;
  show_animation = 'none';
  first_title = false;
  second_title = false;
  third_title = false;

  timeout
  ngOnInit(){
    if (this.isBrowser) {
      this.canvasDots();
    }
  }
  ngAfterViewInit(){
    let that = this;
    this.timeout = setTimeout(() => this.startAnimation(), 5000);
    this.renderer.listen('document', 'wheel', function(event){
      if (!that.animated){
        that.startAnimation();
      }
    })
  }
  print(event){
    console.log(event);
  }
  startAnimation(){
    this.start_animation = !this.start_animation;
    this.animated = true;
    clearTimeout(this.timeout);
  }
  showAnimation(event){
    if (event.toState == "1") {
      this.main_display = "none";
      this.show_animation = 'block';
      this.first_title = true;
    }
  }
  showTextAnimation(event, index){
    if (event.toState == '1') {
      switch (index){
        case 1:
          this.second_title = true;
          break
        case 2:
          this.third_title = true
      }
    }
  }
  skipAnimation() {
    this.second_display = 'block';
    this.main_display = 'none';
    if (this.isBrowser){
      this.renderer.setStyle(this.renderer.selectRootElement('.icon-wrapper'),'display','none');
      this.main_height = '40vh';
    }
  }
  changeIconAnimation() {
    this.iconOnHover = !this.iconOnHover;
  }

  endAnimation(event){
    if (event.toState == '1'){
      this.second_display = 'block';
      if (this.isBrowser){
        this.renderer.setStyle(this.renderer.selectRootElement('.next-icon'),'display','none');
      }
    }
  }

  imageLoaded() {
    if (this.isBrowser) {
      let width = this.renderer.selectRootElement('#image').width;
      let height = this.renderer.selectRootElement('#image').height;
      let svg = document.getElementById('useless-mask');
      this.renderer.setStyle(svg, 'height', height);
      svg.style.width = width;
      svg.style.background = "transparent";
    }
  }

  //Draws the background of the page
  canvasDots() {
    var canvas = this.renderer.selectRootElement('.background-canvas'),
        ctx = canvas.getContext('2d'),
        colors = ["#CB4335", "#1B4F72", "#F4D03F", "#229954", "#17202A", "#fff"],
        colorDot = '#CECECE',
        color = '#CECECE';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';
        ctx.fillStyle = colorDot;
        ctx.lineWidth = .1;
        ctx.strokeStyle = color;

        var mousePosition = {
            x: 30 * canvas.width / 100,
            y: 30 * canvas.height / 100
        };

        var dots = {
            nb: 600,
            distance: 60,
            d_radius: 100,
            array: []
        };

        function Dot(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();
            // this.color = '#fff'
            this.color = colors[Math.floor(Math.random()*6)];
            this.radius = Math.random()*2;
        }

        Dot.prototype = {
            create: function(){
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            },

            animate: function(){
                for(let i = 0; i < dots.nb; i++){

                    var dot = dots.array[i];

                    if(dot.y < 0 || dot.y > canvas.height){
                        dot.vx = dot.vx;
                        dot.vy = - dot.vy;
                    }
                    else if(dot.x < 0 || dot.x > canvas.width){
                        dot.vx = - dot.vx;
                        dot.vy = dot.vy;
                    }
                    dot.x += dot.vx;
                    dot.y += dot.vy;
                }
            },
        };

        function createDots(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let dot;
            for(let i = 0; i < dots.nb; i++){
                dots.array.push(new Dot());
                dot = dots.array[i];

                dot.create();
            }
            dot.animate();
        }

        window.onmousemove = function(parameter) {
            mousePosition.x = parameter.pageX;
            mousePosition.y = parameter.pageY;
        }

        mousePosition.x = window.innerWidth / 2;
        mousePosition.y = window.innerHeight / 2;

        setInterval(createDots, 1000/30);
    }
}
