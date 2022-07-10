import {css} from '@emotion/css';
import footer_logo from '../../imgs/header_logo.png';
import {mainBlock} from '../../styles/default';

export function makeStyles() {
    const tableBorder = '1px solid #C4C4C4';
    const leftPadding = '16px';

    return css`
        background: #FFFFFF;
        ${mainBlock(420)};
        letter-spacing: -0.05em;
        color: #5B5A5A;
        font-size: 14px;
        .web-info {
            display: block;
        }
        .h5-info {
            display: none;
        }
        a {
            color: #5B5A5A;
            text-decoration: none;
        }
        .footer-box {
            width: 100%;
            display: flex;
            align-items: center;
        }
        .footer-table {
            width: 100%;
            height: 300px;
            border: ${tableBorder};
            .info-box {
                height: 209px;
                border-bottom: ${tableBorder}; 
            }
            .info-left {
                border-right: ${tableBorder};
                padding-left: ${leftPadding};
                padding-top: 37px;
                .title {
                    font-size: 30px;
                    color: #000000;
                    margin-bottom: 16px;
                }
                span {
                    margin-right: 50px;
                }
                .qrcode-box {
                    display: flex;
                    & > div {
                        padding-left: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                    }
                }
            }
            .info-right {
                .k-row:first-child {
                    border-bottom: ${tableBorder}; 
                }
                .k-row {
                    padding: 25px 0 0 30px;
                }
                .title {
                    color: #000000;
                }
            }
            .quick-access-box {
                height: 101px;
            }
            .link-list {
                margin-top: 15px;
                display: flex;
                & > div {
                    margin-right: 25px;
                }
            }
        }
        .copy-right-info {
            display: flex;
            align-items: center;
            padding-left: ${leftPadding};
            height: 30px;
            font-size: 12px;
        }
        .footer-logo-box {
            height: 60px;
            display: flex;
            align-items: center;
            padding-left: 16px;
            border-bottom: ${tableBorder};
            .logo {
                width: 226px;
                height: 40px;
                background-image: url(${footer_logo});
                background-size: cover;
            }
        }

        @media (max-width: 768px) {
            height: auto; 
            .web-info {
                display: none;
            }
            .h5-info {
                display: block;
            }
            .h5-footer {
                padding: 30px 20px 20px 20px;
                & > div {
                    text-align: center;
                }
                & > div:nth-child(2) {
                    margin: 20px 0;
                    font-size: 16px;
                }
                & > div:nth-child(4) {
                    margin: 16px 0 30px 0;
                    font-size: 14px;
                }
                & > div:last-child {
                    font-size: 10px;
                    color: #5B5A5A;
                    line-height: 16px;
                }
            }
            .footer-table {
                height: auto;
                .info-box {
                    height: auto;
                }
                .info-left {
                    border: none;
                    .title {
                        font-size: 24px;
                    }
                    span {
                        display: block;
                    }
                }
                .info-right {
                    .k-row {
                        padding: 20px;
                        &:first-child {
                            border: none;
                        }
                    }
                }
                .link-list {
                    gap: 20px;
                    > div {
                        margin-right: 0;
                    }
                }
            }
            .copy-right-info {
                padding: 20px;
                height: auto;
            }
        }
    `
}
