import { useAppDispatch, useAppSelector } from './../store/hooks';
import { setScrapedIdsAction } from '../store/reducer/scrapedIdsReducer';
export default function useScrapedIds() {
  const dispatch = useAppDispatch();

  const { scrapedIds } = useAppSelector((state) => state.scrapedIds);

  const scrapId = (data: string) => {
    dispatch(setScrapedIdsAction([...scrapedIds, data]));
  };

  const removeScrapedId = (data: string) => {
    dispatch(setScrapedIdsAction(scrapedIds.filter((item) => item !== data)));
  };

  const setScrapedIds = (data: string[]) => {
    dispatch(setScrapedIdsAction(data));
  };

  return { scrapedIds, scrapId, removeScrapedId, setScrapedIds };
}
