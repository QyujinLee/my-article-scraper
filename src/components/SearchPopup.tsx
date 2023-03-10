import React, { useState, useEffect, useRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import usePopupType from '../hooks/usePopupType';
import useSectionType from '../hooks/useSectionType';
import useCondition from '../hooks/useCondition';
import useScrapedCondition from '../hooks/useScrapedCondition';
import moment from 'moment';

export default function SearchPopup() {
  type nationValueType = { name: string; code: string };
  type nationValuesType = Array<nationValueType>;

  const { hideFilterPopup } = usePopupType();
  const inputHeadline = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [nations, setNations] = useState<Array<nationValueType>>([]);
  const { value: sectionType } = useSectionType();
  const { setCondition } = useCondition();
  const { setScrapedCondition } = useScrapedCondition();

  const nationValues: nationValuesType = [
    { name: '대한민국', code: `South+Korea` },
    { name: '중국', code: `China` },
    { name: '일본', code: `Japan` },
    { name: '미국', code: `United+States` },
    { name: '북한', code: `North+Korea` },
    { name: '러시아', code: `Russia` },
    { name: '프랑스', code: `France` },
    { name: '영국', code: `United+Kingdom` },
  ];

  registerLocale('ko', ko);

  /**
   * 날짜 변경 이벤트
   * @param date
   */
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  /**
   * 국가 버튼 클릭 시 이벤트
   * @param item
   */
  const handleClickNation = (item: nationValueType) => {
    const targetIdx = nations.findIndex((nation) => item.name === nation.name && item.code === nation.code);

    if (targetIdx !== -1) {
      const newNations = nations.filter((_, idx) => idx !== targetIdx);
      setNations(newNations);
    } else {
      setNations([...nations, item]);
    }
  };

  /**
   * 딤드 클릭 시 팝업 닫기
   */
  const handleClickDimmed = () => {
    hideFilterPopup();
  };

  /**
   * 필터 적용하기 클릭 시 이벤트
   */
  const handleClickFilter = async () => {
    let headline: string = '';

    if (inputHeadline.current) {
      headline = inputHeadline.current.value;
    }

    const newCondition = {
      keyword: headline.trim(),
      date: selectedDate ? moment(selectedDate).format('YYYY.MM.DD').toString() : undefined,
      nation: nations,
    };

    if (sectionType === 'home') {
      setCondition(newCondition);
    }

    if (sectionType === 'scrap') {
      setScrapedCondition(newCondition);
    }

    hideFilterPopup();
  };

  // 팝업 열린 후에 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <>
      <div className="popup">
        <div className="popup__content">
          <p className="title">헤드라인</p>
          <div className="input__wrapper">
            <input
              type="text"
              className="input__headline"
              ref={inputHeadline}
              placeholder="검색하실 헤드라인을 입력해주세요."
              maxLength={26}
            />
          </div>
        </div>
        <div className="popup__content">
          <p className="title">날짜</p>
          <div className="input__wrapper calendar">
            <div className="calendar__wrapper">
              <ReactDatePicker
                className="input__date"
                placeholderText="날짜를 선택해주세요"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy.MM.dd"
                locale="ko"
              />
            </div>
            <img className={`calendar-image ${selectedDate ? 'active' : 'inactive'}`} />
          </div>
        </div>
        <div className="popup__content">
          <p className="title">국가</p>
          <div className="nations">
            {nationValues.map((item) => (
              <button
                key={item.code}
                className={`btn__nation ${
                  nations.find((nation) => item.name === nation.name && item.code === nation.code)
                    ? 'active'
                    : 'inactive'
                }`}
                onClick={() => handleClickNation(item)}
                value={item.code}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <button className="btn__filter" onClick={handleClickFilter}>
          필터 적용하기
        </button>
      </div>
      <div className="dimmed" onClick={handleClickDimmed} />
    </>
  );
}
