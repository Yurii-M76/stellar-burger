import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/user/reducer';
import {
  clearIngredients,
  getConstructorItems
} from '../../services/constructor/reducer';
import {
  getLoading,
  getOrder,
  resetOrder
} from '../../services/orders/reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderBurger } from '../../services/orders/actions';

export const BurgerConstructor: FC = () => {
  const user = useSelector(getUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getLoading);
  const orderModalData = useSelector(getOrder);

  const itemIds: string[] = [
    ...constructorItems.ingredients.map((element) => element._id),
    constructorItems.bun?._id
  ].filter((id): id is string => id !== undefined);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    dispatch(orderBurger(itemIds));
  };
  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
