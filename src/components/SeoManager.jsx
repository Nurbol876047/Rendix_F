import { useEffect } from 'react';
import { studioSettings } from '../content/siteContent';
import { useLanguage } from '../contexts/LanguageContext';

const upsertMeta = (attributeName, attributeValue, content) => {
  let metaTag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};

const SeoManager = () => {
  const { language, t } = useLanguage();

  const title = t('site.title');
  const description = t('site.description');
  const ogTitle = t('site.ogTitle');
  const ogDescription = t('site.ogDescription');

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = language === 'kz' ? 'kk' : language;

    const imageUrl = new URL(studioSettings.ogImagePath, window.location.origin).href;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'theme-color', '#050505');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', ogTitle);
    upsertMeta('property', 'og:description', ogDescription);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:url', window.location.href);
    upsertMeta('property', 'og:site_name', studioSettings.studioName);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', ogTitle);
    upsertMeta('name', 'twitter:description', ogDescription);
    upsertMeta('name', 'twitter:image', imageUrl);
  }, [description, language, ogDescription, ogTitle, title]);

  return null;
};

export default SeoManager;
