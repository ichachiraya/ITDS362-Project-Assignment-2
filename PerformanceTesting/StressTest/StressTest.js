import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 20 },   // ramp up to 20 VUs in 1 minute
    { duration: '1m', target: 50 },   // then to 50 VUs
    { duration: '1m', target: 100 },  // then to 100 VUs
    { duration: '1m', target: 150 },  // then to 150 VUs
    { duration: '1m', target: 200 },  // finally to 200 VUs
  ],
  thresholds: {
    // 95% of requests must complete in under 1.5 seconds
    http_req_duration: ['p(95)<1500'],
  },
};

export default function () {
  // Send a GET request with a 60s timeout (in case the server is very slow)
  http.get('http://10.34.112.158:8000/dk/store', {
    timeout: '60s',
  });

  // Wait 2 seconds before the next iteration (user think time)
  sleep(2);
}
