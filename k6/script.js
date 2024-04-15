import http from 'k6/http';
import { Trend } from 'k6/metrics';

const BASE_URL = 'http://localhost:3000';

const usersApiCallTrend = new Trend('users_http_req_duration', true);
const examplesApiCallTrend = new Trend('examples_http_req_duration', true);
const tokensApiCallTrend = new Trend('tokens_http_req_duration', true);

export const options = {
  scenarios: {
    users: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
      gracefulStop: '0s',
      exec: 'users',
    },
    tokens: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
      gracefulStop: '0s',
      exec: 'tokens',
    },
    examples: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
      gracefulStop: '0s',
      exec: 'examples',
    },
  },
  discardResponseBodies: true,
};

export function users() {
  const response = http.get(`${BASE_URL}/users`);
  usersApiCallTrend.add(response.timings.duration);
}

export function examples() {
  const response = http.get(`${BASE_URL}/examples`);
  examplesApiCallTrend.add(response.timings.duration);
}

export function tokens() {
  const response = http.get(`${BASE_URL}/tokens`);
  tokensApiCallTrend.add(response.timings.duration);
}

export function handleSummary(data) {
  return {
    'k6/output/summary.json': JSON.stringify(data),
  };
}
