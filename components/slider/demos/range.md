---
title: 范围选择
order: 3
---

指定`range`使组件支持范围选择，此时`v-model`绑定的数据为数组，并且不会展示`input`输入框。

```vdt
import {Slider} from 'kpc';

<Slider range v-model="values" ev-change={(v) => console.log(v)}/>
```

```ts
interface Props {
    values?: [number, number]
}

export default class extends Component<Props> {
    static template = template;

    static defaults() {
        return {
            values: [50, 76],
        } as Props;
    }
}
```
