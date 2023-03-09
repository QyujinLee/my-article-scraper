import { useAppDispatch, useAppSelector } from './../store/hooks';
import { showFilterPopupAction, hideFilterPopupAction } from '../store/reducer/popupReducer';
export default function usePopupType() {
  const dispatch = useAppDispatch();

  const { isShowFilter } = useAppSelector((state) => state.popupType);

  const showFilterPopup = () => {
    dispatch(showFilterPopupAction());
  };

  const hideFilterPopup = () => {
    dispatch(hideFilterPopupAction());
  };

  return { isShowFilter, showFilterPopup, hideFilterPopup };
}
