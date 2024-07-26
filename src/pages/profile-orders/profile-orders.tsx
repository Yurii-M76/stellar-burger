import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getProfileOrders } from '../../services/orders/reducer';
import { useDispatch, useSelector } from '../../services/store';
import { getAllIngredients } from '../../services/ingredients/reducer';
import { getIngredients } from '../../services/ingredients/actions';
import { orders as ordersAction } from '../../services/orders/actions';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getProfileOrders);

  const ingredients: TIngredient[] = useSelector(getAllIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    dispatch(ordersAction());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
