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
    'response time is < 15s': (r) => r.timings.duration < 15000,
  });

  // User "think time" between actions to simulate realistic behavior
  sleep(1); 
}

// ---------------------------------------------------------------
// Stress Test Options (Find the Breakpoint)
// ---------------------------------------------------------------

export let options = {
  stages: [
    { duration: '2m', target: 20 },  // Gradual increase to expected maximum
    { duration: '2m', target: 50 },  // Pushing past expected limit (Stress Zone)
    { duration: '2m', target: 75 },  // Reaching the potential breaking point
    { duration: '2m', target: 0 },    // Cool-down period
  ],
  tags: { test_type: 'stress' },
};