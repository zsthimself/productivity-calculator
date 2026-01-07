/**
 * @INPUT: locale (语言代码), 翻译字典
 * @OUTPUT: 翻译函数和翻译类型
 * @POS: 翻译工具 - 提供获取翻译文本的函数
 */

import { Locale, DEFAULT_LOCALE } from './i18n';

// 导入翻译文件
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import ja from '@/locales/ja.json';

// 翻译字典类型
export type TranslationDict = typeof en;

// 所有翻译
const translations: Record<Locale, TranslationDict> = {
    en,
    zh,
    es,
    de,
    ja,
};

// 获取指定语言的翻译字典
export function getTranslations(locale: Locale): TranslationDict {
    return translations[locale] || translations[DEFAULT_LOCALE];
}

// 获取行业翻译
export function getIndustryTranslation(
    locale: Locale,
    slug: string
): { name: string; title: string; description: string } | undefined {
    const dict = getTranslations(locale);
    const industries = dict.industries as Record<string, { name: string; title: string; description: string }>;
    return industries[slug];
}

// 创建翻译函数 (类似 t('key.path'))
export function createTranslator(locale: Locale) {
    const dict = getTranslations(locale);

    return function t(key: string): string {
        const keys = key.split('.');
        let value: unknown = dict;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        if (typeof value === 'string') {
            return value;
        }

        console.warn(`Translation value is not a string: ${key}`);
        return key;
    };
}
