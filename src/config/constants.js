export const HIGH = 'high';
export const MID = 'mid';
export const LOW = 'low';

export const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed/';
export const METRICS_KEYS = [
  'first-contentful-paint',
  'first-meaningful-paint',
  'speed-index',
  'first-cpu-idle',
  'interactive',
  'max-potential-fid',
];

export const PASS_THRESHOLD = 0.9;
export const RATINGS = {
  PASS: { label: "pass", minScore: PASS_THRESHOLD },
  AVERAGE: { label: "average", minScore: 0.5 },
  FAIL: { label: "fail" },
  ERROR: { label: "error" }
};

export const LOAD_OPPORTUNITIES = "load-opportunities";
export const DIAGNOSTICS = "diagnostics";
export const PASSED = "passed";

export const STRATEGY_TABS = [{
  value: 'desktop',
  label: 'Desktop',
}, {
  value: 'mobile',
  label: 'Mobile',
}];
