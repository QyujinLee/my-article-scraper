import { setConditionsAction } from '../store/reducer/conditionReducer';
import { Icondition } from '../lib/interface/Icondition';
import { useAppDispatch, useAppSelector } from './../store/hooks';
export default function useCondition() {
  const dispatch = useAppDispatch();

  const { keyword, date, nation } = useAppSelector((state) => state.condition);

  const setCondition = (data: Icondition) => {
    dispatch(setConditionsAction(data));
  };

  return { keyword, date, nation, setCondition };
}