import { FeedData, FeedResponse, Onthisday } from './interfaces';

export const getDateObjectFromString = (dateString: string) => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getDate())) {
      throw new Error('Invalid date');
    }

    const year = date.getUTCFullYear().toString();
    const monthNumber = date.getUTCMonth() + 1;
    const dayNumber = date.getUTCDate();
    const month = `${monthNumber < 10 ? '0' + monthNumber : monthNumber}`;
    const day = `${dayNumber < 10 ? '0' + dayNumber : dayNumber}`;

    return { year, month, day };
  } catch (error) {
    return null;
  }
};

export const handleFeedsResponse = (
  response: FeedData,
  limit?: number,
  offset?: number,
): FeedResponse => {
  const { onthisday } = response;

  const responseData: FeedResponse = {} as FeedResponse;

  if (onthisday) {
    const onThisDayData = handleOnThisDayResponse(onthisday, limit, offset);

    responseData.onthisday = onThisDayData.articles;
    responseData.onthisdayCount = onThisDayData.count;
  }

  return responseData;
};

const handleOnThisDayResponse = (
  data: Onthisday[],
  limit?: number,
  offset?: number,
) => {
  const pages = data.reduce((acc, curr) => {
    return acc.concat(curr.pages);
  }, []);

  const count = pages.length;
  const from = (offset || 0) * (limit || 5);
  const to = from + (limit || 5);

  return {
    count,
    articles: pages.slice(from, to),
  };
};
