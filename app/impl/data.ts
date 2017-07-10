import { IFaasInfo } from '../api/FaasInfo';

export const faasInfosById: { [id: string]: IFaasInfo } = {
   '1': {
      id: '1',
      name: 'registerUser',
      description: 'Registers a new WaveX user in the database.',
      memoryAllocation: 512,
      invocationCost: 0.0000002,
      runtimeCost: 0.000000834
   },
   '2': {
      id: '2',
      name: 'logIn',
      description: 'Logs a user in to WaveX app, returning an OAuth access token.',
      memoryAllocation: 256,
      invocationCost: 0.0000002,
      runtimeCost: 0.000000417
   },
   '3': {
      id: '3',
      name: 'logOut',
      description: 'Logs a user out of the WaveX app.',
      memoryAllocation: 256,
      invocationCost: 0.0000002,
      runtimeCost: 0.000000417
   },
   '4': {
      id: '4',
      name: 'serveApp',
      description: 'Serves the WaveX web app assets.',
      memoryAllocation: 1024,
      invocationCost: 0.0000002,
      runtimeCost: 0.000001667
   },
   '5': {
      id: '5',
      name: 'getSurfReport',
      description: 'Returns current surf report for the specified location.',
      memoryAllocation: 256,
      invocationCost: 0.0000002,
      runtimeCost: 0.000000417
   },
   '6': {
      id: '6',
      name: 'pushSurfReport',
      description: 'Alerts a user they are currently near good surf.',
      memoryAllocation: 256,
      invocationCost: 0.0000002,
      runtimeCost: 0.000000417
   },
   '7': {
      id: '7',
      name: 'saveTelemetry',
      description: 'Saves a payload of usage and analytics data',
      memoryAllocation: 512,
      invocationCost: 0.0000002,
      runtimeCost: 0.000000834
   },
   '8': {
      id: '8',
      name: 'crunchData',
      description: 'Big data map reduce job, runs periodically.',
      memoryAllocation: 1536,
      invocationCost: 0.0000002,
      runtimeCost: 0.000002501
   }
};

