/* eslint-disable i18next/no-literal-string */
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

interface CounterProps {
  className?: string;

}
export const Counter = ({ className }: CounterProps) => {
    const dispatch = useDispatch();

    const counterValue = useSelector(getCounterValue);

    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };
    return (
        <div>
            <h1 data-testid="value-title">
                {counterValue}
            </h1>
            <Button data-testid="inc-btn" onClick={increment} type="button">increment</Button>
            <Button data-testid="dec-btn" onClick={decrement} type="button">decrement</Button>
        </div>
    );
};
