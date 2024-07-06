import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { getFeeds } from '../../services/orders/reducer';
import { useDispatch, useSelector } from '../../services/store';
import { feeds } from '../../services/orders/actions';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeeds);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feeds());
  }, [dispatch]);

  const handleGetFeed = useCallback(() => {
    dispatch(feeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeed} />;
};
