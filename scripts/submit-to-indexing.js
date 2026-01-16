/**
 * Google Indexing API 批量提交脚本
 * 用于向Google提交URL更新请求
 * 
 * 使用方法:
 * 1. 将服务账号JSON密钥文件放置为 credentials.json
 * 2. 运行: node scripts/submit-to-indexing.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// 配置
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const BATCH_SIZE = 100; // Google API每天限制200次，分批处理
const DELAY_MS = 1000; // 每次请求间隔

// 从sitemap.xml中提取所有URL
function extractUrlsFromSitemap(sitemapPath) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urlRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 提交单个URL到Indexing API
async function submitUrl(indexing, url, type = 'URL_UPDATED') {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type // URL_UPDATED 或 URL_DELETED
      }
    });
    return { url, success: true, data: response.data };
  } catch (error) {
    return { url, success: false, error: error.message };
  }
}

// 主函数
async function main() {
  // 检查凭据文件
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('❌ 错误: 未找到 credentials.json 文件');
    console.log('请将Google服务账号JSON密钥文件复制到项目根目录并命名为 credentials.json');
    process.exit(1);
  }

  // 读取凭据并认证
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing']
  });

  const indexing = google.indexing({
    version: 'v3',
    auth: await auth.getClient()
  });

  // 提取URL
  const urls = extractUrlsFromSitemap(SITEMAP_PATH);
  console.log(`📋 从sitemap中提取了 ${urls.length} 个URL\n`);

  // 选择要提交的URL（可以通过命令行参数指定）
  const urlsToSubmit = process.argv[2] === '--new' 
    ? urls.filter(url => 
        url.includes('/therapy') ||
        url.includes('/employee') ||
        url.includes('/physical-therapy') ||
        url.includes('/labor') ||
        url.includes('/machine') ||
        url.includes('/welding') ||
        url.includes('/technician')
      )
    : urls.slice(0, BATCH_SIZE);

  console.log(`🚀 准备提交 ${urlsToSubmit.length} 个URL...\n`);

  // 批量提交
  const results = { success: 0, failed: 0, errors: [] };

  for (let i = 0; i < urlsToSubmit.length; i++) {
    const url = urlsToSubmit[i];
    const result = await submitUrl(indexing, url);
    
    if (result.success) {
      results.success++;
      console.log(`✅ [${i + 1}/${urlsToSubmit.length}] ${url}`);
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`❌ [${i + 1}/${urlsToSubmit.length}] ${url} - ${result.error}`);
    }

    // 添加延迟避免频率限制
    if (i < urlsToSubmit.length - 1) {
      await delay(DELAY_MS);
    }
  }

  // 输出统计
  console.log('\n📊 提交结果统计:');
  console.log(`   成功: ${results.success}`);
  console.log(`   失败: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ 失败详情:');
    results.errors.forEach(e => console.log(`   ${e.url}: ${e.error}`));
  }
}

main().catch(console.error);
