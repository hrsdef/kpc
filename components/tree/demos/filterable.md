---
title: 过滤
order: 5
---

给`Tree`指定`filter`函数，即可实现节点过滤功能，该函数返回`false`则表示过滤掉该项。你需要给`data`的每一项添加全局唯一的`key`
否则过滤时，会因为每次更新`key`不同而闪动

```vdt
import {Tree, Input} from 'kpc';

<div>
    <Input v-model="keywords"
        placeholder="Please enter keywords to filter node."
    />
    <Tree 
        data={this.get('data')}
        v-model:expandedKeys="expandedKeys"
        filter={this.filter}
    />
</div>
```

```ts
import {bind, TreeDataItem} from 'kpc';

interface Props {
    expandedKeys?: string[]
    keywords?: string
}

export default class extends Component<Props> {
    static template = template;

    static defaults() {
        return {
            expandedKeys: ['2', '2-1'],
            keywords: '',
            data: [
                {
                    label: 'First floor-1',
                    key: '1',
                    children: [
                        {
                            label: 'Second floor-1.1',
                            key: '1-1',
                            children: [
                                {
                                    label: 'Third floor-1.1.1',
                                    key: '1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'First floor-2',
                    key: '2',
                    children: [
                        {
                            label: 'Second floor-2.1',
                            key: '2-1',
                            children: [
                                {
                                    label: 'Third floor-2.1.1',
                                    key: '2-1-1' 
                                },
                                {
                                    label: 'Third floor-2.1.2',
                                    key: '2-1-2'
                                }
                            ]
                        },
                        {
                            label: 'Second floor-2.2',
                            disabled: true,
                            key: '2-2',
                            children: [
                                {
                                    label: 'Third floor-2.2.1',
                                    key: '2-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    @bind
    filter(data: TreeDataItem<string>) {
        const keywords = this.get('keywords');
        if (!keywords) return true;
        return (data.label as string).toLowerCase().includes(keywords.trim().toLowerCase());
    }
}
```

