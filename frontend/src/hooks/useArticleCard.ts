import React, { useState } from 'react';

import { ArticleCardProps } from '../shared/interfaces';

export const useArticleCard = (props: ArticleCardProps) => {
  const [translatedText, setTranslatedText] = useState<{
    title?: string;
    summary?: string;
  }>();
  const [isLoadingTranslation, setLoadingTranslation] =
    useState<boolean>(false);

  const handleClick = () => {
    window.open(props.article.content_urls.desktop.page, '_blank');

    props.onClick && props.onClick();
  };

  const handleTranslation = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!props.onTranslate) return;

    try {
      setLoadingTranslation(true);

      const translatedData = await props.onTranslate();

      setTranslatedText(translatedData);
    } catch (error) {
      alert('Failed to translate article. Please try again later.');
    } finally {
      setLoadingTranslation(false);
    }
  };

  return {
    translatedText,
    isLoadingTranslation,
    handleClick,
    handleTranslation,
  };
};
