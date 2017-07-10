import { Injectable } from '@angular/core';
import { IFaasPlatformService } from '../api/faasPlatform.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { IFaasUsage } from '../api/FaasUsage';
import { faasInfosById } from '../impl/data';
import { IFaasInfo } from '../api/FaasInfo';
import { BehaviorSubject } from 'rxjs';
import './doOnSubscribe';

@Injectable()
export class FaasPlatformService implements IFaasPlatformService {

   getFaasInfo$(id: string): Observable<IFaasInfo> {
      const info = faasInfosById[id];

      if (!info) {
         return Observable.throw(`No such function ${id}.`);
      }

      return Observable.of(info)
         .doOnSubscribe(() => console.info(`Observable for FaasInfo ${id} subscribed.`));
   }

   getFaasUsage$(id: string): Observable<IFaasUsage> {
      const usage$ = this.usageSubjectById.get(id);

      if (!usage$) {
         return Observable.throw(`No such function ${id}.`);
      }

      return usage$.asObservable()
         .doOnSubscribe(() => console.info(`Observable for FaasUsage ${id} subscribed.`));

   }

   constructor() {
      this.usageSubjectById = this.createUsageSubjects();
      this.startSimulation();
   }

   private usageSubjectById: Map<string, BehaviorSubject<IFaasUsage>>;

   private createUsageSubjects() {
      const usageSubjectById = new Map<string, BehaviorSubject<IFaasUsage>>();

      Object.keys(faasInfosById)
         .reduce((map, id) => {
            map.set(id, new BehaviorSubject<IFaasUsage>({
               functionId: id,
               instances: 10000,
               state: 'HEALTHY',
               totalMonthlyInvocations: 12e+6,
               totalMonthlyRuntime: 3.6e+6
            }));
            return map;
         }, usageSubjectById);

      return usageSubjectById;
   }

   private startSimulation() {
      setInterval(() => {
         this.usageSubjectById.forEach(subject => {
            const previousUsage = subject.getValue();
            const newUsage = this.getNextUsage(previousUsage);
            subject.next(newUsage);
         });
      }, 2000);
   }

   private getNextUsage(previousUsage: IFaasUsage): IFaasUsage {
      const newUsage = { ...previousUsage };
      const random = Math.random();
      const additive = random > 0.5;
      const healthy = random > 0.05;
      let instancesDelta = getRandomInt(250, 1500);
      let runtimeIncrease = getRandomInt(25e+4, 15e+5);
      instancesDelta = additive ? instancesDelta : -1 * instancesDelta;
      newUsage.instances = Math.max(300, previousUsage.instances + instancesDelta);
      newUsage.state = healthy ? 'HEALTHY' : 'ERROR';
      newUsage.totalMonthlyRuntime += runtimeIncrease;
      return newUsage;
   }

}

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
