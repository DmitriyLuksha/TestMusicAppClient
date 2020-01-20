import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { TelemetryService } from '../services/telemetry.service';

@Injectable()
export class TelemetryErrorHandler implements ErrorHandler  {
    private telemetryService: TelemetryService;

    constructor(injector: Injector) {
        // Workaround to get dependencies in ErrorHandler
        setTimeout(() => this.telemetryService = injector.get(TelemetryService));
    }

    handleError(error) {
        this.telemetryService.trackException(error);
        console.error(error);
    } 
}