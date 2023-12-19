import {theme, setDefault} from '../../styles/theme';
import {css} from '@emotion/css';
import '../../styles/global';
import {deepDefaults}  from '../../styles/utils';
import { cache } from '../utils';

export type Mode = 'horizontal' | 'vertical';

export const kls = (className: string, k: string): string => `${k}-split-${className}`;

const defaults = {
    splitLineSize: '6px',
    dragLinesSize: '1px',
    dragLinesCount: 5,
    dragLiensGutter: 5,
    get bgColor() { return theme.color.bg },
    get baseBorder() { return `1px solid ${theme.color.border}` },
    get transition() { return theme.transition.middle },
    get boderColor() { return theme.color.border },
    get dragLineMargin(): string {
        return `-${split.dragLinesCount * (split.dragLiensGutter + 1) / 2}px`;
    },
    boxShadow(direction: Mode) {
        let i = 1;
        let tmp = [];
        while(i <= split.dragLinesCount) {
            const shadowVal = direction === 'horizontal'
                ? `0 ${i * split.dragLiensGutter}px 0 0`
                : `${i * split.dragLiensGutter}px 0 0 0`;
            tmp.push(`${shadowVal} ${split.boderColor}`);
            i++;
        }
        
        return `${tmp.join(',')}`;
    }
};

let split: typeof defaults;
setDefault(() => {
    split = deepDefaults(theme, {split: defaults}).split;
    makeStyles?.clearCache();
});

export const makeStyles = cache(function makeStyles(k: string) {
    return css`
        display: flex;
        height: 100%;

        & > .${kls('first', k)},
        & > .${kls('last', k)} {
            overflow: auto;
            position: relative;
        }

        & > .${kls('first', k)} {
            flex: 0 0 auto;
        }

        & > .${kls('last', k)} {
            flex: auto;
        }

        &.${k}-first-auto {
            & > .${kls('first', k)} {
                flex: auto;
            }
            & > .${kls('last', k)} {
                flex: 0 0 auto;
            }
        }

        &:not(.${k}-resizing) {
            & > .${kls('first', k)},
            & > .${kls('last', k)} {
                transition: all ${split.transition};
            }
        }

        & > .${kls('line-wrapper', k)} {
            flex: 0 0 auto;
            text-align: center;
            overflow: hidden;
            .${kls('line', k)} {
                height: 100%;
                background: ${split.bgColor};
                position: relative;
            }
            .${kls('drag-lines', k)} {
                background: ${split.boderColor};
                position: absolute;
            }
        }

        &.${k}-horizontal {
            & > .${kls('line-wrapper', k)} {
                cursor: col-resize;
                width: ${split.splitLineSize};
                .${kls('line', k)} {
                    border-left: ${split.baseBorder};
                    border-right: ${split.baseBorder};
                }
                .${kls('drag-lines', k)} {
                    height: ${split.dragLinesSize};
                    width: 100%;
                    top: 50%;
                    margin-top: ${split.dragLineMargin};
                    box-shadow: ${split.boxShadow('horizontal')};
                }
            }
        }

        &.${k}-vertical {
            flex-direction: column;
            & > .${kls('line-wrapper', k)} {
                cursor: row-resize;
                height: ${split.splitLineSize};
                .${kls('line', k)} {
                    border-top: ${split.baseBorder};
                    border-bottom: ${split.baseBorder};
                }
                .${kls('drag-lines', k)} {
                    width: ${split.dragLinesSize};
                    height: 100%;
                    left: 50%;
                    margin-left: ${split.dragLineMargin};
                    box-shadow: ${split.boxShadow('vertical')};
                }
            }
        }
    `;
});
