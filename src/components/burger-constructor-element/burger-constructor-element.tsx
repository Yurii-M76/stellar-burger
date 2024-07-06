import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorIngredients,
  removeIngredients
} from '../../services/constructor/reducer';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorBurgers = useSelector(getConstructorIngredients);
    const handleMoveDown = () => {
      const updateIngredients = [...constructorBurgers];
      const ingredient = updateIngredients[index];
      updateIngredients[index] = updateIngredients[index + 1];
      updateIngredients[index + 1] = ingredient;
      dispatch(removeIngredients(updateIngredients));
    };

    const handleMoveUp = () => {
      const updatedIngredients = [...constructorBurgers];
      const ingredient = updatedIngredients[index];
      updatedIngredients[index] = updatedIngredients[index - 1];
      updatedIngredients[index - 1] = ingredient;
      dispatch(removeIngredients(updatedIngredients));
    };

    const handleClose = () => {
      const updatedIngredients = [...constructorBurgers];
      updatedIngredients.splice(index, 1);
      dispatch(removeIngredients(updatedIngredients));
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
