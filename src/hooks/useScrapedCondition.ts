import { setScrapedConditionsAction } from '../store/reducer/scrapedConditionReducer';
import { ICondition } from '../lib/interface/ICondition';
import { useAppDispatch, useAppSelector } from './../store/hooks';
export default function useScrapedCondition() {
  const dispatch = useAppDispatch();

  const { keyword, date, nation } = useAppSelector((state) => state.scrapedCondition);

  const setScrapedCondition = (data: ICondition) => {
    dispatch(setScrapedConditionsAction(data));
  };

  return { keyword, date, nation, setScrapedCondition };
}
