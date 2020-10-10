import { Injectable } from '@angular/core';
import _ from 'underscore';
import { champsBle, listeBatiments } from '../models/listeBatiments';


@Injectable({
  providedIn: 'root'
})
export class BatimentsService {
  constructor() {
  }

  getRandomBatiments() {
    return _.sample(listeBatiments, 12);
  }

  getChampsBle() {
    return champsBle;
  }
}
