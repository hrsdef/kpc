---
title: 图标按钮
order: 1
---

给`Button`添加`icon`属性，可以展示图标按钮。图标按钮仅仅是使按钮的宽高相等，
此时你可以将任意图标元素作为它的子元素。`circle`属性可以展示圆形图标。如果
你不需要宽高相等的图标按钮，而仅仅是带图标的文字按钮，去掉`icon`属性即可。

```vdt
import {Button, Icon} from 'kpc';

<div>
    <Button icon><Icon class="k-icon-search" /></Button>
    <Button icon circle><Icon class="k-icon-search" /></Button>
    <Button icon circle type="none"><Icon class="k-icon-search" /></Button>
    <Button icon circle type="flat"><Icon class="k-icon-search" /></Button>
    <Button type="danger" size="large" icon circle><Icon class="k-icon-search" size="large" /></Button>
    <Button type="primary"><Icon class="k-icon-search" size="small" />搜索</Button>
    <Button circle type='primary'><Icon class="k-icon-search" size="small" />搜索</Button>
</div>
```

```styl
.k-btn
    margin-right 20px
```
