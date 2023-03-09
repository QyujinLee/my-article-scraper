/**
 * 인덱스에 따른 요일 반환
 * @param idx
 * @returns
 */
export const getDay = (idx: number) => {
  const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
  return dayArr[idx];
};
