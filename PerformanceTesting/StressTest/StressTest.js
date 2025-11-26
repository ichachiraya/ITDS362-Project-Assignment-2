import http from 'k6/http';
import { check, sleep } from 'k6';

// Ensure this URL points to the product page you are testing
const PRODUCT_URL = 'http://10.34.112.158:8000/gb';

export default function () {
  // Simulate a user accessing a single, resource-intensive page
  let res = http.get(PRODUCT_URL);
  
  // Checks to ensure the request was successful
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 1s': (r) => r.timings.duration < 1000,
  });

  // User "think time" between actions to simulate realistic behavior
  sleep(1); 
}

// ---------------------------------------------------------------
// Stress Test Options (Find the Breakpoint)
// ---------------------------------------------------------------

export let options = {
  stages: [
    { duration: '5m', target: 100 },  // Gradual increase to expected maximum
    { duration: '5m', target: 200 },  // Pushing past expected limit (Stress Zone)
    { duration: '5m', target: 300 },  // Reaching the potential breaking point
    { duration: '2m', target: 0 },    // Cool-down period
  ],
  tags: { test_type: 'stress' },
};