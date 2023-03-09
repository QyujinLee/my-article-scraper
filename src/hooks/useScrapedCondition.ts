import { setConditionsAction } from '../store/reducer/conditionReducer';
import { ICondition } from '../lib/interface/Icondition';
import { useAppDispatch, useAppSelector } from './../store/hooks';
export default function useScrapedCondition() {
  const dispatch = useAppDispatch();

  const { keyword, date, nation } = useAppSelector((state) => state.condition);

  const setCondition = (data: ICondition) => {
    dispatch(setConditionsAction(data));
  };

  return { keyword, date, nation, setCondition };
}
