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
// Soak Test Options (Test Long-Term Stability/Memory Leaks)
// ---------------------------------------------------------------

export let options = {
  vus: 50,         // Using the average load
  duration: '2m',  // Running for 4 hours (Long duration)
  tags: { test_type: 'soak' },
  // No strict thresholds needed; focus is on stability over time
};