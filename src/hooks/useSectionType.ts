import { useAppDispatch, useAppSelector } from './../store/hooks';
import { setSectionTypeAction } from '../reducer/sectionTypeReducer';
export default function useSectionType() {
  const dispatch = useAppDispatch();

  const { value } = useAppSelector((state) => state.sectionType);

  const setSectionType = (data: string | undefined) => {
    dispatch(setSectionTypeAction(data));
  };

  return { value, setSectionType };
}
