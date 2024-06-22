import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor() { }

  styles = [
    { id: 1, name: 'Casual', image: 'assets/images/preference/casual.png' },
    { id: 2, name: 'Vintage', image: 'assets/images/preference/vintage.png' },
    { id: 3, name: 'Formal', image: 'assets/images/preference/formal.png' },
    { id: 4, name: 'Retro', image: 'assets/images/preference/retro.png' },
    { id: 5, name: 'Sporty', image: 'assets/images/preference/sporty.png' },
    { id: 6, name: 'Minimalist', image: 'assets/images/preference/minimalist.png' },
    { id: 7, name: 'Glamour', image: 'assets/images/preference/glamour.png' },
    { id: 8, name: 'Trendy', image: 'assets/images/preference/trendy.png' },
    { id: 9, name: 'Ethnic', image: 'assets/images/preference/ethnic.png' },
    { id: 10, name: 'Classic', image: 'assets/images/preference/classic.png' },
    { id: 11, name: 'Grunge', image: 'assets/images/preference/grunge.png' },
    { id: 12, name: 'Gothic', image: 'assets/images/preference/gothic.png' },
    { id: 13, name: 'Chic', image: 'assets/images/preference/chic.png' },
    { id: 14, name: 'Athleisure', image: 'assets/images/preference/athleisure.png' },
    { id: 15, name: 'Avant-Garde', image: 'assets/images/preference/avant-grade.png' },
  ]
}
