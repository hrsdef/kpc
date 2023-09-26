import {mount, unmount, dispatchEvent, getElement, wait} from '../../test/utils';
import {Component} from 'intact';
import {Dropdown, DropdownMenu, DropdownItem} from '../dropdown';
import BasicDemo from '~/components/dropdown/demos/basic';
import NestedDemo from '~/components/dropdown/demos/nested';
import ContextMenuDemo from '~/components/dropdown/demos/contextmenu';
import TooltipDemo from '~/components/dropdown/demos/tooltip'; 

describe('Dropdown', () => {
    afterEach((done) => {
        unmount();
        setTimeout(done, 500);
    });

    // it('demos test', () => {
        // const req = require.context('~/components/dropdown/demos', true, /^((?!async).)*index\.js$/i);
        // req.keys().forEach(item => {
            // if (item.includes('contextmenu')) return;
            // const Demo = req(item).default;
            // const i = mount(Demo);

            // dispatchEvent(i.element.querySelector('.k-btn') || i.element, 'click');
            // if (item.includes('disabled')) {
                // expect(getElement('.k-dropdown-menu')).to.be.undefined;
            // } else {
                // expect(getElement('.k-dropdown-menu').innerHTML).to.matchSnapshot();
            // }
            // unmount(i);
        // });
    // });

    it('should save original events', async () => {
        const click = sinon.spy();
        class Demo extends Component {
            static template = `
                const {Dropdown, DropdownItem, DropdownMenu} = this;
                <div>
                    <Dropdown>
                        <div ref="test" ev-click={this.click}>click</div>
                        <DropdownMenu>
                            <DropdownItem>test</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            `;

            private Dropdown = Dropdown;
            private DropdownItem = DropdownItem;
            private DropdownMenu = DropdownMenu;

            click() {
                click();
            }
        }
        const [instance, element] = mount(Demo);
        instance.refs.test.click();
        expect(click.callCount).to.eql(1);
        await wait();
        expect(getElement('.k-dropdown-menu')!.innerHTML).to.matchSnapshot();
    });

    it('should move mouse to dropdown menu', async () => {
        const [instance, element] = mount(BasicDemo);

        dispatchEvent(element.firstElementChild!, 'mouseenter');
        await wait();
        const dropdown = getElement('.k-dropdown-menu')!;
        expect(dropdown.innerHTML).to.matchSnapshot();

        dispatchEvent(element.firstElementChild!, 'mouseleave');
        dispatchEvent(dropdown, 'mouseenter');
        await wait(500);
        expect(dropdown.parentNode).to.exist;
    });

    it('nested dropdown', async function() {
        this.timeout(0);
        const [instance, element] = mount(NestedDemo);

        (element.firstElementChild as HTMLElement).click();
        await wait();
        const dropdown = getElement('.k-dropdown-menu')!;
        const [, , , hoverItem, clickItem] = dropdown.querySelectorAll<HTMLElement>(':scope > .k-dropdown-item');
        clickItem.click();
        await wait(500);
        const clickSubDropdown = getElement('.k-dropdown-menu')!;
        expect(clickSubDropdown.innerHTML).to.matchSnapshot();

        // should hide last sub-dropdown and show next
        dispatchEvent(hoverItem, 'mouseenter');
        await wait(500);
        const hoverSubDropdown = getElement('.k-dropdown-menu')!;
        expect(hoverSubDropdown.innerHTML).to.matchSnapshot();

        const [hoverItem1] = hoverSubDropdown.querySelectorAll<HTMLElement>('.k-dropdown-item');
        dispatchEvent(hoverItem, 'mouseleave');
        dispatchEvent(hoverItem1, 'mouseenter');
        await wait(500);
        const hoverSubDropdown1 = getElement('.k-dropdown-menu')!;
        expect(hoverSubDropdown1.textContent).to.eql('item 1item 2');

        const [hoverItem2] = hoverSubDropdown1.querySelectorAll<HTMLElement>('.k-dropdown-item');
        dispatchEvent(hoverItem1, 'mouseleave');
        dispatchEvent(hoverItem2, 'mouseenter');
        await wait(1000);
        const hoverSubDropdown2 = getElement('.k-dropdown-menu')!;
        expect(hoverSubDropdown2 === hoverSubDropdown1).to.be.true;
    });

    it('hide on click document', async () => {
        const [instance, element] = mount(BasicDemo);

        dispatchEvent(element.firstElementChild!, 'mouseenter');
        await wait();
        dispatchEvent(document, 'click');

        await wait(500);
        expect(getElement('.k-dropdown-menu')).not.exist;
    });

    it('operate by keyboard', async () => {
        const [instance, element] = mount(NestedDemo);

        dispatchEvent(element.firstElementChild!, 'click');
        await wait();
        const dropdown = getElement('.k-dropdown-menu')!;

        // down
        dispatchEvent(document, 'keydown', {keyCode: 40});
        await wait();
        expect(dropdown.innerHTML).to.matchSnapshot();

        // up
        dispatchEvent(document, 'keydown', {keyCode: 38});
        await wait();
        expect(dropdown.innerHTML).to.matchSnapshot();

        // up and enter
        dispatchEvent(document, 'keydown', {keyCode: 38});
        dispatchEvent(document, 'keydown', {keyCode: 13});
        await wait();
        const subDropdown = getElement('.k-dropdown-menu')!;
        expect(subDropdown.innerHTML).to.matchSnapshot();

        // right
        dispatchEvent(document, 'keydown', {keyCode: 39});
        await wait();
        const subDropdown1 = getElement('.k-dropdown-menu')!;
        expect(subDropdown1.innerHTML).to.matchSnapshot();

        // left
        dispatchEvent(document, 'keydown', {keyCode: 37});
        await wait(500);
        expect(subDropdown1.style.display).to.eql('none');

        // down in sub-menu
        dispatchEvent(document, 'keydown', {keyCode: 40});
        await wait();
        expect(subDropdown.innerHTML).to.matchSnapshot();

        // select and hide
        dispatchEvent(document, 'keydown', {keyCode: 13});
        await wait(500);
        expect(getElement('.k-dropdown-menu')).not.exist;
    });

    it('context menu', async () => {
        const [instance, element] = mount(ContextMenuDemo);

        dispatchEvent(element, 'contextmenu', {pageX: 10, pageY: 10});
        await wait();
        const dropdown = getElement('.k-dropdown-menu')!;
        expect(dropdown.style.left).to.eql('10px');
        dispatchEvent(element, 'contextmenu', {pageX: 11, pageY: 11});
        await wait();
        expect(dropdown.style.left).to.eql('11px');
        await wait(500);
        expect(dropdown.style.display).to.eql('');
    });

    it('click mouse and move outside should not hide menu', async () => {
        const [instance, element] = mount(NestedDemo);

        (element.firstChild as HTMLElement).click();
        await wait();
        const dropdown = getElement('.k-dropdown-menu')!;
        dispatchEvent(dropdown, 'mousedown');
        dispatchEvent(document, 'mouseup');
        dispatchEvent(document, 'click');
        await wait(500);
        expect(dropdown.style.display).to.eql('');

        // on submenu
        const [, , , hoverItem, clickItem] = dropdown.querySelectorAll<HTMLElement>(':scope > .k-dropdown-item');
        clickItem.click();
        await wait();
        const clickSubDropdown = getElement('.k-dropdown-menu')!;
        dispatchEvent(clickSubDropdown, 'mousedown');
        dispatchEvent(document, 'mouseup');
        dispatchEvent(document, 'click');
        await wait(500);
        expect(dropdown.style.display).to.eql('');
        expect(clickSubDropdown.style.display).to.eql('');

        // should hide on click document directly
        dispatchEvent(document, 'click');
        await wait(500);
        expect(getElement('.k-dropdown-menu')).to.be.undefined;
    });

    it('should throw error if has whitespace between real elements', async () => {
        class Demo extends Component {
            static template = `
                const {Dropdown, DropdownMenu, DropdownItem} = this;
                <div>
                    <Dropdown>
                        {''}
                        <div ref="trigger">hover</div>
                        {''}
                        <DropdownMenu>
                            <DropdownItem>test</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            `;
            private Dropdown = Dropdown;
            private DropdownItem = DropdownItem;
            private DropdownMenu = DropdownMenu;
        }
        expect(() => mount(Demo)).to.throw;
    });

    // it('should hydrate dropdown correctly', () => {
        // class Demo extends Component {
            // static template = `
                // const {Dropdown, DropdownMenu, DropdownItem} = this;
                // <div>
                    // <Dropdown>
                        // <div ref="trigger">hover</div>
                        // <DropdownMenu>
                            // <DropdownItem>test</DropdownItem>
                        // </DropdownMenu>
                    // </Dropdown>
                // </div>
            // `;
            // private Dropdown = Dropdown;
            // private DropdownItem = DropdownItem;
            // private DropdownMenu = DropdownMenu;
        // }

        // const demo = new Demo();
        // const html = demo.toString();
        // expect(html).to.eql('<div><div _evHasSaved>hover</div><!--placeholder--></div>');

        // const container = document.createElement('div');
        // container.innerHTML = html;
        // document.body.appendChild(container);
        // Intact.hydrate(demo, container);

        // dispatchEvent(demo.refs.trigger, 'click');
        // expect(getElement('.k-dropdown-menu').innerHTML.trim()).to.eql('<div class="k-item">test</div>');

        // demo.destroy();
        // document.body.removeChild(container);
    // });

    it('should scroll to view when we focus on DropdownItem', async () => {
        class Demo extends Component {
            static template = `
                const {Dropdown, DropdownMenu, DropdownItem} = this;
                <div>
                    <Dropdown>
                        <div ref="trigger">hover</div>
                        <DropdownMenu>
                            <div style="height: 40px; overflow: auto;">
                                <DropdownItem>test1</DropdownItem>
                                <DropdownItem>test2</DropdownItem>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            `;
            private Dropdown = Dropdown;
            private DropdownItem = DropdownItem;
            private DropdownMenu = DropdownMenu;
        }
        const [instance, element] = mount(Demo);

        dispatchEvent(instance.refs.trigger, 'mouseenter');
        await wait(500);

        const dropdown = getElement('.k-dropdown-menu')!;
        const [, item] = dropdown.querySelectorAll<HTMLElement>('.k-dropdown-item');
        const parent = item.parentNode as HTMLElement;
        dispatchEvent(item, 'mouseenter');
        await wait();
        expect(parent.scrollTop).to.eql(item.offsetHeight * 2 - 40);
    });

    it('focus trigger type', async () => {
        class Demo extends Component {
            static template = `
                const {Dropdown, DropdownMenu, DropdownItem} = this;
                <div>
                    <Dropdown trigger="focus">
                        <input ref="trigger" ev-focusin={this.onFocus} />
                        <DropdownMenu>
                            <DropdownItem>test1</DropdownItem>
                            <DropdownItem>test2</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            `;
            private Dropdown = Dropdown;
            private DropdownItem = DropdownItem;
            private DropdownMenu = DropdownMenu;
            public onFocus = sinon.spy((e: MouseEvent) => console.log(e));
        }
        const [instance] = mount(Demo);

        dispatchEvent(instance.refs.trigger, 'focusin');
        await wait(500);
        expect(getElement('.k-dropdown-menu')).to.be.exist;
        expect(instance.onFocus.callCount).to.eql(1);

        // clicking anywhere should not hide menu
        dispatchEvent(document, 'click');
        await wait(500);
        expect(getElement('.k-dropdown-menu')).to.be.exist;

        dispatchEvent(instance.refs.trigger, 'focusout');
        await wait(700);
        expect(getElement('.k-dropdown-menu')).to.not.be.exist;
    });

    it('wrap by tooltip', async () => {
        const [instance, element] = mount(TooltipDemo);

        dispatchEvent(element.firstChild as HTMLElement, 'mouseenter');
        await wait();
        const dropdown = getElement('.k-dropdown-menu')!;
        const [item1, item2, item3, item4] = dropdown.querySelectorAll('.k-dropdown-item');

        dispatchEvent(item1, 'mouseenter');
        await wait();
        expect(getElement('.k-tooltip-content')!.textContent).to.eql('item 1')

        dispatchEvent(item1, 'mouseleave');
        dispatchEvent(item3, 'mouseenter');
        await wait();
        expect(getElement('.k-tooltip-content')!.textContent).to.eql('disabled')

        dispatchEvent(item3, 'mouseleave');
        dispatchEvent(item4, 'mouseenter');
        await wait();
        expect(getElement('.k-tooltip-content')!.textContent).to.eql('This is a nested Dropdown.');

        dispatchEvent(item4, 'click');
        await wait();
        expect(getElement('.k-dropdown-menu')!.textContent).to.eql('item 1item 2');

        dispatchEvent(item4, 'mouseleave');
        await wait(800);
        expect(getElement('.k-dropdown-menu')).to.not.be.exist;
    });
});