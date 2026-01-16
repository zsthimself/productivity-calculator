/**
 * Google Indexing API 批量提交脚本
 * 用于向Google提交URL更新请求
 * 
 * 使用方法:
 * 1. 将服务账号JSON密钥文件放置为 credentials.json
 * 2. 运行: npm run submit-urls        (只提交新URL)
 *         npm run submit-urls:force   (强制提交所有URL)
 *         npm run submit-urls:new     (只提交最近添加的行业页面)
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// 配置
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const SUBMITTED_URLS_PATH = path.join(__dirname, 'submitted-urls.json');
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

// 加载已提交的URL记录
function loadSubmittedUrls() {
  if (fs.existsSync(SUBMITTED_URLS_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(SUBMITTED_URLS_PATH, 'utf-8'));
      return new Set(data.urls || []);
    } catch (e) {
      console.log('⚠️ 无法读取已提交URL记录，将创建新记录');
      return new Set();
    }
  }
  return new Set();
}

// 保存已提交的URL记录
function saveSubmittedUrls(urls) {
  const data = {
    lastUpdated: new Date().toISOString(),
    count: urls.size,
    urls: Array.from(urls)
  };
  fs.writeFileSync(SUBMITTED_URLS_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n💾 已保存 ${urls.size} 个URL到提交记录`);
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
  // 解析命令行参数
  const args = process.argv.slice(2);
  const forceAll = args.includes('--force');
  const onlyNewIndustries = args.includes('--new');

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
  const allUrls = extractUrlsFromSitemap(SITEMAP_PATH);
  console.log(`📋 从sitemap中提取了 ${allUrls.length} 个URL`);

  // 加载已提交记录
  const submittedUrls = loadSubmittedUrls();
  console.log(`📂 已有 ${submittedUrls.size} 个URL提交记录`);

  // 确定要提交的URL
  let urlsToSubmit;
  
  if (onlyNewIndustries) {
    // 只提交新增行业页面
    urlsToSubmit = allUrls.filter(url => 
      url.includes('/therapy') ||
      url.includes('/employee') ||
      url.includes('/physical-therapy') ||
      url.includes('/labor') ||
      url.includes('/machine') ||
      url.includes('/welding') ||
      url.includes('/technician')
    );
    console.log(`\n🆕 模式: 只提交新行业页面`);
  } else if (forceAll) {
    // 强制提交所有URL
    urlsToSubmit = allUrls;
    console.log(`\n🔄 模式: 强制重新提交所有URL`);
  } else {
    // 只提交新URL（不在记录中的）
    urlsToSubmit = allUrls.filter(url => !submittedUrls.has(url));
    console.log(`\n✨ 模式: 只提交新URL（跳过已提交的）`);
  }

  if (urlsToSubmit.length === 0) {
    console.log('\n✅ 没有新URL需要提交，所有页面都已在提交记录中');
    console.log('   如需强制重新提交，请使用: npm run submit-urls:force');
    return;
  }

  console.log(`🚀 准备提交 ${urlsToSubmit.length} 个URL...\n`);

  // 批量提交
  const results = { success: 0, failed: 0, errors: [] };
  const newlySubmitted = new Set(submittedUrls); // 复制现有记录

  for (let i = 0; i < urlsToSubmit.length; i++) {
    const url = urlsToSubmit[i];
    const result = await submitUrl(indexing, url);
    
    if (result.success) {
      results.success++;
      newlySubmitted.add(url); // 添加到记录
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

  // 保存更新后的提交记录
  if (results.success > 0) {
    saveSubmittedUrls(newlySubmitted);
  }

  // 输出统计
  console.log('\n📊 提交结果统计:');
  console.log(`   成功: ${results.success}`);
  console.log(`   失败: ${results.failed}`);
  console.log(`   总记录: ${newlySubmitted.size}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ 失败详情:');
    results.errors.forEach(e => console.log(`   ${e.url}: ${e.error}`));
  }
}

main().catch(console.error);
