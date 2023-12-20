---
title: 表头分组
order: 12
---

嵌套使用`TableColumn`即可定义表头分组

> `key`必须在当前表格下必须唯一

```vdt
import {Table, TableColumn} from 'kpc';

<Table data={this.get('data')} type="grid" resizable stickHeader="64" minColWidth={100}>
    <TableColumn title="Weekday" key='weekday' fixed="left" />
    <TableColumn title="Forenoon" key="forenoon">
        <TableColumn title="Time" key="forenoonTime" fixed="left" />
        <TableColumn title="Classes" key="classes">
            <TableColumn title="Class 1" key='class1' />
            <TableColumn title="Class 2" key='class2' />
            <TableColumn title="Class 3" key='class3' />
            <TableColumn title="Class 4" key='class4' />
        </TableColumn>
    </TableColumn>
    <TableColumn title="Afternoon" key="afternoon">
        <TableColumn title="Time" key="afternoonTime" />
        <TableColumn title="Class 5" key='class5' />
        <TableColumn title="Class 6" key='class6' fixed="right" />
        <TableColumn title="Class 7" key='class7' fixed="right" />
    </TableColumn>
</Table>
```

```ts
const weekdays = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday'];
const classes = ['English', 'Mathematics', 'Chinese', 'History', 'Geopraghy'];
let index = 0;
const randomClasses = () => {
    const ret: Record<string, string> = {};
    for (let i = 0; i < 7; i++) {
        // ret[`class${i + 1}`] = classes[Math.floor(Math.random() * classes.length)];
        ret[`class${i + 1}`] = classes[(i + index) % classes.length];
    }
    index++;
    return ret;
};
const data = weekdays.map(weekday => {
    return {
        weekday, 
        ...randomClasses(), 
        forenoonTime: '08:00 ~ 12:00',
        afternoonTime: '14:00 ~ 17:00',
    };
});

export default class extends Component {
    static template = template;

    static defaults() {
        return {data};
    }
}
```
