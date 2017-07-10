import { Observable } from 'rxjs/Observable';
import { IFaasUsage } from './FaasUsage';
import { FaasPlatformService } from '../impl/faasPlatform.service';
import { IFaasInfo } from './FaasInfo';

export interface IFaasPlatformService {

   /**
    * @param id
    *    ID of the FaaS function to return an Observable for.
    *
    * @returns an Observable that emits information for the given FaaS function,
    * then completes.
    */
   getFaasInfo$(id: string): Observable<IFaasInfo>;

   /**
    * @param id
    *    ID of the FaaS function to return an Observable for.
    *
    * @returns an Observable that emits usage data for the given FaaS function
    * approximately every 2 seconds.
    */
   getFaasUsage$(id: string): Observable<IFaasUsage>;
}

export { FaasPlatformService };
