import 'zone.js/dist/zone';
import { Component, OnInit, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { from, of, tap, map, take } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App implements OnInit {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    of(2, 4, 6, 8).subscribe((item) => console.log(item));

    console.log('......');

    of('i', 'v', 'a', 'n').subscribe({
      next: function (item) {
        console.log(item);
      },
      error: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('end');
      },
    });

    console.log('.....');

    from([12, 13, 0, 14, 15])
      .pipe(
        tap((item) => console.log(`emitted item... ${item}`)),
        map((item) => item * 2),
        map((item) => item * 2),
        map((item) => {
          if (item === 0) {
            throw new Error('Zero was emitted');
          } else {
            return item;
          }
        }),
        take(3)
      )
      .subscribe({
        next: (item) => console.log(item),
        error: (err) => console.log(`${err.message}`),
        complete: () => console.log('end'),
      });
  }
}

bootstrapApplication(App);
