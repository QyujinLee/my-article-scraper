import React, { useDeferredValue, useEffect, useState } from 'react';
import useCondition from '../hooks/useCondition';
import usePopupType from '../hooks/usePopupType';
import useScrapedCondition from '../hooks/useScrapedCondition';
import useSectionType from '../hooks/useSectionType';

export default function Header() {
  const [keyword, setKeyword] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [nation, setNation] = useState<string>('');
  const { showFilterPopup } = usePopupType();
  const { value: sectionType } = useSectionType();
  const { keyword: conditionKeyword, date: conditionDate, nation: conditionNation } = useCondition();
  const { keyword: scrapedKeyword, date: scrapedDate, nation: scrapedNation } = useScrapedCondition();

  const setFilterConditions = (headline: string, pubDate: string | undefined, nations: string[]) => {
    if (headline === '') {
      setKeyword('');
    } else {
      setKeyword(headline);
    }

    if (!pubDate) {
      setDate('');
    } else {
      setDate(pubDate);
    }

    if (nations.length === 0) {
      setNation('');
    } else if (nations.length === 1) {
      setNation(nations[0]);
    } else {
      setNation(`${nations[0]} 외 ${nations.length - 1}개`);
    }
  };

  useEffect(() => {
    if (sectionType === 'home') {
      setFilterConditions(
        conditionKeyword ? conditionKeyword : '',
        conditionDate,
        conditionNation?.map((item) => item.name)!
      );
    }

    if (sectionType === 'scrap') {
      setFilterConditions(scrapedKeyword ? scrapedKeyword : '', scrapedDate, scrapedNation?.map((item) => item.name)!);
    }
  }, [sectionType, conditionKeyword, conditionDate, conditionNation, scrapedKeyword, scrapedDate, scrapedNation]);

  /**
   * 필터 클릭 시 이벤트
   */
  const handleShowFilter = () => {
    showFilterPopup();
  };

  return (
    <div className="header">
      <div className="categories">
        <div className={`category ${keyword === '' ? 'inactive' : 'active'}`} onClick={handleShowFilter}>
          <img className="search-image" />
          <span className="elipsis">{keyword === '' ? '전체 헤드라인' : keyword}</span>
        </div>
        <div className={`category ${date === '' ? 'inactive' : 'active'}`} onClick={handleShowFilter}>
          <img className="calendar-image" />
          <span>{date === '' ? '전체 날짜' : date}</span>
        </div>
        <div className={`category nation ${nation === '' ? 'inactive' : 'active'}`} onClick={handleShowFilter}>
          <span>{nation === '' ? '전체 국가' : nation}</span>
        </div>
      </div>
    </div>
  );
}
