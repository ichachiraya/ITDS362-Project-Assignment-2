import http from 'k6/http';
import { check, sleep } from 'k6';

// Target API endpoint to test
const PRODUCT_URL = 'http://10.34.112.158:8000/dk/store';

export default function () {

  // Send a GET request
  let res = http.get(PRODUCT_URL);
  
  // Validate status and response time
  check(res, {
    'status is 200': (r) => r.status === 200,                 // Expect HTTP 200 OK
    'response time is < 15s': (r) => r.timings.duration < 15000, // Response must be under 15 seconds
  });

  sleep(1); // Simulate user think time
}

export let options = {
  stages: [
    { duration: '2m', target: 10 },  // baseline load
    { duration: '2m', target: 70 },  // spike increase
    { duration: '2m', target: 40 },  // drop back to mid-load
  ],
  tags: { test_type: 'spike' }, // label for identifying test type
};
