import {useInstance, onMounted, onUpdated, findDomFromVNode} from 'intact';
import type {Tabs} from './';
import {useState} from '../../hooks/useState';

export function useActiveBar() {
    const instance = useInstance() as Tabs;
    const styles = useState<Record<string, string> | null>(null, (lastValue, nextValue) => {
        if (lastValue === null || nextValue === null) return lastValue === nextValue;
        for (let key in lastValue) {
            if (lastValue[key] !== nextValue[key]) return false;
        }
        return true;
    });

    function generateStyle() {
        const element = findDomFromVNode(instance.$lastInput!, true) as HTMLElement;
        const activeTab = element.querySelector('.k-tab.k-active') as HTMLElement | null;

        if (!activeTab) return;
        
        const vertical = instance.get('vertical');
        if (!vertical) {
            const width = activeTab.offsetWidth;
            const left = activeTab.offsetLeft;
            styles.set({left: left + 'px', width: width + 'px'});
        } else {
            const height = activeTab.offsetHeight;
            const top = activeTab.offsetTop;
            styles.set({top: top + 'px', height: height + 'px'});
        }
    } 

    onMounted(generateStyle);
    onUpdated(generateStyle);

    return styles;
}
