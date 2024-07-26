import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getAllIngredients } from '../../services/ingredients/reducer';
import { getFeeds, getOrderModalData } from '../../services/orders/reducer';
import { useParams } from 'react-router-dom';
import { orderByNumber } from '../../services/orders/actions';

export const OrderInfo: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getFeeds);
  const [stateOrder, setStateOrder] = useState<TOrder | null>(null);
  const ingredients: TIngredient[] = useSelector(getAllIngredients);
  const orderId = Number(params.number);
  const orderModalData: TOrder = useSelector(getOrderModalData)[0];

  useEffect(() => {
    const order: TOrder | undefined = data.find(
      (elem) => elem.number === orderId
    );
    if (order) {
      setStateOrder(order);
    } else {
      dispatch(orderByNumber(orderId));
      setStateOrder(orderModalData);
    }
  }, [dispatch, orderModalData, orderId]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!stateOrder || !ingredients.length) return null;

    const date = new Date(stateOrder.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = stateOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...stateOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [stateOrder, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
