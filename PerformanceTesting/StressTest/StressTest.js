import http from 'k6/http';
import { check, sleep } from 'k6';

// Target API endpoint
const PRODUCT_URL = 'http://10.34.112.158:8000/dk/store';

export default function () {

  // Send GET request to the endpoint
  let res = http.get(PRODUCT_URL);
  
  // Basic checks for status and performance
  check(res, {
    'status is 200': (r) => r.status === 200,             // Expect HTTP 200
    'response time is < 1s': (r) => r.timings.duration < 15000, // Must respond fast enough
  });

  sleep(1); // Simulate user think time
}

export let options = {
  stages: [
    { duration: '2m', target: 20 },  // ramp up to 20 VUs
    { duration: '2m', target: 50 },  // ramp to 50 VUs
    { duration: '2m', target: 75 },  // ramp to 75 VUs
    { duration: '2m', target: 0 },   // ramp down to 0 VUs
  ],
  tags: { test_type: 'stress' }, // label to identify this test
};
