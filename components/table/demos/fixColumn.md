---
title: 列固定
order: 14
---

给`TableColumn`添加`fixed`属性，可以将列固定，其中`left`固定在左侧，`right`固定在右侧；
固定的列依然支持`resizable`表头拖动，`stickHeader`表头吸顶，以及`fixHeader`表头固定

> 固定列通过`position: sticky`来实现，所以对于非首/尾列，需要指定它们之前或之后的列的固定宽度`width`来
> 帮助该列来确定固定的位置 

> @since 3.1.2 `width`属性不再是必须的

```vdt
import {Table, TableColumn} from 'kpc';

<div>
    <Table data={this.get('data')} resizable stickHeader="64">
        <TableColumn fixed="left" key="name" title="Name" width="200" class="name" />
        <TableColumn key="column1" title="Column1" width="300">
            <b:title>
                <div>Column1</div>
            </b:title>
        </TableColumn>
        <TableColumn key="column2" title="Column2" width="300" />
        <TableColumn key="column3" title="Column3" width="300" />
        <TableColumn key="column4" title="Column4" width="300" />
        <TableColumn fixed="right" key="action" title="Action" width="200">
            <b:template args="data">
                <a>action</a>
            </b:template>
        </TableColumn>
    </Table>
    <Table data={this.get('data')} fixHeader="150" resizable ref="__test" type="grid" stickHeader="64">
        <TableColumn fixed="left" key="name" title="Name" width="200" />
        <TableColumn key="column1" title="Column1" width="300" />
        <TableColumn key="column2" title="Column2" width="300" />
        <TableColumn key="column3" title="Column3" width="300" />
        <TableColumn key="column4" title="Column4" width="300" fixed="right" />
        <TableColumn fixed="right" key="action" title="Action" width="200">
            <b:template args="data">
                <a>action</a>
            </b:template>
        </TableColumn>
    </Table>
</div>
```

```styl
.k-table
    margin-bottom 20px
```

```ts

const data = [
    {name: 'John'},
    {name: 'Tom'},
    {name: 'Javey'},
].map((item: any) => {
    for (let i = 0; i < 4; i++) {
        item[`column${i + 1}`] = 'test';
    }
    return item;
});

export default class extends Component {
    static template = template;
    static defaults() {
        return {data};
    }
}
```
