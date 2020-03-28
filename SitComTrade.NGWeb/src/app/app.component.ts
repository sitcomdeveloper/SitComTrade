import { Component } from '@angular/core';
import { Router, NavigationStart,Event, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  showHead: boolean = false;
  timeout;
  routerChanged = true;

  ngOnInit() {
  }
                                 // hide header from login page
  constructor(private router: Router)  {
  // on route change to '/login', set the variable showHead to false
    // router.events.forEach((event) => {
    //   if (event instanceof NavigationStart) {
    //     if (event['url'] == '/login') {
    //       this.showHead = false;
    //     } else {
    //       // console.log("NU")
    //       this.showHead = true;
    //     }
    //   }
    // });
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = true;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = false;
        }, 1000);
      }
    });
  }
}

// import { Component } from '@angular/core';
// import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html'
// })


// export class AppComponent {
//   timeout;
//   routerChanged = true;
//   constructor(private router: Router) {
//     router.events.subscribe((event: Event) => {

//       if (event instanceof NavigationStart) {
//         // Show loading indicator
//         this.routerChanged = true;
//       }

//       if (event instanceof NavigationEnd) {
//         // Hide loading indicator
//         this.timeout = setTimeout(() => {
//           clearTimeout(this.timeout);
//           this.routerChanged = false;
//         }, 1000);
//       }
//     });
//   }
// }
