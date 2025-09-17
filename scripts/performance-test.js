#!/usr/bin/env node

/**
 * Performance testing script for the adaptive landing pages
 * Tests loading times, bundle sizes, and Core Web Vitals
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ROUTES = [
  '/',
  '/entreprise',
  '/formation',
  '/particuliers'
];

const PERFORMANCE_BUDGETS = {
  fcp: 1800, // First Contentful Paint (ms)
  lcp: 2500, // Largest Contentful Paint (ms)
  fid: 100,  // First Input Delay (ms)
  cls: 0.1,  // Cumulative Layout Shift
  ttfb: 600, // Time to First Byte (ms)
  loadTime: 3000, // Total load time (ms)
  bundleSize: 500 * 1024 // Bundle size (bytes)
};

async function measurePagePerformance(page, url) {
  console.log(`Testing ${url}...`);
  
  // Enable performance monitoring
  await page.setCacheEnabled(false);
  
  const startTime = Date.now();
  
  // Navigate to page
  const response = await page.goto(url, { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  const loadTime = Date.now() - startTime;
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      // Wait for performance entries to be available
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        
        resolve({
          ttfb: perfData ? perfData.responseStart - perfData.requestStart : 0,
          domContentLoaded: perfData ? perfData.domContentLoadedEventEnd - perfData.navigationStart : 0,
          loadComplete: perfData ? perfData.loadEventEnd - perfData.navigationStart : 0,
          fcp: fcp,
          transferSize: perfData ? perfData.transferSize : 0,
          encodedBodySize: perfData ? perfData.encodedBodySize : 0,
          decodedBodySize: perfData ? perfData.decodedBodySize : 0
        });
      }, 1000);
    });
  });
  
  // Get Core Web Vitals using web-vitals library if available
  const webVitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals = {};
      
      // Try to get LCP
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          
          setTimeout(() => {
            observer.disconnect();
            resolve(vitals);
          }, 2000);
        } catch (e) {
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    });
  });
  
  // Get resource loading information
  const resources = await page.evaluate(() => {
    const resources = performance.getEntriesByType('resource');
    return resources.map(resource => ({
      name: resource.name,
      type: resource.initiatorType,
      size: resource.transferSize,
      duration: resource.duration
    }));
  });
  
  // Calculate bundle sizes
  const jsResources = resources.filter(r => r.type === 'script' || r.name.includes('.js'));
  const cssResources = resources.filter(r => r.type === 'stylesheet' || r.name.includes('.css'));
  const imageResources = resources.filter(r => r.type === 'img' || r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/));
  
  const totalJSSize = jsResources.reduce((sum, r) => sum + (r.size || 0), 0);
  const totalCSSSize = cssResources.reduce((sum, r) => sum + (r.size || 0), 0);
  const totalImageSize = imageResources.reduce((sum, r) => sum + (r.size || 0), 0);
  
  return {
    url,
    loadTime,
    metrics: {
      ...metrics,
      ...webVitals,
      lcp: webVitals.lcp || 0
    },
    resources: {
      total: resources.length,
      js: jsResources.length,
      css: cssResources.length,
      images: imageResources.length
    },
    sizes: {
      totalJS: totalJSSize,
      totalCSS: totalCSSSize,
      totalImages: totalImageSize,
      total: totalJSSize + totalCSSSize + totalImageSize
    },
    status: response.status()
  };
}

async function runPerformanceTests() {
  console.log('🚀 Starting performance tests...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      
      // Set viewport for consistent testing
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Set user agent
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      const url = `http://localhost:3000${route}`;
      const result = await measurePagePerformance(page, url);
      results.push(result);
      
      await page.close();
    }
  } catch (error) {
    console.error('Error during performance testing:', error);
  } finally {
    await browser.close();
  }
  
  // Analyze results
  console.log('\n📊 Performance Test Results:\n');
  
  const violations = [];
  
  results.forEach(result => {
    console.log(`\n🔍 ${result.url}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Load Time: ${result.loadTime}ms`);
    console.log(`   TTFB: ${result.metrics.ttfb.toFixed(2)}ms`);
    console.log(`   FCP: ${result.metrics.fcp.toFixed(2)}ms`);
    console.log(`   LCP: ${result.metrics.lcp.toFixed(2)}ms`);
    console.log(`   Total Size: ${(result.sizes.total / 1024).toFixed(2)}KB`);
    console.log(`   JS Size: ${(result.sizes.totalJS / 1024).toFixed(2)}KB`);
    console.log(`   CSS Size: ${(result.sizes.totalCSS / 1024).toFixed(2)}KB`);
    console.log(`   Resources: ${result.resources.total} total`);
    
    // Check against budgets
    const budgetViolations = [];
    
    if (result.loadTime > PERFORMANCE_BUDGETS.loadTime) {
      budgetViolations.push(`Load Time: ${result.loadTime}ms > ${PERFORMANCE_BUDGETS.loadTime}ms`);
    }
    
    if (result.metrics.ttfb > PERFORMANCE_BUDGETS.ttfb) {
      budgetViolations.push(`TTFB: ${result.metrics.ttfb.toFixed(2)}ms > ${PERFORMANCE_BUDGETS.ttfb}ms`);
    }
    
    if (result.metrics.fcp > PERFORMANCE_BUDGETS.fcp) {
      budgetViolations.push(`FCP: ${result.metrics.fcp.toFixed(2)}ms > ${PERFORMANCE_BUDGETS.fcp}ms`);
    }
    
    if (result.metrics.lcp > PERFORMANCE_BUDGETS.lcp) {
      budgetViolations.push(`LCP: ${result.metrics.lcp.toFixed(2)}ms > ${PERFORMANCE_BUDGETS.lcp}ms`);
    }
    
    if (result.sizes.total > PERFORMANCE_BUDGETS.bundleSize) {
      budgetViolations.push(`Bundle Size: ${(result.sizes.total / 1024).toFixed(2)}KB > ${(PERFORMANCE_BUDGETS.bundleSize / 1024).toFixed(2)}KB`);
    }
    
    if (budgetViolations.length > 0) {
      console.log(`   ⚠️  Budget Violations:`);
      budgetViolations.forEach(violation => {
        console.log(`      - ${violation}`);
      });
      violations.push({ url: result.url, violations: budgetViolations });
    } else {
      console.log(`   ✅ All budgets met`);
    }
  });
  
  // Summary
  console.log('\n📈 Summary:');
  const avgLoadTime = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length;
  const avgTotalSize = results.reduce((sum, r) => sum + r.sizes.total, 0) / results.length;
  
  console.log(`   Average Load Time: ${avgLoadTime.toFixed(2)}ms`);
  console.log(`   Average Bundle Size: ${(avgTotalSize / 1024).toFixed(2)}KB`);
  console.log(`   Total Violations: ${violations.length}`);
  
  // Save results to file
  const reportPath = path.join(__dirname, '../performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    violations,
    summary: {
      avgLoadTime,
      avgTotalSize,
      totalViolations: violations.length
    }
  }, null, 2));
  
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  if (violations.length > 0) {
    console.log('\n❌ Performance tests failed with budget violations');
    process.exit(1);
  } else {
    console.log('\n✅ All performance tests passed!');
  }
}

// Mobile performance test
async function runMobilePerformanceTest() {
  console.log('\n📱 Running mobile performance tests...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const mobileResults = [];
  
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      
      // Emulate mobile device
      await page.emulate({
        name: 'iPhone 12',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        viewport: {
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          isLandscape: false
        }
      });
      
      // Throttle network to simulate 3G
      await page.emulateNetworkConditions({
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
        uploadThroughput: 750 * 1024 / 8, // 750 Kbps
        latency: 40
      });
      
      const url = `http://localhost:3000${route}`;
      const result = await measurePagePerformance(page, url);
      result.device = 'mobile';
      mobileResults.push(result);
      
      await page.close();
    }
  } catch (error) {
    console.error('Error during mobile performance testing:', error);
  } finally {
    await browser.close();
  }
  
  // Mobile results summary
  console.log('\n📱 Mobile Performance Results:');
  mobileResults.forEach(result => {
    console.log(`   ${result.url}: ${result.loadTime}ms load time`);
  });
  
  return mobileResults;
}

// Main execution
async function main() {
  try {
    await runPerformanceTests();
    await runMobilePerformanceTest();
  } catch (error) {
    console.error('Performance testing failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runPerformanceTests, runMobilePerformanceTest };