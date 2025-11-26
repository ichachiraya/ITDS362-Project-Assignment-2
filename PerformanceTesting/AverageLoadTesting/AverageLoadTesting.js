import http from 'k6/http';
import { check, sleep } from 'k6';

// Target API endpoint you want to load test
const PRODUCT_URL = 'http://10.34.112.158:8000/dk/store';

export default function () {

  // Send a GET request
  let res = http.get(PRODUCT_URL);
  
  // Basic validations for status and response time
  check(res, {
    'status is 200': (r) => r.status === 200,                   // API should return HTTP 200
    'response time is < 15s': (r) => r.timings.duration < 15000, // Response must be under 15 seconds
  });

  sleep(1); // Simulate user think-time before next request
}

// Average load test configuration
export let options = {
  vus: 50,             // 50 virtual users running concurrently
  duration: '5m',      // Test runs for 5 minutes
  tags: { test_type: 'average_load' }, // Label for identifying test type

  thresholds: {
    'http_req_duration': ['p(95) < 5000'], // 95% of all requests must finish < 5s
    'http_req_failed': ['rate < 0.10'],    // Failure rate must be below 10%
  },
};
