import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorIngredients,
  removeIngredients,
  sortIngredient
} from '../../services/constructor/reducer';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorBurgers = useSelector(getConstructorIngredients);
    const handleMoveDown = () => {
      dispatch(sortIngredient({ index, position: 1 }));
    };

    const handleMoveUp = () => {
      dispatch(sortIngredient({ index, position: -1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredients(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
