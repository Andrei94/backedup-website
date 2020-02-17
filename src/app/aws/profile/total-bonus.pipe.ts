import {Pipe, PipeTransform} from '@angular/core';
import {Referral} from '../../referral';

@Pipe({
  name: 'totalBonus'
})
export class TotalBonusPipe implements PipeTransform {
  transform(items: Referral[]): number {
    return items.reduce((a, b) => a + b.bonus, 0);
  }
}
