const fs = require('fs');

function generateComparisonTable(baseCommitHash, baseMetricsPath, targetCommitHash, targetMetricsPath, outputPath) {
  // Load JSON outputs from k6
  const baseMetrics = JSON.parse(fs.readFileSync(baseMetricsPath, 'utf8'));
  const targetMetrics = JSON.parse(fs.readFileSync(targetMetricsPath, 'utf8'));

  const baseData = extractMetrics(baseMetrics);
  const targetData = extractMetrics(targetMetrics);

  const table = generateTable(baseCommitHash, baseData, targetCommitHash, targetData);

  fs.writeFileSync(outputPath, table);
}

function extractMetrics(metrics) {
  const extractedMetrics = {};
  const metricKeys = Object.keys(metrics.metrics);

  for (const key of metricKeys) {
    if (key.endsWith('_http_req_duration')) {
      const values = metrics.metrics[key].values;
      const avgResponseTime = values.avg;
      const maxResponseTime = values.max;
      const p90 = values['p(90)'];
      const p95 = values['p(95)'];

      const name = key.split('_')[0].charAt(0).toUpperCase() + key.split('_')[0].slice(1);

      if (!extractedMetrics[name]) {
        extractedMetrics[name] = { avgResponseTime, maxResponseTime, p90, p95 };
      } else {
        extractedMetrics[name].avgResponseTime = avgResponseTime;
        extractedMetrics[name].maxResponseTime = maxResponseTime;
        extractedMetrics[name].p90 = p90;
        extractedMetrics[name].p95 = p95;
      }
    }
  }

  extractedMetrics['Test Run Duration'] = metrics.state.testRunDurationMs;

  return extractedMetrics;
}

function generateTable(baseCommitHash, baseData, targetCommitHash, targetData) {
  let table = `k6 load testing comparison.\nBase Commit Hash: ${baseCommitHash}\nTarget Commit Hash: ${targetCommitHash}\n`;
  table += `Test duration: ${baseData['Test Run Duration'].toFixed(2)} ms (base) | ${targetData['Test Run Duration'].toFixed(2)} ms (target) \n\n`;
  table += '| Endpoint \\ Metric | Average | Max | p(90) | p(95) |\n';
  table += '| ------------------ | ---- | ------ | ----- | ----- |\n';

  for (const key of Object.keys(baseData)) {
    if (key === 'Test Run Duration') {
      continue;
    }
    const baseAvg = baseData[key].avgResponseTime;
    const targetAvg = targetData[key].avgResponseTime;
    const baseMax = baseData[key].maxResponseTime;
    const targetMax = targetData[key].maxResponseTime;
    const baseP90 = baseData[key].p90;
    const targetP90 = targetData[key].p90;
    const baseP95 = baseData[key].p95;
    const targetP95 = targetData[key].p95;

    table += `| **${key}** | ${computeCell(baseAvg, targetAvg)} | ${computeCell(baseMax, targetMax)} | ${computeCell(baseP90, targetP90)} | ${computeCell(baseP95, targetP95)} | \n`;
  }

  return table;
}

function computeCell(baseDuration, targetDuration) {
  return `${baseDuration.toFixed(2)} ms -> ${targetDuration.toFixed(2)} ms (${getDifferencePercentage(baseDuration, targetDuration)})`;
}

function getDifferencePercentage(baseValue, targetValue) {
  const difference = ((targetValue - baseValue) / baseValue) * 100;
  const sign = difference >= 0 ? '+' : '';
  let output = `${sign}${difference.toFixed(2)}%`;
  if (difference > 20.0) {
    output += ' ⚠️';
  } else if (difference < -20) {
    output += ' 🟢';
  }

  return `${output}`;
}

if (process.argv.length !== 7) {
  console.error('Usage: node compare-results.js baseCommitHash baseMetricsPath targetCommitHash targetMetricsPath outputFile');
  process.exit(1);
}

const baseCommitHash = process.argv[2];
const baseMetricsPath = process.argv[3];
const targetCommitHash = process.argv[4];
const targetMetricsPath = process.argv[5];
const outputPath = process.argv[6];

generateComparisonTable(baseCommitHash, baseMetricsPath, targetCommitHash, targetMetricsPath, outputPath);

