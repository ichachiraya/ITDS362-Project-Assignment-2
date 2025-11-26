import http from 'k6/http';
import { check, sleep } from 'k6';

const PRODUCT_URL = 'http://10.34.112.158:8000/dk/store';

export default function () {

  let res = http.get(PRODUCT_URL);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 15s': (r) => r.timings.duration < 15000,
  });

  sleep(1); 
}

export let options = {
  vus: 50,      
  duration: '5m',
  tags: { test_type: 'average_load' },
  thresholds: {
    'http_req_duration': ['p(95) < 5000'], 
    'http_req_failed': ['rate < 0.10'],  
  },
};
