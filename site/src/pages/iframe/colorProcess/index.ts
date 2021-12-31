import {Component, TypeDefs, createRef} from 'intact';
import template from './index.vdt';
import {setTheme} from 'kpc';
import {bind} from 'components/utils';
import {Layout} from 'kpc';
import { deepExtends } from 'styles/utils';

type BgThemeType = 'light' | 'dark';
export type BgThemeValue = {
    bgColor: string
    cardBgColor: string
    menuColor: string
    cardTextColor: string
}
interface BgTheme {
    dark: BgThemeValue
    light: BgThemeValue
}

type ThemeType = 'New Era' | 'Ocean' | 'Techno' | 'burset 62';
export type ThemeValue = {
    mainColor: string
    textColor: string
    collectionsColor: string
}
interface Theme {
    [index: string]: ThemeValue
}

interface ColorProcessProps {
    asideWidth: number
    headerHeight: number
    bgTheme: BgTheme
    curBgTheme: BgThemeType
    theme: Theme
    curTheme: ThemeType
}

const typeDefs: Required<TypeDefs<ColorProcessProps>> = {
    asideWidth: Number,  
    headerHeight: Number,
    bgTheme: Object,
    curBgTheme: String,
    theme: Object,
    curTheme: String
};

const defaults = (): Partial<ColorProcessProps> => ({
    asideWidth: 350,
    headerHeight: 100,
    bgTheme: {
        dark: {
            bgColor: '#000000',
            cardBgColor: '#3D3D3D',
            menuColor: '#202020',
            cardTextColor: '#ffffff'
        },
        light: {
            bgColor: '#E9E9E9',
            cardBgColor: '#FFFFFF',
            menuColor: '#FFFFFF',
            cardTextColor: '#000000'
        }
    },
    curBgTheme: 'dark',

    theme: {
        'New Era': {
            mainColor: '#6E64E0',
            textColor: '#ffffff',
            collectionsColor: '#ffffff'
        },
        'Ocean': {
            mainColor: '#258AE8',
            textColor: '#ffffff',
            collectionsColor: '#ffffff'
        },
        'Techno': {
            mainColor: '#25E8D0',
            textColor: '#000000',
            collectionsColor: '#000000'
        },
        'burset 62': {
            mainColor: 'linear-gradient(165.2deg, #E83025 10.45%, #FF7A00 78.4%)',
            textColor: '#000000',
            collectionsColor: '#000000'
        }
    },
    curTheme: 'New Era'
});

export default class extends Component<ColorProcessProps> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;

    private layoutRef = createRef<Layout>()

    init() {
        (window as any).setValue = (target?: {bgTheme: BgThemeType, theme: ThemeType}) => {
            if(target) {
                this.set('curBgTheme', target.bgTheme)
                this.setColor(target.theme)
            }
        }
    }

    getDefaultProps() {
        const themeMap = this.get('theme');
        const curTheme = themeMap[this.get('curTheme')];
        const curBgTheme = this.get('bgTheme')[this.get('curBgTheme')];

        return {
            button: {
                borderRadius: `20px`
            },
            menu: {
                bgColor: curBgTheme.menuColor,
                fontSize: '32px',
                item: {
                    height: '69px',
                    hoverColor: curTheme.textColor,
                    activeBgColor: curTheme.mainColor
                }
            },
            layout: {
                bgColor: curTheme.mainColor
            }
        };
    }

    setThemeViaProps() {
        // set style via props
        this.setValue(this.getDefaultProps());
    }

    setColor(themeName: string) {
        this.set('curTheme', <ThemeType>themeName);
        this.setThemeViaProps();
    }

    setValue(theme?: any) {
        setTheme(theme)
        this.layoutRef!.value?.forceUpdate()
    }

    @bind
    light() {
        this.set('curBgTheme', 'light')
        this.setThemeViaProps()
    }

    @bind
    dark() {
        this.set('curBgTheme', 'dark')
        this.setThemeViaProps()
    }

    mounted() {
        this.setColor(this.get('curTheme'))
    }
}
