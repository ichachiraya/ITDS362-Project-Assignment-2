import http from 'k6/http';
import { check, sleep } from 'k6';

// Target endpoint for the test
const PRODUCT_URL = 'http://10.34.112.158:8000/dk/store';

export default function () {

  // Send a GET request to the endpoint
  let res = http.get(PRODUCT_URL);
  
  // Basic checks to validate the response
  check(res, {
    'status is 200': (r) => r.status === 200,                   // Should return HTTP 200
    'response time is < 15s': (r) => r.timings.duration < 15000, // Must respond under 15 seconds
  });

  sleep(1); // Simulate user think time
}

// Soak test configuration (sustained load over time)
export let options = {
  vus: 50,          // 50 virtual users running continuously
  duration: '2m',   // Run the test for 2 minutes
  tags: { test_type: 'soak' }, // Label for this test type
};
