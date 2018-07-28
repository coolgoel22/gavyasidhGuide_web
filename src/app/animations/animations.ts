import { trigger, state, style, transition, animate } from "@angular/animations";

export const flyInOut = trigger('flyInOut', [
    state('in', style({height: '*'})),
    transition('void => *', [
      style({height:  0}), 
      animate(500, style({height: '*'}))
    ]),
    transition('* => void', [
      style({height: '*'}),
      animate(500, style({height: 0}))
    ])
  ]);