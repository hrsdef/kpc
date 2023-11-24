---
title: 禁用状态
order: 1
---

给`Select`添加`disabled`禁用整个选择框选择；给`Option`添加`disabled`禁用该项选择

```vdt
import {Select, Option} from 'kpc';

<div>
    <Select v-model="day" disabled filterable>
        <Option value="Monday">星期一</Option>
        <Option value="Tuesday">星期二</Option>
        <Option value="Wednesday">星期三</Option>
        <Option value="Thursday">星期四</Option>
        <Option value="Friday">星期五</Option>
        <Option value="Saturday">星期六</Option>
        <Option value="Sunday">星期天</Option>
    </Select>
    <Select v-model="day">
        <Option value="Monday">星期一</Option>
        <Option value="Tuesday" disabled>星期二</Option>
        <Option value="Wednesday">星期三</Option>
        <Option value="Thursday">星期四</Option>
        <Option value="Friday">星期五</Option>
        <Option value="Saturday">星期六</Option>
        <Option value="Sunday">星期天</Option>
    </Select>
    <Select v-model="days" multiple disabled>
        <Option value="Monday">星期一</Option>
        <Option value="Tuesday">星期二</Option>
        <Option value="Wednesday">星期三</Option>
        <Option value="Thursday">星期四</Option>
        <Option value="Friday">星期五</Option>
        <Option value="Saturday">星期六</Option>
        <Option value="Sunday">星期天</Option>
    </Select>
</div>
```

```styl
.k-select
    margin-right 10px
```

```ts
interface Props {
    day?: string | null
    days?: string[]
}

export default class extends Component<Props> {
    static template = template;
    static defaults() {
        return {
            day: null,
            days: ['Monday', 'Tuesday'],
        } as Props;
    }
}
```
