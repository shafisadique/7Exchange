import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { DataService } from '../services/data-loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let loadingService = inject(DataService);
    loadingService.show();
    return next(req).pipe(finalize(()=>{
      loadingService.hide();
    }));
};
