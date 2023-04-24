import {injectGlobal} from '@emotion/css';
import eot from './iconfont.eot';
import woff from './ionicons.woff';
import ttf from './iconfont.ttf';
import svg from './iconfont.svg';

injectGlobal`
    @font-face {
      font-family: "kpc-font";
      src: url('${eot}'); /* IE9 */
      src: url('${eot}#iefix') format('embedded-opentype'), /* IE6-IE8 */
     url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
      url('${woff}') format('woff'),
      url('${ttf}') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('${svg}#kpc-font') format('svg'); /* iOS 4.1- */
    }

    .k-icon {
      font-family: "kpc-font";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .k-icon-clone:before {
      content: "\\e9b6";
    }
    
    .k-icon-information-fill:before {
      content: "\\e9b1";
    }
    
    .k-icon-warning-fill:before {
      content: "\\e9b2";
    }
    
    .k-icon-success-fill:before {
      content: "\\e9b3";
    }
    
    .k-icon-error-fill:before {
      content: "\\e9b4";
    }
    
    .k-icon-question-fill:before {
      content: "\\e9b5";
    }
    
    .k-icon-information:before {
      content: "\\e9b0";
    }
    
    .k-icon-cloud:before {
      content: "\\e9ac";
    }
    
    .k-icon-pin:before {
      content: "\\e9ad";
    }
    
    .k-icon-home:before {
      content: "\\e9ae";
    }
    
    .k-icon-cut:before {
      content: "\\e9af";
    }
    
    .k-icon-servers:before {
      content: "\\e99a";
    }
    
    .k-icon-internet:before {
      content: "\\e99b";
    }
    
    .k-icon-mail:before {
      content: "\\e99c";
    }
    
    .k-icon-paper:before {
      content: "\\e99d";
    }
    
    .k-icon-phone:before {
      content: "\\e99e";
    }
    
    .k-icon-panel:before {
      content: "\\e99f";
    }
    
    .k-icon-alarm:before {
      content: "\\e9a0";
    }
    
    .k-icon-notification-outline:before {
      content: "\\e9a1";
    }
    
    .k-icon-earphone:before {
      content: "\\e9a2";
    }
    
    .k-icon-settings-horizontal:before {
      content: "\\e9a3";
    }
    
    .k-icon-message:before {
      content: "\\e9a4";
    }
    
    .k-icon-heart-outline:before {
      content: "\\e9a5";
    }
    
    .k-icon-return-right:before {
      content: "\\e9a6";
    }
    
    .k-icon-picture:before {
      content: "\\e9a7";
    }
    
    .k-icon-logout:before {
      content: "\\e9a8";
    }
    
    .k-icon-all:before {
      content: "\\e9a9";
    }
    
    .k-icon-drag:before {
      content: "\\e9aa";
    }
    
    .k-icon-settings-vertical:before {
      content: "\\e9ab";
    }
    
    .k-icon-more:before {
      content: "\\e97d";
    }
    
    .k-icon-more-circled:before {
      content: "\\e988";
    }
    
    .k-icon-folder:before {
      content: "\\e994";
    }
    
    .k-icon-unlock:before {
      content: "\\e995";
    }
    
    .k-icon-user:before {
      content: "\\e996";
    }
    
    .k-icon-folder-open:before {
      content: "\\e997";
    }
    
    .k-icon-lock:before {
      content: "\\e998";
    }
    
    .k-icon-users:before {
      content: "\\e999";
    }
    
    .k-icon-edit:before {
      content: "\\e98e";
    }
    
    .k-icon-location:before {
      content: "\\e98f";
    }
    
    .k-icon-delete:before {
      content: "\\e990";
    }
    
    .k-icon-edit2:before {
      content: "\\e991";
    }
    
    .k-icon-settings:before {
      content: "\\e992";
    }
    
    .k-icon-calendar:before {
      content: "\\e993";
    }
    
    .k-icon-search:before {
      content: "\\e97e";
    }
    
    .k-icon-alert:before {
      content: "\\e97f";
    }
    
    .k-icon-question:before {
      content: "\\e980";
    }
    
    .k-icon-zoom-in:before {
      content: "\\e981";
    }
    
    .k-icon-zoom-out:before {
      content: "\\e982";
    }
    
    .k-icon-fault-outline:before {
      content: "\\e983";
    }
    
    .k-icon-truth-circled:before {
      content: "\\e984";
    }
    
    .k-icon-hide:before {
      content: "\\e985";
    }
    
    .k-icon-visible:before {
      content: "\\e986";
    }
    
    .k-icon-time:before {
      content: "\\e987";
    }
    
    .k-icon-refresh:before {
      content: "\\e989";
    }
    
    .k-icon-batchsearch:before {
      content: "\\e98a";
    }
    
    .k-icon-refresh2:before {
      content: "\\e98b";
    }
    
    .k-icon-upload:before {
      content: "\\e98c";
    }
    
    .k-icon-download:before {
      content: "\\e98d";
    }
    
    .k-icon-left-squared:before {
      content: "\\e975";
    }
    
    .k-icon-right-squared:before {
      content: "\\e976";
    }
    
    .k-icon-down-squared:before {
      content: "\\e977";
    }
    
    .k-icon-up-squared:before {
      content: "\\e978";
    }
    
    .k-icon-arrow-right-circled:before {
      content: "\\e979";
    }
    
    .k-icon-arrow-down-circled:before {
      content: "\\e97a";
    }
    
    .k-icon-arrow-left-circled:before {
      content: "\\e97b";
    }
    
    .k-icon-arrow-up-circled:before {
      content: "\\e97c";
    }
    
    .k-icon-arrow-bigup:before {
      content: "\\e962";
    }
    
    .k-icon-arrow-bigleft:before {
      content: "\\e963";
    }
    
    .k-icon-arrow-down:before {
      content: "\\e964";
    }
    
    .k-icon-arrow-bigright:before {
      content: "\\e965";
    }
    
    .k-icon-arrow-right:before {
      content: "\\e966";
    }
    
    .k-icon-sortfill:before {
      content: "\\e967";
    }
    
    .k-icon-arrow-left:before {
      content: "\\e968";
    }
    
    .k-icon-arrow-up:before {
      content: "\\e969";
    }
    
    .k-icon-arrow-bigdown:before {
      content: "\\e96a";
    }
    
    .k-icon-sort:before {
      content: "\\e96b";
    }
    
    .k-icon-sortbig:before {
      content: "\\e96c";
    }
    
    .k-icon-truth:before {
      content: "\\e96d";
    }
    
    .k-icon-check:before {
      content: "\\e96e";
    }
    
    .k-icon-closebig:before {
      content: "\\e96f";
    }
    
    .k-icon-add-samll:before {
      content: "\\e970";
    }
    
    .k-icon-minus:before {
      content: "\\e971";
    }
    
    .k-icon-close:before {
      content: "\\e972";
    }
    
    .k-icon-minussmall:before {
      content: "\\e973";
    }
    
    .k-icon-add-big:before {
      content: "\\e974";
    }
`;

