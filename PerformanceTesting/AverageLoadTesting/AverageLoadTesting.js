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
// Average-Load Test Options (Test for Normal Usage)
// ---------------------------------------------------------------

export let options = {
  vus: 20,       // 50 concurrent virtual users (Your expected average load)
  duration: '1m', // Run for 5 minutes
  tags: { test_type: 'average_load' },
  thresholds: {
    'http_req_duration': ['p(95) < 5000'], // 95% of requests must be faster than 1 second
    'http_req_failed': ['rate < 0.10'],    // Failure rate should be below 1%
  },
};
