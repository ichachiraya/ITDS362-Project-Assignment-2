import http from 'k6/http';
import { check, sleep } from 'k6';

const PRODUCT_URL = 'http://10.34.112.158:8000/dk/store';

export default function () {
  
  let res = http.get(PRODUCT_URL);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 1s': (r) => r.timings.duration < 15000,
  });

  sleep(1); 
}

export let options = {
  stages: [
    { duration: '2m', target: 20 },  
    { duration: '2m', target: 50 }, 
    { duration: '2m', target: 75 }, 
    { duration: '2m', target: 0 },    
  ],
  tags: { test_type: 'stress' },
};
