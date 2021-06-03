import {
    Component,
    TypeDefs,
    createVNode as h,
    VNode,
    VNodeComponentClass,
    normalizeChildren,
    directClone,
    provide,
    inject,
    findDomFromVNode,
} from 'intact';
import template from './index.vdt';
import {bind} from '../utils';
import {EMPTY_OBJ, isFunction} from 'intact-shared';
import {Options, position, Feedback} from '../position';
import {cx} from '@emotion/css';
import {DropdownMenu} from './menu';
import {useDocumentClick} from '../../hooks/useDocumentClick';

export type Position = Options 

type DropdownChildren = [VNode, VNodeComponentClass<DropdownMenu>];

export const DROPDOWN = 'Dropdown';
export const ROOT_DROPDOWN = 'RootDropdown';

export interface DropdownProps {
    trigger?: 'hover' | 'click' | 'contextmenu'
    disabled?: boolean
    value?: boolean
    position?: Position
    of?: 'self' | 'parent' | Event
    container?: string | Function
}

const typeDefs: Required<TypeDefs<DropdownProps>> = {
    trigger: ['hover', 'click', 'contextmenu'],
    disabled: Boolean,
    value: Boolean,
    position: Object,
    // Event is undefined in NodeJs
    of: ['self', 'parent', typeof Event === 'undefined' ? undefined : Event],
    container: [String, Function],
};

const defaults: Partial<DropdownProps> = {
    trigger: 'hover',
    disabled: false,
    value: false,
    position: {},
    of: 'self',
};

export class Dropdown<T extends DropdownProps = DropdownProps> extends Component<DropdownProps> {
    static typeDefs = typeDefs;
    static defaults = defaults;
    static template = function(this: Dropdown) {
        const children = this.get('children');
        if (process.env.NODE_ENV !== 'production') {
            if (!Array.isArray(children) || children.length !== 2) {
                throw new Error('Dropdown must receive two children, one is a trigger and another one is DropdownMenu');
            }
        }

        const [trigger, menu] = children as DropdownChildren;
        const triggerProps = this.triggerProps = trigger.props || EMPTY_OBJ;
        const triggerType = this.get('trigger');
        const props: Record<string, Function> = {};

        if (triggerType !== 'contextmenu') {
            props['ev-click'] = this.onEnter;
            if (triggerType === 'hover') {
                props['ev-mouseenter'] = this.onEnter;
                props['ev-mouseleave'] = this.onLeave;
            }
        } else {
            props['ev-contextmenu'] = this.onContextMenu;
        }

        const clonedTrigger = directClone(trigger);
        // add a className for opening status
        let className = trigger.className || triggerProps.className;
        className = cx({
            [className]: className,
            'k-dropdown-open': this.get('value'),
        });

        clonedTrigger.props = {...triggerProps, ...props, className};
        clonedTrigger.className = className;

        this.menuVNode = menu;

        return [clonedTrigger, menu];
    };

    private timer: number | undefined = undefined;
    private triggerProps: any = null;
    public menuVNode: VNodeComponentClass<DropdownMenu> | null = null;
    public dropdown: Dropdown | null = null;

    init() {
        provide(DROPDOWN, this);
        this.dropdown = inject<Dropdown | null>(DROPDOWN, null);

        useDocumentClickForDropdown(this);

        // is root dropdown or not
        // const rootDropdown = inject(ROOT_DROPDOWN, null);
        // if (!rootDropdown) {
            // provide(ROOT_DROPDOWN, this);
        // }

        this.watch('value', (value) => {
            if (value) {
                this.trigger('show');
                // this.position();
            } else {
                this.trigger('hide');
            }
        }, {presented: true});

        (['of', 'position'] as const).forEach(item => {
            this.watch(item, () => {
                if (this.get('value')) {
                    this.position();
                }
            }, {presented: true});
        });
    }

    show() {
        if (this.get('disabled')) return;

        clearTimeout(this.timer);
        this.set('value', true);
    }

    hide(immediately: boolean = false) {
        if (this.get('disabled')) return;
        if (!this.get('value')) return;

        if (immediately) {
            this.set('value', false);
        } else {
            this.timer = window.setTimeout(() => {
                this.set('value', false);
            }, 200);
        }
    }

    @bind
    position() {
        let ofElement: HTMLElement | MouseEvent | undefined; 
        let _of = this.get('of');
        if (_of === 'parent') {
            // TODO
        } else if (_of === 'self') {
            ofElement = findDomFromVNode(this.$vNode!, true) as HTMLElement;
        } else {
            ofElement = _of as MouseEvent | undefined;
        }

        let feedback: Feedback;
        position(this.menuVNode!.children!.elementRef.value!, {
            my: 'left top+8',
            at: 'left bottom',
            ...this.get('position'),
            of: ofElement,
            using: _feedback => {
                feedback = _feedback;
            },
        });

        return feedback!;
    }

    @bind
    private onEnter(e: MouseEvent) {
        this.callOriginalCallback(e.type === 'click' ? 'ev-click' : 'ev-mouseenter', e);

        this.show();
    }

    @bind onContextMenu(e: MouseEvent) {
        this.callOriginalCallback('ev-contextmenu', e);

        e.preventDefault();
        this.set('of', e);
        this.show();
    }

    @bind 
    private onLeave(e: MouseEvent) {
        this.callOriginalCallback('ev-mouseleave', e);

        this.hide();
    }

    private callOriginalCallback(name: string, e: MouseEvent) {
        const callback = this.triggerProps[name];
        if (isFunction(callback)) callback(e);
    }
}

function useDocumentClickForDropdown(dropdown: Dropdown) {
    const elementRef = () => dropdown.menuVNode!.children!.elementRef;
    const [addDocumentClick, removeDocumentClick] = useDocumentClick(elementRef, () => {
        dropdown.hide(true);
    }, true);

    dropdown.on('show', addDocumentClick);
    dropdown.on('hide', removeDocumentClick);
}
