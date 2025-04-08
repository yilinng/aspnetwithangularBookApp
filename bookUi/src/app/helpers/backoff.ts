import { HttpErrorResponse } from '@angular/common/http';
import { of, pipe, range, throwError, timer, zip } from 'rxjs';

import { map, mergeMap, retryWhen } from 'rxjs/operators';

//https://stackoverflow.com/questions/72592177/how-can-i-retry-with-a-delay-in-rxjs-without-using-the-deprecated-retrywhen
//https://v14.angular.io/guide/practical-observable-usage

export function backoff(maxTries: number, delay: number): any {
  return pipe(
    retryWhen((attempts) =>
      zip(range(1, maxTries + 1), attempts).pipe(
        mergeMap(([i, err]) => (i > maxTries ? throwError(err) : of(i))),
        map((i) => i * i),
        mergeMap((v) => timer(v * delay))
      )
    )
  );
}

export function shouldRetry(error: HttpErrorResponse) {
  // Example for catching specific error code as well
  if (error.status === 503) {
    return timer(1000); // Adding a timer from RxJS to return observable to delay param.
  }

  throw error;
}
