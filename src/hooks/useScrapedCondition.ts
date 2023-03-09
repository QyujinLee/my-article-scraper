import { setConditionsAction } from '../store/reducer/conditionReducer';
import { ICondition } from '../lib/interface/ICondition';
import { useAppDispatch, useAppSelector } from './../store/hooks';
export default function useScrapedCondition() {
  const dispatch = useAppDispatch();

  const {
    keyword,
    date,
    nation,
    'api-key': apiKey,
  } = useAppSelector((state) => state.condition);

  const setCondition = (data: ICondition) => {
    dispatch(setConditionsAction(data));
  };

  return { keyword, date, nation, apiKey, setCondition };
}
