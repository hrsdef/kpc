import {css} from '@emotion/css';
import global, {mainBlock, fullfill, center} from '../../../styles/default';
import {theme} from 'kpc/styles/theme';

export function makeStyles(themeColor: string) {
    return css`
        background: #ffffff;
		${mainBlock(544)};
        .white-card {
            transition: box-shadow ${theme.transition.middle};
            &:hover {
                box-shadow: ${global.cardBoxShadow};
            }
        }
		.resource-img-box img {
			width: 170px;
		}
		.new-fn-box {
			.title-box {
				margin-top: 34px;
				& > div {
					text-align: center;
				}
				& > div:first-child {
					font-weight: 600;
					font-size: 24px;
					color: #000;
					line-height: 34px;
				}
				& > div:last-child {
					font-size: 16px;
					color: #7A7A7A;
					line-height: 22px;
					margin-top: 12px;
				}   
			}
			.card-wrapper {
				position: relative;
				height: 355px;
				margin-top: 42px;
				
				& > div:first-child {
					overflow: hidden;
					height: 100%;
					position: relative;
					width: 1220px;
					margin-left: -10px;
					.card-box {
						margin-left: 10px;
						padding: 10px 0;
						left: 0;
						top: 0;
						position: absolute;
						height: 100%;
						white-space: nowrap;
						display: inline-block;	
						transition: left .5s ease-out;
						& > div {
							height: 335px;
						}
					}
				}

				.resource-box {
					${fullfill()}
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: #4B4B4B;
					font-size: 16px;
					img {
						cursor: pointer;
					}
					.comp-download {
						img {
							border-radius: 8px;
							width: 48px;
							height: 48px;
							transition: box-shadow ${theme.transition.middle};
						}
						img:hover {
							box-shadow: ${global.cardBoxShadow};
						}
					}
					& > div {
						background: #FFFFFF;
						border-radius: 8px;
						height: 80px;
						display: flex;
						align-items: center;
						padding: 0 22px;
                        gap: 10px;
						& > div:first-child {
							flex-grow: 1;
						}
						& > div:last-child {
							width: 182px;
							display: flex;
							align-items: center;
						}
					}
					& > div:first-child {
						& > div:last-child {
							justify-content: space-between;
						}
					}
				}
				
				.component-box {
					${fullfill()}
					background: #FFFFFF;
					border-radius: 8px;
					position: relative;
					& > .k-btn {
						position: absolute;
						transition: color .25s linear;
						right: 10px;
						top: 5px;
						color: #818181;
						font-size: 12px;
						.k-icon {
							color: #0191EA;
							height: 20px;
						}
						display: flex;
						align-items: center;
					}
					& > .k-btn:hover {
						color: ${themeColor};
					}
					.comp-content {
						${fullfill()}
						padding: 35px 47px;
						.switch-box {
							padding-left: 40px;
							padding-top: 8px;
						}
						.comp-list-btn {
                            margin-right: 20px;
						}
						.select-box {
							.k-select {
								width: 170px;
								height: 40px;
							}
						}
						.input-box {
							.k-input, .k-input-inner {
								width: 170px;
								height: 40px;
							}
						}
						.menu-tree-box {
							height: 124px;
							display: flex;
							margin-top: 10px;
							& > div {
								height: 100%;
							}
							.tree-box {
								border: 1px solid #DCDCDC;
								background: #F9F9F9;
								padding: 10px 5px;
								margin-right: 9px;
								height: 124px;
								width: 170px;
							}
							.menu-box {
								margin-left: 9px;
								border: 1px solid #DCDCDC;
								overflow: hidden;
								height: 124px;
								width: 170px;
							}
							.k-tree {
								border: none;
							}
							.k-tree-label {
								margin: 2px 0;
							}
							.k-tree-text {
								color: #595959;
							}
							.k-menu-name {
								font-size: 12px;
							}
							.k-menu-item:not(.k-active) {
								.k-menu-name {
									color: #868686;
								}
							}
							.k-tree-text:first-child {
								color: red;
							}
							
							.k-tree-label, .k-tree-node, .k-menu {
								background: #F9F9F9;
							}
							.k-menu-header {
								height: 28px;
							}
							.k-menu-item, .k-menu-title {
								height: 32px;
							}
						}
						.rate-box, .radio-box {
							padding-left: 20px;
						}
						.rate-box {
							padding-top: 2px;
						}
						.slider-radio-box {
							margin-top: 15px;
						}
						.select-input {
							margin-top: 5px;
						}

						& > div {
							height: 60px;
							width: 100%;
							display: flex;
							align-items: center;
							.comp-item {
								height: 100%;
								flex-grow: 1;
							}
						}
						.input-select {
							.k-select, .k-input {
								width: 170px;
								height: 40px;
							}	
							.k-input-inner {
								height: 40px;
							}
						}
						.k-datepicker {
							width: 170px;
						}
						.k-editable {
							.k-input {
								width: 170px;
							}
						}
					}
				}

				.animate-box {
					display: flex;
					justify-content: space-between;
					height: 100%;
					.animate-left {
						background: #ffffff;
						border-radius: 8px;
					}
					& > div {
						height: 100%;
					}
					.animate-left {
						width: 176px;
						overflow: hidden;
					}
					.animate-right {
						background: #ffffff;
						border-radius: 8px;
						width: 300px;
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						& > div {
							padding-left: 19px;
							padding-right: 15px;
						}
						& > div:first-child {
							font-size: 14px;
							color: #4F4F4F;
							height: 57px;
							display: flex;
							align-items: center;
							.animate-title {
								flex-grow: 1;
							}
							& > div:last-child {
								width: 160px;
							}
						}
						& > div:last-child {
							height: 100px;
							display: flex;
							margin-bottom: 12px;
							flex-direction: column;
						}
						.tab-content {
							flex-grow: 1;
							background: #F5F5F9;
							& > div {
								${center()};
								${fullfill()};
								overflow: hidden;
								.k-btn {
									margin: 0 8px;
									width: 80px;
								}
								.tab-text {
									width: 224px;
									white-space: pre-wrap;
								}
							}
						}
						.k-select {
							border-color: #F0F4FA;
							background: #F0F4FA;
						}
						.k-tabs {
							border: none;
							.k-tabs-scroll {
								display: flex;
								justify-content: center;
							}
						}
						
					}
				}
				
				.arrow-btn {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}

				.next-arrow {
					right: -60px;
				}

				.prev-arrow {
					left: -60px;
				}
			}
		}


        @media (max-width: 768px) {
            display: block;
            padding: 0 20px;
            height: auto;
			.k-none:hover,
			.k-none:active,
			.k-none:focus {
				background: transparent !important;
			}
			.k-none {
				-webkit-tap-highlight-color: transparent;
			}
			.resource-img-box img {
				width: 140px;
			}
			.comp-menu-box {
				margin-top: 5px;
			}
            .new-fn-box {
                width: auto !important;
                .card-wrapper {
                    height: auto;
                    > div:first-child {
                        width: 100%;
                        .card-box {
                            position: relative;
                            display: block;
                            > div {
                                height: auto;
                            }
                        }
                    }
                    .resource-box {
                        gap: 12px;
                    }
                    .component-box {
                        .comp-content {
                            padding: 35px 12px 12px;
                            .select-box {
                                .k-select {
                                    width: 60px;
                                }
                            }
                            .slider-radio-box {
                                flex-direction: column;
                                gap: 10px;
                                margin: 0 0 15px;
                                align-items: start;
                            }
                            .radio-box {
                                padding-left: 0;
                            }
                        }
						.h5-swap-btn {
							color: #0091ea;
						}
                    }
                    .animate-box {
                        display: block;
                        .animate-left {
                            width: auto;
                            height: 176px;
                        }
                        .animate-right {
                            width: auto;
                            margin-top: 12px;
                        }
                    }
                }
                .arrow-btn {
                    display: none;
                }
            }
        }
    `
}
