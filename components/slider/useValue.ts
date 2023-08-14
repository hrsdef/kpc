import {useInstance} from 'intact';
import type {Slider} from './';
import {useReceive} from '../../hooks/useReceive';
import {NormalizedGetStep} from '../spinner/useStep';
import {minMaxStep} from '../spinner/useValue';
import {error} from 'intact-shared';
import {isEqualArray} from '../utils';
import {useState} from '../../hooks/useState';

export type Value<Range extends boolean = boolean> =
    Range extends true ? [number, number] : number

export function useValue(getStep: NormalizedGetStep, getDragging: () => boolean) {
    const instance = useInstance() as Slider<boolean>;
    const showValue = useState<Value>(instance.get('value')!, isEqualValue);

    useReceive<Slider>(['min', 'max', 'step', 'value'], () => {
        if (getDragging()) return;
        fixValue(instance.get('value')!, true);
    });

    instance.on('$change:value', (newValue, oldValue) => {
        if (getDragging()) return;
        instance.trigger('change', newValue!, oldValue!);
    });

    function isEqualValue(newValue: Value, oldValue: Value) {
        return newValue === oldValue || isEqualArray(newValue, oldValue);
    }

    function fixValue(value: Value, fixShowValue: boolean) {
        const fixedValue = getFixedValue(value);
        showValue.set(fixShowValue ? fixedValue: value);
        setValue(fixedValue);
    }

    function setValue(value: Value) {
        if (isEqualValue(value, instance.get('value')!)) return;
        instance.set({value});
    }

    function getFixedValue(value: Value): Value {
        const {min, range} = instance.get();

        let fixedValue: Value;
        if (range) {
            if (!Array.isArray(value)) {
                const tmp = fix(value);
                fixedValue = [tmp, tmp];
            } else {
                fixedValue = [fix(value[0]), fix(value[1])];
            }
        } else {
            fixedValue = fix(value as number);
        }

        return fixedValue;
    }

    function fix(value: number): number {
        const {max, forceStep} = instance.get();
        const [step, min] = getStep(value);

        if (min > max!) {
            if (process.env.NODE_ENV !== 'production') {
                error(`[Slider] min must less than or equal to max, but got min: ${min} max: ${max}`);
                return 0;
            }
        }

        return minMaxStep(value, min, max!, forceStep ? step : null);
    }

    function onSpinnerChange(v: Value) {
        showValue.set(v);
        instance.set({value: v});
    }

    function onLeftSpinnerChange(v: number) {
        const secondValue = (showValue.value as Value<true>)[1];
        onSpinnerChange([v, Math.max(v, secondValue)]);
    }

    function onRightSpinnerChange(v: number) {
        const firstValue = (showValue.value as Value<true>)[0];
        onSpinnerChange([Math.min(v, firstValue), v]);
    }

    function triggerChangeEvent(oldValue: Value) {
        const {value} = instance.get();
        if (isEqualValue(value!, oldValue)) return;

        instance.trigger('change', value!, oldValue);
    }

    return {
        showValue,
        onSpinnerChange,
        onLeftSpinnerChange,
        onRightSpinnerChange,
        setValue,
        triggerChangeEvent,
        fixValue,
    };
}
