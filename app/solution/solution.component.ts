import { Component } from '@angular/core';
import { FaasPlatformService } from '../api/faasPlatform.service';
import { Observable } from 'rxjs';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html',
   styleUrls: ['./solution.component.css'],
   providers: [FaasPlatformService]
})
export class SolutionComponent {
   // Get Arrays from service to return Info and Usage?
   // Update: Get Objects from service for Info and Usage
   // Merge Objects into Array
   private surfArray: Array<any> = [];
   private maxNum: number = 8;

   constructor(private _IFPService: FaasPlatformService) { }

   ngOnInit() {
      const getInfo: any = this._IFPService.getFaasInfo$.bind(this._IFPService);
      const getUsage: any = this._IFPService.getFaasUsage$.bind(this._IFPService);

      for (let i = 1; i <= this.maxNum; i++) {
         // Observable Public Methods @ http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
         // .zip returns subscribe observable for getInfo and getUsage but does not update output
         const obs = Observable.combineLatest(
            getInfo(i.toString()),
            getUsage(i.toString())
         );

         obs.subscribe(data => {
            let info = data[0];
            let usage = data[1];
            this.surfArray[i - 1] = Object.assign(info, usage);
         });
      }
   }

   getMemory(item) {
      let instance: number = item.instances;
      let memory: number = item.memoryAllocation;

      if (instance * memory >= 20000000) {
         return 'red';
      } else if (instance * memory >= 10000000) {
         return 'amber';
      }
   }
}
