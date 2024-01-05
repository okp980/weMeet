import {useAppDispatch, useAppSelector} from '../store';
import {selectHasMatchRequest, updateMatchRequest} from '../store/notification';

const useNotification = () => {
  const dispatch = useAppDispatch();
  const hasMatchRequest = useAppSelector(selectHasMatchRequest);

  function changeHasMatchRequest(status: boolean) {
    dispatch(updateMatchRequest({status}));
  }
  return {hasMatchRequest, changeHasMatchRequest};
};

export default useNotification;
