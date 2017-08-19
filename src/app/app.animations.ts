import {trigger, transition, animate, state, style} from '@angular/animations'

export const fadeOut =
  trigger('fadeOut', [
    state('0', style({
      opacity: '1'
    })),
    state('1', style({
      opacity: '0'
    })),
    transition('0 => 1', animate('1s ease-in')),
    transition('1 => 0', animate('1ms ease-in'))
  ]);

export const TitleAnimation =
  trigger('titleAnimation', [
    state('0', style({
      opacity: '0'
    })),
    state('1', style({
      opacity: '1'
    })),
    transition('0 => 1', animate('3s ease-in'))
]);
