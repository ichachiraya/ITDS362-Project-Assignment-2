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
// Spike Test Options (Test Resilience and Recovery Time)
// ---------------------------------------------------------------

export let options = {
  stages: [
    { duration: '5m', target: 50 },   // Establish Base Load
    { duration: '1m', target: 250 },  // SUDDEN SPIKE! (5x the base load)
    { duration: '5m', target: 50 },   // Recovery back to Base Load
  ],
  tags: { test_type: 'spike' },
};