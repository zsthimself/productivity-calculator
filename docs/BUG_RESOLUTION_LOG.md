# Bug 解决记录

本文档记录项目开发过程中遇到的 bug 及其解决方案，供未来参考。

---

## Bug #001: CSS @import url() 与 tw-animate-css 冲突

**日期**：2026-01-04

**错误信息**：
```
Parsing CSS source code failed
./src/app/globals.css (1458:8)

@import url('https://fonts.googleapis.com/css2?family=Orbitron...')
       ^

@import rules must precede all rules aside from @charset and @layer statements
```

**问题原因**：

在 `globals.css` 中，`@import url()` 用于加载 Google Fonts。当 `tw-animate-css` 被 Tailwind CSS 编译时，它会在 CSS 文件末尾注入大量动画代码。这导致：

1. 编译后的 CSS 在第 1458 行出现了重复的 `@import url()`
2. CSS 规范要求 `@import` 必须在所有规则之前（除了 `@charset` 和 `@layer`）
3. 由于 `@import` 出现在 CSS 文件中间，整个文件解析失败
4. **所有自定义样式（渐变、发光、动画）都未生效**

**解决方案**：

使用 `next/font/google` 替代 CSS 中的 `@import url()`。

### 修改前

```css
/* globals.css */
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
@import "tw-animate-css";
```

### 修改后

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
/* 移除 Google Fonts @import */
```

```tsx
// layout.tsx
import { Orbitron, Barlow } from "next/font/google";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${barlow.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**优势**：

1. `next/font/google` 自动优化字体加载
2. 避免 CSS `@import` 顺序冲突
3. 字体作为 CSS 变量注入，可在任何地方使用

**关键教训**：

> ⚠️ 在使用 Tailwind CSS v4 + tw-animate-css 时，**不要在 CSS 文件中使用 `@import url()` 加载外部资源**。应使用 `next/font/google` 或在 HTML `<head>` 中添加 `<link>` 标签。

---
