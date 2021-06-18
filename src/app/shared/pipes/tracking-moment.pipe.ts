import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackingMoment'
})
export class TrackingMomentPipe implements PipeTransform {

  private momentMap: any = {
    'prior-meal': "Antes de comer",
    'post-meal': "Despues de comer",
    'prior-activity': "Antes de actividad física",
    'post-activity': "Después de actividad física",
    'other': "Otro"
  }


  transform(value: string, ...args: string[]): unknown {
    return this.momentMap[value];
  }

}
