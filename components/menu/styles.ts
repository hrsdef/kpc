import {css} from '@emotion/css';
import {theme, setDefault} from '../../styles/theme';
import {deepDefaults, getLeft, palette} from '../../styles/utils';
import '../../styles/global';
import { cache } from '../utils';

const sizes = ['large', 'small'] as const;

const defaults = {
    get transition() { return theme.transition.large },
    width: '200px',
    bgColor: '#1c1c20',
    fontSize: '14px',
    get borderRadius() { return theme.borderRadius },
    get border() { return `1px solid ${theme.color.darkBorder}` },

    item: {
        height: '40px',
        padding: '0 17px',
        bodyPadding: '0 4px',
        color: '#b2b2b2',
        hoverColor: '#fff',
        get disabledColor() { return theme.color.text },
        get activeBgColor() { return theme.color.primary },
        get hoverBgColor() { return palette(theme.color.primary, 4) },
        dotFontSize: '12px'
    },

    title: {
        height: '40px',
        padding: '0 17px',
        color: '#fff',
        margin:'4px 4px 0 4px'
    },

    icon: {
        width: '16px',
        gap: '11px'
    },

    header: {
        height: '50px',
        fontSize: '14px',
        color: '#fff',
        borderBottom: '1px solid #1b1b1d',
    },

    light: {
        bgColor: '#fff',
        get border() { return `1px solid ${theme.color.disabledBg}` },
        item: {
            get color() { return theme.color.text }, 
            get hoverColor() { return theme.color.primary }, 
            get disabledColor() { return theme.color.disabled },
        },
        title: {
            get color() { return theme.color.text }, 
        },
        active: {
            get color() { return theme.color.primary },
            get bgColor() { return palette(theme.color.primary, -4) },
        }
    },

    // dropdown
    dropdown: {
        minWidth: '150px',
    },

    large: {
        width: '250px',
        get fontSize() { return menu.fontSize },
    },

    small: {
        width: '180px',
        get fontSize() { return theme.small.fontSize },
    }
};

let menu: typeof defaults;
setDefault(() => {
    menu = deepDefaults(theme, {menu: defaults}).menu;
    makeMenuStyles?.clearCache();
    makeItemStyles?.clearCache();
    makeTitleStyles?.clearCache();
    makeNestedMenuStyles?.clearCache();
});

export {menu};

export const makeMenuStyles = cache(function makeMenuStyles(k: string) {
    // we must increase the priority by adding &.${k}-menu
    // to override the css of dropdownMenu
    return css`
        &.${k}-menu {
            width: ${menu.width};
            transition: width ${menu.transition};
            background: ${menu.bgColor};
            font-size: ${menu.fontSize};
            border: 1px solid ${theme.color.disabledBg};
            position: relative;
        }

        .${k}-icon {
            width: ${menu.icon.width};
            margin-right: ${menu.icon.gap};
            text-align: center;
            flex-shrink: 0;
        }

        // header
        .${k}-menu-header {
            height: ${menu.header.height};
            padding: 0 21px;
            color: ${menu.header.color};
            font-size: ${menu.header.fontSize};
            font-weight: bold;
        }

        .${k}-menu-body {
            padding: ${menu.item.bodyPadding};
        }

        // menu title
        .${k}-menu-title {
            transition: all ${menu.transition};
            height: ${menu.title.height};
            padding: ${menu.title.padding};
            margin-top: 4px;
            border-top: ${menu.border};
            color: ${menu.title.color};
            font-weight: bold;
        }

        // menu arrow
        .${k}-menu-arrow-box {
            width: 14px;
            height: 60px;
            cursor: pointer;
            background: ${menu.bgColor};
            border-radius: 0 8px 8px 0;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 50%;
            left: calc(${menu.width} - 2px);
            transition: left ${menu.transition};
            transform: translateY(-50%);
            border: ${menu.border};
            border-left: none;
            .${k}-icon {
                margin-right: 0;
            }
        }

        // theme light
        &.${k}-light {
            background: ${menu.light.bgColor};
            .${k}-menu-header {
                color: ${menu.light.item.color};
            }
            .${k}-menu-item {
                .${k}-menu-item-title {
                    color: ${menu.light.item.color};
                    &:hover {
                        background: #f3f5f6;
                    }
                }
                &.${k}-highlighted {
                    > .${k}-menu-item-title {
                        color: ${menu.light.item.hoverColor};
                    }
                }
                &.${k}-disabled {
                    > .${k}-menu-item-title {
                        color: ${menu.light.item.disabledColor} !important;
                    }
                }
            }

            .${k}-menu-title {
                color: ${menu.light.title.color};
                border-top: ${menu.light.border};
            }
            
            .${k}-menu-arrow-box {
                background: ${menu.light.bgColor};
                border: ${menu.light.border};
                border-left: none;
            }
            .${k}-menu:not(.${k}-dropdown-menu) {
                background: ${menu.light.bgColor};
            }

            &.${k}-horizontal {
                .${k}-menu-header {
                    border-right: ${menu.light.border};
                }
                .${k}-menu-body > .${k}-menu-title {
                    border-right: ${menu.light.border};
                }
            }
            // active
            .${k}-menu-item.${k}-active {
                > .${k}-menu-item-title {
                    color: ${menu.light.active.color } !important;
                    background: ${menu.light.active.bgColor};
                }
            }
        }

        // sizes
        ${sizes.map(size => {
            const styles = menu[size];

            return css`
                &.${k}-${size} {
                    width: ${styles.width};
                    font-size: ${styles.fontSize};
                    .${k}-menu {
                        font-size: ${styles.fontSize}; 
                    }
                    .${k}-menu-arrow-box {
                        left: calc(${styles.width} - 2px); 
                    }
                }
            `;
        })}

        // collapse
        &.${k}-collapsed {
            width: calc(${menu.icon.width} + (${getLeft(menu.item.padding)} + ${getLeft(menu.item.bodyPadding)}) * 2);
            .${k}-icon {
                margin-right: 0;
            }
            .${k}-menu-item-arrow {
                display: none;
            }
        }

        // show collapse arrow
        &.${k}-collapsed-arrow {
            width: 0px;
            .${k}-menu-body {
                overflow: hidden;
                padding: 0;
            }
            // .${k}-menu-title {
            //     border-top: none;
            // }
            .${k}-menu-arrow-box {
                left: 0;
                .${k}-menu-arrow:before {
                    transform: rotateY(180deg);
                }
            }
        }

        // dropdown
        &.${k}-dropdown-menu {
            width: fit-content;
            min-width: ${menu.dropdown.minWidth};
            .${k}-menu-item-arrow {
                transform: rotate(-90deg)
            }
        }

        // horizontal
        &.${k}-horizontal {
            width: auto;
            display: flex;
            .${k}-menu-body {
                display: flex;
                align-items: center;
                .${k}-menu-title {
                    border-top: none;
                    border-right: ${menu.border};
                }
            }
        }
    `
});

export const makeTitleStyles = cache(function makeTitleStyles(k: string) {
    const item = menu.item;
    return css`
        display: flex;
        align-items: center;
        padding: ${item.padding};
        color: ${item.color};
        white-space: nowrap;
        overflow: hidden;
        flex-wrap: nowrap;
    `;
});

export const makeItemStyles = cache(function makeItemStyles(k: string) {
    const item = menu.item;
    return css`
        .${k}-menu-item-title {
            transition: all ${menu.transition};
            cursor: pointer;
            height: ${item.height};
            &:hover {
                padding: ${item.padding};
                border-radius: ${menu.borderRadius};
                background: #2a2a30;
            }
            & > .${k}-menu-item-arrow:before {
                font-size: small;
            }
        }
        .${k}-menu-name {
            flex: 1;
            display: flex;
            align-items: center;
            min-width: 0;
            span {
                overflow: hidden;
                text-overflow: ellipsis;
                min-width: 0;
            }
            .${k}-icon {
                color: inherit;
            }
        }
        .${k}-menu-item-arrow {
            margin: 0 0 0 ${menu.icon.gap};
        }

        // expanded
        &.${k}-expanded {
            > .${k}-menu-item-title {
                color: ${item.hoverColor};
                .${k}-menu-item-arrow {
                    transform: rotateX(180deg);
                }
            }
        }

        // highlighted
        &.${k}-highlighted {
            > .${k}-menu-item-title {
                color: ${item.hoverColor};
            }
        }

        // active
        &.${k}-active {
            > .${k}-menu-item-title {
                padding: ${item.padding};
                border-radius: ${menu.borderRadius};
                color: ${item.activeBgColor} !important;
                background: ${item.hoverBgColor};
            }
        }

        // disabled
        &.${k}-disabled {
            > .${k}-menu-item-title {
                color: ${item.disabledColor} !important;
                cursor: not-allowed;
            }
        }

        // dot
        .${k}-menu-dot {
            font-size: ${item.dotFontSize};
            transform: scale(.4);
        }
    `
});

export const makeNestedMenuStyles = cache(function makeNestedMenuStyles(k: string, hasIcon: boolean, parentPaddingLeft: string = getLeft(menu.item.padding)) {
    const paddingLeft = `${parentPaddingLeft}${hasIcon ? ' + ' + menu.icon.width + ' + ' + menu.icon.gap : ''}`;
    return [
        css`
            &.${k}-menu {
                position: relative;
                width: auto;
                background: ${menu.bgColor};
                border: none;
                .${k}-menu-body {
                    padding: 0;
                    .${k}-menu-item-title {
                        padding-left: calc(${paddingLeft});
                    }
                }
            }
        `,
        paddingLeft,
    ]
});
