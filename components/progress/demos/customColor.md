---
title: 自定义颜色
order: 3
---

通过`color`设置进度条颜色， 类型`string` | `Array` | `Function`。

如果`color`设置为`Array`类型，它的数据格式如下：

 `{ percent: '需要设置的百分比值' , color: '对应的进度条颜色'}`

```vdt
import {Progress, Button, ButtonGroup} from 'kpc';

<div>
    <Progress percent={this.get('percent')} color={this.get('color')}/>
    <Progress percent={this.get('percent')} color={this.get('colors')}/>
    <Progress percent={this.get('percent')} color={this.setColor}/>
    <ButtonGroup>
        <Button size="mini" icon ev-click={this.minus}>-</Button>
        <Button size="mini" icon ev-click={this.add}>+</Button>
    </ButtonGroup>
</div>
```

```styl
.k-progress
    margin 10px 0
```

```ts
import {bind} from 'kpc';

interface Props {
    color: string
    colors: Color[]
    percent: number
}

type Color = {
    color: string
    percent: number
}

export default class extends Component<Props> {
    static template = template;

    static defaults() {
        return {
            color: '#ff9800',
            colors: [
                {color: '#9CD6FB', percent: 25},
                {color: '#60C2FF', percent: 50},
                {color: '#32ACF7', percent: 75},
                {color: '#0091EA', percent: 100}
            ],
            percent: 25
        }
    }

    @bind
    add() {
        if (this.get('percent') >= 100) return;

        this.set('percent', this.get('percent') + 25);
    }

    @bind
    minus() {
        if (this.get('percent') <= 0) return;

        this.set('percent', this.get('percent') - 25);
    }

    setColor(percent: number) {
        if (percent <= 50) {
            return '#D1FDD5';
        } else {
            return '#36B342';
        }
    }
}
```
