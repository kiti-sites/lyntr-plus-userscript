// ==UserScript==
// @name         Lyntr+
// @version      1.21.2
// @github       https://github.com/kiti-sites/lyntr-plus-userscript
// @namespace    https://lyntr.com/
// @description  A toolbox for small and medium changes for lyntr.jnnj.xyz ! What is it ? -> https://youtu.be/-D2L3gHqcUA
// @author       Sylicium
// @match        https://lyntr.jnnj.xyz/*
// @icon         https://lyntr.com/favicon.ico
// @grant        none
// @downloadURL https://raw.githubusercontent.com/kiti-sites/lyntr-plus-userscript/main/production/lyntr-plus.user.js
// @updateURL https://raw.githubusercontent.com/kiti-sites/lyntr-plus-userscript/main/production/lyntr-plus.meta.js
// ==/UserScript==

(function() {
    'use strict';

    try {


    const VERSION = "1.21.2-beta"

    // Imports and general functions
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    // @deprecated - Added in vanilla version
    const copyToClipboard = (text) => { navigator.clipboard.writeText(text); setTimeout(() => {alert(`Copied to clipboard`)},100) }
    const mapObject = (obj, callback) => {
        let newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[key] = callback(key, value);
        }
        return newObj;
    }

    // Configuration
    const _CONFIG = {
        "parseMessage": {
            "description": "Parse lynts to make mentions (@user) and links clickables.",
            "enabled": true,
        },
        "parseBiography": {
            "description": "Parse biography to make mentions (@user) and links clickables.",
            "enabled": true,
            "doneClassName": "lp-messageParser-biography-UBKHJycTyOREcVCm", // DO NOT EDIT THIS LINE
        },
        "showScriptAuthor": {
            "description": "Display the author of the script in a special way",
            "enabled": true,
        },
        "showVerified": {
            "description": "Display verified users in a special way, in the specified color",
            "enabled": true,
            "usernameColor": "#d39e00", // Default #d39e00
            "enableBadgeColor": true, // Enable the badge color change
        },
        "profileButton": {
            "description": "Modify the profile button color (bottom left)",
            "enabled": true,
            "color": "#7edcfd", // Default #7edcfd
        },
        "background": {
            "description": "Modify the background of the page to a color or an image",
            "enabled": true,
            "mode": "image", // "image" or "color" Select the mode between an image or a color
            "color": "", // The color to set the background to if the mode is set to "color"
            "image": "https://i1.sndcdn.com/avatars-000631822068-abafgy-t240x240.jpg", // The image URL for the background. You have some images on the github under ./assets/images/
            "doneClassName": "lyntr-plus-background-353CpZ7e89A6nSlP", // DO NOT EDIT THIS LINE
        },
        "lyntTransparency": {
            "description": "Modify the transparency of the lynts",
            "enabled": true,
            "opacity": 0.7, // How transparent the lynts should be (0 = invisible, 1 = opaque), Default 0.7
            "overrideColor": "", // Should the color be overrided with a custom color ? If not, leave it empty. Default used #EEEBE3
            "doneClassName": "lyntr-plus-lyntTransparency-So3E25ENwU0FkobI", // DO NOT EDIT THIS LINE
        },
        "customLogo": {
            "description": "Change the Lyntr logo to a custom one",
            "enabled": true,
            "logoURL": "https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/code-assets/logo1.png", // The URL of the logo to set
            "doneClassName": "lyntr-plus-customLogo-fFbM2sneBym9kXrE", //
        }
    }


    // ---------------------------
    // DO NOT EDIT BELOW THIS LINE
    // ---------------------------


    const _VERSION_CHANGELOG_ = {
        "1.21.2-beta": {
            "Fixes": [
                "Fix not found lynt auto closer to trigger on the right page"
            ]
        },
        "1.21.1-beta": {
            "Fixes": [
                "Fixed website loading infinitely when the requested lynt was not found"
            ]
        },
        "1.21.0-beta": {
            "Features": [
                "Added a buttont to see all the changelogs",
                "Improved the changelog display (did you see that 👀 ?)"
            ],
            "Fixes": [
                "Minor fixes and code improvements"
            ],
        },
        "1.20.0-beta": {
            "Bugs": [
                "Fixed vanilla issue where the messages in the message tab couldn't be read"
            ]
        },
        "1.19.0-beta": {
            "Changes": [
                "Updated the way script works to better support future features"
            ],
            "Features": [
                "Added BOT mark for bot accounts. If you own a bot account, come on the <a href='https://discord.gg/Ke7BvbB7rz' target='_blank'>Third Party Developer Discord</a> to ask and have the mark added."
            ]
        },
        "1.18.3-beta": {
            "Fixes": [
                "Fixed clickable @mention redirecting to lyntr.com instead of current domain"
            ]
        },
        "1.18.2-beta": {
            "Fixes": [
                "Fixed clickable @mention and links in lynts",
                "Fixed special display for verified users/developer and official account not working",
            ]
        },
        "1.18.1-beta": {
            "Fixes": [
                "Removed copyButton feature as it was added in vanilla"
            ]
        },
        "1.18.0-beta": {
            "Features": [
                "Added compatibility with the new https://lyntr.jnnj.xyz/"
            ],
            "Important informations": [
                "Please note that the new domain is not yet fully supported and some features may not work correctly. Please report any issue you encounter.",
                "A new domain will be created, fully supported and maintained in the future, stay tuned !",
                "Join the Discord server to get the latest news and updates: <a href='https://discord.gg/Ke7BvbB7rz' target='_blank'>https://discord.gg/Ke7BvbB7rz</a>"
            ]
        },
        "1.17.7-beta": {
            "Fixes": [
                "Fixed mention links redirecting to the user page without putting in lower case (leading to a 404 error)"
            ]
        },
        "1.17.6-beta": {
            "Improvements": [
                "Now reloading message DOM Elements only when needed (+performance and allowing to easylly click links in message too)"
            ]
        },
        "1.17.5-beta": {
            "Fixes": [
                "Top buttons now autoscroll to the top of the feed when clicked",
                "Fixed error on autoscrolltop"
            ]
        },
        "1.17.4-beta": {
            "Features": [
                "Top buttons now autoscroll to the top of the feed when clicked"
            ]
        },
        "1.17.3-beta": {
            "Fixes": [
                "Small fixes",
                "Fixed wrong version number in the console on startup"
            ]
        },
        "1.17.2-beta": {
            "Fixes": [
                "Fixed script crashing on cloudflare error page"
            ]
        },
        "1.17.1-beta": {
            "Fixes": [
                "Update link not always showing the confirm box to reload the page."
            ]
        },
        "1.17.0-beta": {
            "Features": [
                "Added clickable link parsing for messages",
                "Added clickable mention and link parsing for biographies",
            ],
            "Fixes": [
                "Fixed mention parsing for users with - or _ in their name",
            ]
        },
        "1.16.3-beta": {
            "Fixes": [
                "Now checking for updates without caching request (faster to get new update)"
            ]
        },
        "1.16.2-beta": {
            "Fixes": [
                "Actually fixed copy buttons not working correctly lol",
            ]
        },
        "1.16.1-beta": {
            "Fixes": [
                "Fixed copy buttons not working correctly when the mention parser was disabled",
            ]
        },
        "1.16.0-beta": {
            "Features": [
                "Added possibility to change the Lyntr logo to a custom one",
            ],
            "Changes": [
                "Made the changelog not display the categories if there's no content in them",
            ],
            "Bugs": [
                "Fixed version comparison not working correctly",
            ],
            "Other": []
        },
        "1.15.9-beta": {
            "Features": [
                "Added special display for the official Lyntr+ account",
            ],
            "Bugs": [

            ]
        },
        "1.15.8-beta": {
            "Features": [
                "Added a changelog page for new updates"
            ],
            "Bugs": [

            ]
        }
    }

    const _CLASSES_ = {
        lyntDiv: "flex w-full gap-3 rounded-xl bg-lynt-foreground p-3 transition-colors hover:bg-border",
        lyntDivReplied: "rounded-lg border-2 border-primary p-4 drop-shadow",
        lyntrContent: "md:max-w-[490px] whitespace-pre-wrap text-pretty break-words text-lg overflow-x-hidden",
        lyntrUsername: "truncate max-w-[30%] md:max-w-[50%] rounded-sm text-xl font-bold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black",
        lyntrIQCount: "py-0.25 flex select-none items-center rounded-xl border border-transparent bg-primary px-1.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        lyntrVerifiedBadge_div: "flex h-full w-7 justify-center",
        lyntrProfileButton: "static bottom-2 flex max-w-md cursor-pointer items-center gap-4 rounded-full bg-border p-4 md:absolute md:w-[250px]",
    }


    const _PATHS_ = {
        mainLogo: "body > div:nth-child(1) > div.flex.w-full.justify-center > div > div > div.fixed.inset-x-0.bottom-0.z-50.flex.flex-col.md\\:static.md\\:flex-row > div.md\\:max-w-1\\/3.flex.w-full.min-w-full.flex-row.items-start.gap-2.px-2.py-2.md\\:w-auto.md\\:flex-col.md\\:pt-0 > button > img"
    }


    const _DATAS_ = {
        assets: {
            copyButtonSVG: `<svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64.00 64.00" enable-background="new 0 0 64 64" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>`,
            close: `<svg width="48px" height="48px" viewBox="-32 -32 128.00 128.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)"><g class="lp-close-hitbox" id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><path transform="translate(-32, -32), scale(4)" d="M16,29.80873975654443C18.240378969763007,29.710600494442094,20.62955056893191,29.60211908922971,22.45616148060288,28.301187953355523C24.237348523141826,27.03260816570123,24.49091576738738,24.5124900737553,25.846081202749055,22.796259144959684C27.3155252757337,20.935301581856997,30.26535016892865,20.111662254393487,30.754751300330685,17.791551164837383C31.236979649652323,15.505444188022155,29.26740353661129,13.458516124309487,28.26049610738921,11.35020715280884C27.325220078931057,9.391883294625337,26.738247276893794,7.1458786539305645,25.030754920016623,5.806384930860084C23.3450896698867,4.484014138011205,21.06359364556471,4.375265345497651,18.946916540284032,4.043889605202798C16.96729141809753,3.733969996428152,14.967134821061896,3.4368373463170654,13.024199378372906,3.926702280597816C11.086087257991116,4.415351128943277,9.219379559143619,5.35075453858844,7.879807749356889,6.834197713969569C6.588850763660821,8.263804784042446,6.360606377218076,10.284236462045268,5.662198806030371,12.079389151436207C4.957853306298578,13.889804402166805,3.662466771347301,15.548041569700164,3.734415405502398,17.489311606844296C3.8077423830138457,19.46777118469341,5.200195153709339,21.07735121148541,6.06175237847491,22.85987703044796C7.063810720760865,24.933093777852697,7.352855256612401,27.560625456555695,9.239992025423646,28.88011907869451C11.131511716534513,30.202677257741048,13.694180256148773,29.90974563602137,16,29.80873975654443" fill="#ccc" class="lp-svg-splash-bg" strokewidth="0"></path></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.64"></g><g class="lp-close-hitbox" id="SVGRepo_iconCarrier"><path d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z" fill="#000000"></path></g></svg>`
        },
        bot_accounts: [
            "c"
        ]
    }

    const _REGEXES_ = {
        mentionRegex: /(@[a-zA-Z0-9\_\-]+)/g,
        url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
    }

    const _TEMP_ = {
        latestPageLynts: [],
    }


    /**
     * Inject the CSS styles
     */
    async function injectStyle() {
        if(document.getElementById("lyntr-plus-injected-style-eKv9p9OQYXyJdfwh")) return
        let InjectedStyle = document.createElement("style")
        InjectedStyle.id = "lyntr-plus-injected-style-eKv9p9OQYXyJdfwh"
        InjectedStyle.textContent = `
        .lp-div-username-officialaccount-J115XR3x {
            color: #C070FF;
            padding: 2px 5px;
            font-size: 24px;
            text-shadow: 1.5px 1px black;
        }
        .lp-div-username-author-6FjpGV7F {
            color: #FFFF00;
            padding: 2px 5px;
            font-size: 24px;
            -webkit-text-stroke: 1px black;
        }
        .lp-div-username-verified-rWzoWbQ2 {
            color: ${_CONFIG.showVerified.usernameColor};
        }
        .lp-div-username-verified-img-rWzoWbQ2 {
            filter: opacity(0.5) drop-shadow(0 0 0 yellow);
        }




@media only screen (min-width: 600px) {
    .lp-changelog2 {
      width: 200px !important;
    }
}


.lp-changelog1 {
    position: fixed; top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lp-changelog2 {
    position: fixed;
    width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    max-height: 80%;
    background-color: #EEEBE3;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
}


.lp-changelog-content {
    overflow-y: auto;
    flex: 1;
    margin-bottom: 20px;
}
.lp-changelog-footer {
    flex: 1;
    display: flex;
    gap: 10px;
    justify-content: center;
}


.lp-changelog-close-button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
}
.lp-changelog-close-button > svg .lp-close-hitbox {
    cursor: pointer;
}

.lp-changelog-footer > .primary-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: 0.3s all;
}
.lp-changelog-footer > .primary-button:hover {
    transition: 0.3s all;
    background-color: #0056b3;
}
.lp-changelog-footer > .primary-button-disabled {
    background-color: #6c757d;
    color: #a7a7a7;
}
.lp-changelog-footer > .primary-button-disabled:hover {
    background-color: #5a6268;
}




.lp-changelog-version-title {
    position: relative;
    overflow: hidden;
}
.lp-changelog-version-title:before, .lp-changelog-version-title:after {
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 50%;
    height: 1px;
    content: '\a0';
    background-color: rgba(0,0,0,0.1);
    margin-left: 20px
}
    
.lp-changelog-version-title:before {
    margin-left: -300px;
    text-align: right;
}



        `
        document.head.appendChild(InjectedStyle)
    }


    class Lynt {
        #datas
        static Mapping = {
            lynt: {
                rootClassName: "flex w-full gap-3 overflow-hidden rounded-xl bg-lynt-foreground p-3 transition-colors hover:bg-border",
                root: ".flex.w-full.gap-3.overflow-hidden.rounded-xl.bg-lynt-foreground.p-3.transition-colors.hover\\:bg-border",
                username: "* > a",
                displayName: "* > div > div.undefined.flex.items-start.gap-2 > div > div > div.flex.flex-grow.items-center.gap-1.overflow-hidden > a.truncate.max-w-\\[30\\%\\].md\\:max-w-\\[50\\%\\].rounded-sm.text-xl.font-bold.underline-offset-4.hover\\:underline.focus-visible\\:outline-2.focus-visible\\:outline-offset-8.focus-visible\\:outline-black",
                avatarURL: "* > a > img",
                verifiedImg: "* > div > div.undefined.flex.items-start.gap-2 > div > div > div.flex.flex-grow.items-center.gap-1.overflow-hidden > button > div.flex.h-full.w-7.justify-center > img.h-7.w-7",
                iqFromRoot: "* > div > div.undefined.flex.items-start.gap-2 > div > div > div.flex.flex-grow.items-center.gap-1.overflow-hidden > span.py-0\\.25.flex.select-none.items-center.rounded-xl.border.border-transparent.bg-primary.px-1\\.5.text-base.font-semibold.text-primary-foreground.transition-colors.hover\\:bg-primary\\/90.focus\\:outline-none.focus\\:ring-2.focus\\:ring-ring.focus\\:ring-offset-2",
                iqStandalone: "* > span.py-0\\.25.flex.select-none.items-center.rounded-xl.border.border-transparent.bg-primary.px-1\\.5.text-base.font-semibold.text-primary-foreground.transition-colors.hover\\:bg-primary\\/90.focus\\:outline-none.focus\\:ring-2.focus\\:ring-ring.focus\\:ring-offset-2",
                content: "* > div > div.undefined.flex.items-start.gap-2 > div > span.md\\:max-w-\\[490px\\].whitespace-pre-wrap.text-pretty.break-words.text-lg.overflow-x-hidden",
                commentCount: "* > div > div.mb-1.mt-2.flex.items-center.justify-between.gap-2 > div:nth-child(1) > div.relative.flex.flex-row.justify-between.gap-1.svelte-1phtyrl > button > span",
                relyntCount: "* > div > div.mb-1.mt-2.flex.items-center.justify-between.gap-2 > div:nth-child(1) > button > div > button > span",
                likeCount: "* > div > div.mb-1.mt-2.flex.items-center.justify-between.gap-2 > div:nth-child(1) > div:nth-child(3) > button > span",
                watchCount: "* > div > div.mb-1.mt-2.flex.items-center.justify-between.gap-2 > div.ml-auto.flex.items-center.gap-2 > div:nth-child(1) > button > span",
            }
        };
        constructor(lyntRootElement) {
            let Mapping = Lynt.Mapping
            this.#datas = {
                author: {
                    // match the username from any website https://anythingwebsite.com/@username
                    username: {
                        DOM: lyntRootElement.querySelector(Mapping.lynt.username),
                        getValue: (e) => e?.href.match(/@(.*)/)?.[1] ?? null
                    },
                    displayName: {
                        DOM: lyntRootElement.querySelector(Mapping.lynt.displayName),
                        getValue: (e) => e?.textContent ?? null
                    },
                    profileURL: {
                        DOM: lyntRootElement.querySelector(Mapping.lynt.username),
                        getValue: (e) => e?.href ?? null
                    },
                    verified: {
                        DOM: document.querySelector(Mapping.lynt.verifiedImg),
                        getValue: (e) => Boolean(e)
                    },
                    avatarURL: {
                        DOM: lyntRootElement.querySelector(Mapping.lynt.avatarURL),
                        getValue: (e) => e?.src ?? null
                    },
                    iq: {
                        DOM: lyntRootElement.querySelector(Mapping.lynt.iqFromRoot) ?? lyntRootElement.querySelector(Mapping.lynt.iqStandalone),
                        getValue: (e) => e?.textContent ?? null
                    }
                },
                content: {
                    DOM: lyntRootElement.querySelector(Mapping.lynt.content),
                    getValue: (e) => e?.textContent ?? null
                },
                id: {
                    DOM: lyntRootElement.parentElement,
                    getValue: (e) => e?.getAttribute("data-lynt-id")
                },
                commentCount: {
                    DOM: lyntRootElement.querySelector(Mapping.lynt.commentCount),
                    getValue: (e) => e?.textContent ?? null
                },
                relyntCount: {
                    DOM: lyntRootElement.querySelector(Mapping.lynt.relyntCount),
                    getValue: (e) => e?.textContent ?? null
                },
                likeCount: {
                    DOM: lyntRootElement.querySelector(Mapping.lynt.likeCount),
                    getValue: (e) => e?.textContent ?? null
                },
                watchCount: {
                    DOM: lyntRootElement.querySelector(Mapping.lynt.watchCount),
                    getValue: (e) => e?.textContent ?? null
                },
                _root: lyntRootElement
            }
        }
    
        getRawDatas() {
            return this.#datas
        }
    
        getDatas() {
            return mapObject(this.#datas, (key, value) => {
                // If the value if exactly form of { DOM: ..., getValue: ... }
                if(typeof value === 'object' && value.hasOwnProperty("DOM") && value.hasOwnProperty("getValue")) {
                    return value.getValue(value.DOM)
                } else {
                    return mapObject(value, (key2, value2) => {
                        if(typeof value2 === 'object' && value2.hasOwnProperty("DOM") && value2.hasOwnProperty("getValue")) {
                            return value2.getValue(value2.DOM)
                        } else {
                            return value2
                        }
                    })
                }
            })
        }
    
        getDOMs() {
            return mapObject(this.#datas, (key, value) => {
                // If the value if exactly form of { DOM: ..., getValue: ... }
                if(typeof value === 'object' && value.hasOwnProperty("DOM") && value.hasOwnProperty("getValue")) {
                    return value.DOM
                } else {
                    return mapObject(value, (key2, value2) => {
                        if(typeof value2 === 'object' && value2.hasOwnProperty("DOM") && value2.hasOwnProperty("getValue")) {
                            return value2.DOM
                        } else {
                            return value2
                        }
                    })
                }
            })
        }
    
        /**
         * Add the bot mark to the lynt
         */
        addBotMark() {
            let botMark = `<span class="py-0.25 flex select-none items-center rounded-xl border border-transparent bg-primary px-1.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 lp-botmark-raOeFGI285XCUTcq">BOT</span>`
            let DOM_authorDisplayName = this.getDOMs().author?.displayName
            let DOM_parent = DOM_authorDisplayName?.parentElement
            if(DOM_parent && [...DOM_parent.getElementsByClassName("lp-botmark-raOeFGI285XCUTcq")].length == 0) {
                // Addind the bot mark
                DOM_authorDisplayName.insertAdjacentHTML('afterend', botMark)
            }
        }
        /**
         * Remove the bot mark from the lynt
         */
        removeBotMark() {
            let DOM_authorDisplayName = this.getDOMs().author?.displayName
            let DOM_parent = DOM_authorDisplayName?.parentElement
            if(DOM_parent) {
                // Removing the bot mark
                [...DOM_parent.getElementsByClassName("lp-botmark-raOeFGI285XCUTcq")].forEach(e => e.remove())
            }
        }
    
    }
    
    
    //***********************************/
    // Testing code lol
    
    
    function getPageLynts() {
            
        //const lynts = [...document.getElementsByClassName(Mapping.lynt.rootClassName)].map(lyntRoot => {
        const lynts = [...document.querySelectorAll(Lynt.Mapping.lynt.root)].map(lyntRoot => {
            return new Lynt(lyntRoot)
        })
    
        return lynts
    }

    /**
     * Refresh latest page lynts
     */
    async function refreshLatestPageLynts() {
        _TEMP_.latestPageLynts = getPageLynts()
    }
    
    //***********************************/
    


    function parseTextToDOMElements(text) {

        // Split the message by links
        // Hello https://lyntr.com how you are ? -> [{text: "Hello ", type: "text"}, {text: "https://lyntr.com", type: "link"}, {text: " how you are ?", type: "text"}]
        let parts = text.split(_REGEXES_.url)
        // Transform the links into links
        parts = parts.map(part => {
            if(part.match(_REGEXES_.url)) {
                return {
                    raw: part,
                    type: "link"
                }
            } else {
                return {
                    raw: part,
                    type: "text"
                }
            }
        })

        // Parse mentions in the type text parts
        parts = parts.map(part => {
            if(part.type === "text") {
                let mentionParts = part.raw.split(_REGEXES_.mentionRegex)
                mentionParts = mentionParts.map(mentionPart => {
                    if(mentionPart.match(_REGEXES_.mentionRegex)) {
                        return {
                            raw: mentionPart,
                            type: "mention"
                        }
                    } else {
                        return {
                            raw: mentionPart,
                            type: "text"
                        }
                    }
                })
                return mentionParts
            } else {
                return part
            }
        }).flat()

        // Create the elements for each part
        let parts_DOMElements = parts.map(part => {
            if(part.type === "link") {
                let elem = document.createElement("a")
                elem.href = part.raw
                elem.className = "lp-messageParser-link-mg9UtlHadBG510DM"
                elem.target = "_blank"
                elem.textContent = part.raw
                return elem
            } else if(part.type === "mention") {
                let username = part.raw.replace("@", "").toLowerCase()
                let elem = document.createElement("a")
                elem.href = `${document.location.origin}/@${username}`
                elem.className = "lp-messageParser-mention-mg9UtlHadBG510DM"
                elem.target = "_blank"
                elem.textContent = part.raw
                return elem
            } else {
                let elem = document.createElement("span")
                elem.textContent = part.raw
                elem.className = "lp-messageParser-text-mg9UtlHadBG510DM"
                return elem
            }
        })

        return parts_DOMElements

    }



    /**
     * Parse message links and convert them to clickable links
     */
    async function parseMessages() {

        if(!_CONFIG.parseMessage.enabled) return

        // Get all messages elements currently displayed
        let messages = [...document.getElementsByClassName(_CLASSES_.lyntrContent)].map(x => {
            return x.parentElement
        })

        // Loop through each message and replace mentions with links
        messages.forEach(msgContainer => {
            try {

                // Parsing links in the message

                if(!(msgContainer.getElementsByClassName("lp-lynt-content-first-jBRHEIwW")?.[0])) {

                    let sec = document.createElement("span")
                    sec.className = _CLASSES_.lyntrContent
                    
                    sec.classList.add("lp-lynt-content-second-jBRHEIwW")
                    msgContainer.getElementsByClassName(_CLASSES_.lyntrContent)?.[0].classList.add(`lp-lynt-content-first-jBRHEIwW`)
                    let temp1 = msgContainer.getElementsByClassName("lp-lynt-content-first-jBRHEIwW")?.[0]
                    if(temp1) { temp1.style.display = "none" }
                    msgContainer.appendChild(sec)
                }

                let first = msgContainer.getElementsByClassName("lp-lynt-content-first-jBRHEIwW")[0]
                let second = msgContainer.getElementsByClassName("lp-lynt-content-second-jBRHEIwW")[0]


                let parts_DOMElements = parseTextToDOMElements(first.textContent)

                // Join the parts back together
                let newInnerHTML = parts_DOMElements.map(x => x.outerHTML).join("")
                if(second.innerHTML.trim() == newInnerHTML.trim()) return // Nothing changed
                second.innerHTML = newInnerHTML
                
            } catch (error) {
                console.log(error)
            }
        })

    }

    /**
     * Parse biography
     */
    async function parseBiography() {
        if(!_CONFIG.parseBiography.enabled) return
        try {
            let biography_text = document.querySelector("body > div:nth-child(1) > div.flex.w-full.justify-center > div > div > div.flex.h-full.w-full.flex-col.items-center.gap-1.md\\:flex-row.md\\:items-start > div > div > div > div.mt-2 > blockquote > p")
            if(!biography_text) return; // Already parsed or not found
            let parsed = parseTextToDOMElements(biography_text.innerHTML).map(x => x.outerHTML).join("\n")
            biography_text.outerHTML = `<div class="${_CONFIG.parseBiography.doneClassName}">${parsed}</div>`
        } catch (error) {
            console.log(`[Lyntr+][parseBiography] Error while parsing biography:`,error.stack)
        }
       

    }


    /**
     * Display the author of the script in a special way
     */
    async function showScriptAuthor() {

        if(!_CONFIG.showScriptAuthor.enabled) return;

        let elems = [...document.getElementsByClassName(_CLASSES_.lyntrUsername)]
        elems.forEach(e => {
            if(e.href === document.location.origin + "/@sylicium") {
                e.classList.add("lp-div-username-author-6FjpGV7F")
            } else {
                e.classList.remove("lp-div-username-author-6FjpGV7F")
            }
        })
    }

    /**
     * Display the author of the script in a special way
     */
    async function showBotAccounts() {

        if(!_CONFIG.showScriptAuthor.enabled) return;


        let lynts = _TEMP_.latestPageLynts
        
        lynts.forEach(lynt => {
            if(_DATAS_.bot_accounts.includes(lynt.getDatas().author.username)) {
                lynt.addBotMark()
            } else {
                lynt.removeBotMark()
            }
        })
    }

    /**
     * Display the official Lyntr+ account in a special way
     */
    async function showOfficialAccount() {

        let elems = [...document.getElementsByClassName(_CLASSES_.lyntrUsername)]
        elems.forEach(e => {
            if(e.href === document.location.origin + "/@lyntrplus") {

                if(e.nextElementSibling?.classList.contains("lp-div-username-officialaccount-forceVerifyBadge-J115XR3x")) { return } else {
                    let badgeElem = document.createElement("button")
                    badgeElem.innerHTML = `<div class="">
                        <img class="h-7 w-7 lp-div-username-verified-img-rWzoWbQ2" src="verified.png" alt="This user is verified.">
                    </div>`
                    badgeElem.classList.add("lp-div-username-officialaccount-forceVerifyBadge-J115XR3x")
                    // aria-describedby="XhY4Mp3TkP" id="DfoDGjU493" data-state="closed" data-melt-tooltip-trigger="" data-tooltip-trigger="" type="button"
                    badgeElem.setAttribute("aria-describedby", "lp-div-username-officialaccount-forceVerifyBadge-J115XR3x")
                    badgeElem.setAttribute("data-state", "closed")
                    badgeElem.setAttribute("data-melt-tooltip-trigger", "")
                    badgeElem.setAttribute("data-tooltip-trigger", "")
                    badgeElem.setAttribute("type", "button")
                    badgeElem.setAttribute("title", "Official Lyntr+ account")
                    e.after(badgeElem)
                }
                e.classList.add("lp-div-username-officialaccount-J115XR3x")
            } else {
                e.classList.remove("lp-div-username-officialaccount-J115XR3x")
            }
        })
        // Change the display when on profile page
        if(document.location.href === document.location.origin + "/@lyntrplus") {
            let elem = document.getElementsByClassName("peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-2xl font-bold text-primary")?.[0]
            if(elem) { elem.classList.add("lp-div-username-officialaccount-J115XR3x") }
        }
    }


    /**
     * Display verified users in a special way
     */
    async function showVerified() {

        if(!_CONFIG.showVerified.enabled) return;

        let elems = [...document.getElementsByClassName(_CLASSES_.lyntrUsername)]


        elems.forEach(e => {
            let temp1 = e.nextElementSibling // Get the next element after the username
            let temp2 = e.nextElementSibling.getElementsByClassName(_CLASSES_.lyntrVerifiedBadge_div)?.[0] // Check if the next element has a child with the class lyntrVerifiedBadge_div (meaning it's a verified badge element)
            let badgeImg = e.nextElementSibling.getElementsByClassName("flex h-full w-7 justify-center")?.[0]?.getElementsByTagName("img")?.[0] // Double checking by getting the image element to check if it's the verified badge
            let isVerified = badgeImg?.src == document.location.origin + "/verified.png"
            || badgeImg?.src == document.location.origin + "/white_mode_verified.png" // Check if the image source is the verified badge itself to be sure
            
            // If there's the verified badge, change the style of the username
            if(isVerified) {
                e.classList.add("lp-div-username-verified-rWzoWbQ2")
                badgeImg?.classList.add("lp-div-username-verified-img-rWzoWbQ2")
            } else {
                e.classList.remove("lp-div-username-verified-rWzoWbQ2")
                badgeImg?.classList.remove("lp-div-username-verified-img-rWzoWbQ2")
            }
        })

    }

    /**
     * Modify the profile button
     */
    async function profileButton() {
        if(!_CONFIG.profileButton.enabled) return
        let elem = document.getElementsByClassName(_CLASSES_.lyntrProfileButton)?.[0]
        if(elem) {
            elem.style.backgroundColor = _CONFIG.profileButton.color
        }
    }

    /**
     * Modify the background
     */
    async function background() {
        if(!_CONFIG.background.enabled) return

        if(document.body.classList.contains(_CONFIG.background.doneClassName)) return
        

        if(_CONFIG.background.mode == "color") {
            document.body.style.backgroundColor = _CONFIG.background.color
        } else if(_CONFIG.background.mode == "image") {
            document.body.style.background = `url(${_CONFIG.background.image})`
            document.body.style.backgroundRepeat = "no-repeat"
            document.body.style.backgroundSize = "cover"
        } else {
            console.error(`[Lyntr+] Invalid background mode: ${_CONFIG.background.mode}`)
        }

    }

    /**
     * Modify the transparency of the lynts
     */
    async function lyntTransparency() {
        if(!_CONFIG.lyntTransparency.enabled) return
        let lynts = [...document.getElementsByClassName(_CLASSES_.lyntDiv)]
        lynts = lynts.filter(lynt => {
            return !lynt.classList.contains(_CONFIG.lyntTransparency.doneClassName)
        })
        
        let overridedColor = _CONFIG.lyntTransparency.overrideColor.length > 0 ? _CONFIG.lyntTransparency.overrideColor : "#EEEBE3"
        
        lynts.forEach(lynt => {
            let border = `solid 2px #${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            let bgColor = `#${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            lynt.style.border = border
            lynt.style.backgroundColor = bgColor
            lynt.classList.add(_CONFIG.lyntTransparency.doneClassName)
        })

        let lyntDivsReplied = [...document.getElementsByClassName(_CLASSES_.lyntDivReplied)]
        lyntDivsReplied = lyntDivsReplied.filter(lynt => {
            return !lynt.classList.contains(_CONFIG.lyntTransparency.doneClassName)
        })


        lyntDivsReplied.forEach(lynt => {
            let border = `solid 2px #${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            let bgColor = `#${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            lynt.style.border = border
            lynt.style.backgroundColor = bgColor
            lynt.classList.add(_CONFIG.lyntTransparency.doneClassName)
        })

    }

    /**
     * Custom logo
     */
    async function customLogo() {
        if(!_CONFIG.customLogo.enabled) return
        let logo = document.querySelector(_PATHS_.mainLogo)
        if(!logo) return
        if(logo.classList.contains(_CONFIG.customLogo.doneClassName)) return
        if(logo) {
            logo.src = _CONFIG.customLogo.logoURL
        }
        logo.classList.add(_CONFIG.customLogo.doneClassName)
    }

    /**
     * Make page auto scroll to the top
     */
    async function makeTopButtonsAutoScrollTop() {
        let topBoxWithFeedButtons = document.querySelector("body > div:nth-child(1) > div.flex.w-full.justify-center > div > div > div.flex.h-full.w-full.flex-col.items-center.gap-1.md\\:flex-row.md\\:items-start > div > div > div.flex.justify-evenly.md\\:justify-center.md\\:gap-10.gap-4")
        let middleFeedBox = document.querySelector("body > div:nth-child(1) > div.flex.w-full.justify-center > div > div > div.flex.h-full.w-full.flex-col.items-center.gap-1.md\\:flex-row.md\\:items-start > div > div > div.flex.h-full.w-full.flex-col.gap-2.overflow-y-auto.px-1.py-2")
        if(!topBoxWithFeedButtons) return;
        [...topBoxWithFeedButtons.children]?.forEach(child => {
            child.onclick = () => {
                middleFeedBox.scrollTop = 0
            }
        })
    }


    async function readMessageOfOtherID(other_id, method="get") {
        try {
            let temp1 = await fetch(`https://lyntr.jnnj.xyz/api/messages/read?other_id=${other_id}`, { method: "PATCH" })
            let temp2 = await temp1.json()
        } catch(err) { console.log("Error:",err) }
    }
    async function getUserFriendFromHandle(handle){
        try {
            let temp1 = await fetch("https://lyntr.jnnj.xyz/api/me/friends", { method: "GET" })
            let temp2 = await temp1.json()
            let friendList = temp2.friends ?? []
            let user = friendList.filter(user => user.handle === handle)?.[0] ?? null
            return user
        } catch(err) { console.log("Error:",err) }
    }


    /**
     * Auto mark messages as read
     */
    async function autoMarkMessagesAsRead() {
        // If url matches https://{any domain}/messages/@{handle}, get the handle
        let isOnMessagePage = document.location.href.match(/https:\/\/[a-zA-Z0-9.]+\/messages\/@([a-zA-Z0-9_\-]+)/)
        // If the url matches the message page, get the handle and mark the messages as read
        if(isOnMessagePage) {
            let handle = isOnMessagePage[1]
            let friend_user = await getUserFriendFromHandle(handle)
            let other_id = friend_user.id
            if(friend_user && typeof friend_user.unread === "number" && friend_user.unread > 0) {
                readMessageOfOtherID(other_id)
            }
        }
    }


    /**
     * Fix page stuck on lynt not found
     */
    async function fixPageStuckOnLyntNotFound() {
        let pageURLparams = new URLSearchParams(document.location.search)
        if(!document.location.href.startsWith(`${document.location.origin}/?id=`)) return;
        let lyntID = pageURLparams.get("id")
        if(!lyntID || lyntID.length < 1) return;
        let doesLyntExist_pre = await fetch(`${document.location.origin}/api/lynt?id=${lyntID}`, { method: "GET" })
        if(doesLyntExist_pre.status === 404) {
            console.log(`[Lyntr+] The lynt you were trying to access does not exist. Redirecting to the home page...`)
            document.location.href = document.location.origin
        }
    }





    /**
     * Create copy buttons for each message
     */
    // async function createCopyButtons() {

    //     let elements = [...document.getElementsByClassName("flex flex-grow items-center gap-1 overflow-hidden")]
    //     elements.forEach(element => {
            
    //         if(element.parentElement.querySelector(".lp-copy-button-YWffM4bH")) return; // If the button already exists, don't create it again
        
    //         let copyButton = document.createElement("div")
    //         copyButton.className = "flex-shrink-0 lp-copy-button-YWffM4bH"
    //         copyButton.innerHTML = `<button role="button" aria-haspopup="dialog" aria-expanded="true" data-state="open" id="kApjniH6ae" data-melt-popover-trigger="" data-popover-trigger="">
    //             ${_DATAS_.assets.copyButtonSVG}
    //         </button>`
    //         //copyButton.onclick = `copyToClipboard(this.parentElement.parentElement.querySelector(".lp-lynt-content-first-jBRHEIwW"))`
    //         copyButton.onclick = () => {
    //                 try {
    //                 let temp1 = copyButton.parentElement.parentElement.querySelector(".lp-lynt-content-first-jBRHEIwW")
    //                 if(!temp1) {
    //                     temp1 = [...copyButton.parentElement.parentElement.getElementsByClassName("max-w-[490px] whitespace-pre-wrap break-words text-lg")]?.[0]
    //                 }
    //                 copyToClipboard(temp1.textContent)
    //             } catch (error) {
    //                 alert(`An error occured while copying the message to the clipboard. Please try again.\n${error.stack}`)
    //                 console.log(error)
    //             }
    //         }
        
    //         element.after(copyButton)
        
    //     })

    // }
    


    /**
     * Add a beta mark to the top right corner of the page
     */
    async function betaMark() {
        //if(document.getElementById("lyntr-plus-beta-mark-IjA5RKoHXIFBxQvX")) return

        function extractVersionNumber(text) {
            const versionRegex = /@version\s+([0-9.]+)/;
            const match = text.match(versionRegex);
            if (match) {
                return match[1];
            }
            return null;
        }
        // Function to test if the version string is higher than the current version
        function versionCompare(v1, v2, options) {
            var lexicographical = options && options.lexicographical,
                zeroExtend = options && options.zeroExtend,
                v1parts = v1.split('.'),
                v2parts = v2.split('.');
        
            function isValidPart(x) {
                return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
            }
        
            if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
                return NaN;
            }
        
            if (zeroExtend) {
                while (v1parts.length < v2parts.length) v1parts.push("0");
                while (v2parts.length < v1parts.length) v2parts.push("0");
            }
        
            if (!lexicographical) {
                v1parts = v1parts.map(Number);
                v2parts = v2parts.map(Number);
            }
        
            for (var i = 0; i < v1parts.length; ++i) {
                if (v2parts.length == i) {
                    return 1;
                }
        
                if (v1parts[i] == v2parts[i]) {
                    continue;
                }
                else if (v1parts[i] > v2parts[i]) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        
            if (v1parts.length != v2parts.length) {
                return -1;
            }
        
            return 0;
        }
        

        async function isUpToDate() {
            let lastVersionMeta = await fetch("https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/production/lyntr-plus.user.js",{cache: "no-store"})
            let lastVersionMetaText = await lastVersionMeta.text()
            // Only get the first lines of the file
            lastVersionMetaText = lastVersionMetaText.split("\n").slice(0, 10).join("\n")
            let lastVersion = extractVersionNumber(lastVersionMetaText)
            let VERSION_matched = VERSION.match(/[0-9.]+/)[0]
            let versionDiff = versionCompare(VERSION_matched, lastVersion)
            if(versionDiff === -1) {
                return {
                    isAnUpdate: true,
                    comment: `[Lyntr+] AutoUpdateChecker: 🔔 An update is available for Lyntr+ v${lastVersion} (current: v${VERSION})`,
                    version: lastVersion
                }
            } else if(versionDiff === 0) {
                return {
                    isAnUpdate: false,
                    comment: `[Lyntr+] AutoUpdateChecker: ✅ You are up to date with the latest version of Lyntr+`,
                    version: lastVersion
                }
            } else if(versionDiff === 1) {
                return {
                    isAnUpdate: false,
                    comment: "[Lyntr+] AutoUpdateChecker: ✅ You are ahead of the latest version (what?)",
                    version: lastVersion
                }
            }
            console.error(`[Lyntr+] AutoUpdateChecker: Invalid version comparison result: ${versionDiff}`)
        }


        let UpToDate = await isUpToDate()
        console.log(UpToDate.comment)

        let betaBox = document.getElementById("lyntr-plus-beta-mark-IjA5RKoHXIFBxQvX") || null
        let doAppendToBody = false
        if(!betaBox) {
            doAppendToBody = true
            betaBox = document.createElement("div")
            betaBox.id = "lyntr-plus-beta-mark-IjA5RKoHXIFBxQvX"
            betaBox.style.position = "fixed"
            betaBox.style.top = "0"
            betaBox.style.right = "0"
            betaBox.style.zIndex = "1000"
            betaBox.style.display = "flex"
            betaBox.style.flexDirection = "column"
            betaBox.style.alignItems = "end"
        }
        betaBox.innerHTML = ""

        let betaMark = document.createElement("div")
            betaMark.style.padding = "5px 10px"
            betaMark.style.backgroundColor = "rgb(0, 0, 0, 0.75)"
            betaMark.style.color = "rgb(255, 255, 255)"
            betaMark.style.fontWeight = "bold"
            betaMark.style.fontSize = "16px"
            betaMark.style.cursor = "pointer"
            betaMark.innerHTML = `Lyntr+ Beta v${VERSION}`
            betaMark.onclick = () => { showChangelog() }

        let betaMarkUpdate = document.createElement("div")
        if(UpToDate.isAnUpdate) {
            betaMarkUpdate.style.padding = "5px 10px"
            betaMarkUpdate.style.backgroundColor = "rgb(0, 0, 0, 0.75)"
            betaMarkUpdate.style.color = "rgb(255, 255, 255)"
            betaMarkUpdate.style.fontWeight = "bold"
            betaMarkUpdate.style.fontSize = "12px"
            /*
            let onclickUpdateCode = `
setTimeout(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    while(true) {
        try {
            let conf = confirm('Do you want to reload the page after updating for the changes to take effect?')
            if(conf) {
                document.location.reload()
                break;
            }
        } catch(err) { console.log('false. Waiting.',err); await sleep(100000) }
    }
                
},1000)
`
*/
            let onclickUpdateCode = `setTimeout(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        let conf = confirm('Do you want to reload the page after updating for the changes to take effect?')
        if(conf) {
            document.location.reload()
        }
                
},1000)`
            betaMarkUpdate.innerHTML = `An update is available for Lyntr+ <a href="https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/production/lyntr-plus.user.js" style="color:aqua;" onclick="${onclickUpdateCode}">Click here to update to v${UpToDate.version}</a>`
            document.body.appendChild(betaMarkUpdate)
        }

        betaBox.appendChild(betaMark)
        betaBox.appendChild(betaMarkUpdate)
        if(doAppendToBody) { document.body.appendChild(betaBox) }

    }



    // Start Lyntr+
    (async function __start__() {

        async function fast() {
            while(true) {
                
                // =================
                // User settings
                // =================
                injectStyle()
                parseMessages()
                parseBiography()
                showScriptAuthor()
                showVerified()
                profileButton()
                background()
                lyntTransparency()
                customLogo()
                // =================

                // =================
                // Always running
                // =================
                showOfficialAccount()
                refreshLatestPageLynts() // Refresh the latest page lynts. Some features need this to work
                showBotAccounts() // Show BOT mark on bot accounts
                // createCopyButtons()
                // =================

                await sleep(250)
            } 
        }

        async function fast2() {
            while(true) {

                // =================
                // Always running
                // =================
                makeTopButtonsAutoScrollTop()
                autoMarkMessagesAsRead()
                fixPageStuckOnLyntNotFound()
                
                await sleep(1000)
            }
        }

        async function slow() {


        }

        fast()
        fast2()
        slow()


    })();

    // Bêta
    (async function __beta__() {
        while(true) {

            betaMark()

            await sleep(60*1000)
        }
    })();







    // Log that Lyntr+ has been loaded

    var css = "padding-bottom:20px;text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%), 38px 222px hsl(1198.8, 100%, 50%), 39px 223px hsl(1204.2, 100%, 50%), 41px 224px hsl(1209.6, 100%, 50%), 42px 225px hsl(1215, 100%, 50%), 43px 226px hsl(1220.4, 100%, 50%), 45px 227px hsl(1225.8, 100%, 50%), 46px 228px hsl(1231.2, 100%, 50%), 47px 229px hsl(1236.6, 100%, 50%), 48px 230px hsl(1242, 100%, 50%), 49px 231px hsl(1247.4, 100%, 50%), 50px 232px hsl(1252.8, 100%, 50%), 51px 233px hsl(1258.2, 100%, 50%), 52px 234px hsl(1263.6, 100%, 50%), 53px 235px hsl(1269, 100%, 50%), 54px 236px hsl(1274.4, 100%, 50%), 55px 237px hsl(1279.8, 100%, 50%), 55px 238px hsl(1285.2, 100%, 50%), 56px 239px hsl(1290.6, 100%, 50%), 57px 240px hsl(1296, 100%, 50%), 57px 241px hsl(1301.4, 100%, 50%), 58px 242px hsl(1306.8, 100%, 50%), 58px 243px hsl(1312.2, 100%, 50%), 58px 244px hsl(1317.6, 100%, 50%), 59px 245px hsl(1323, 100%, 50%), 59px 246px hsl(1328.4, 100%, 50%), 59px 247px hsl(1333.8, 100%, 50%), 59px 248px hsl(1339.2, 100%, 50%), 59px 249px hsl(1344.6, 100%, 50%), 60px 250px hsl(1350, 100%, 50%), 59px 251px hsl(1355.4, 100%, 50%), 59px 252px hsl(1360.8, 100%, 50%), 59px 253px hsl(1366.2, 100%, 50%), 59px 254px hsl(1371.6, 100%, 50%), 59px 255px hsl(1377, 100%, 50%), 58px 256px hsl(1382.4, 100%, 50%), 58px 257px hsl(1387.8, 100%, 50%), 58px 258px hsl(1393.2, 100%, 50%), 57px 259px hsl(1398.6, 100%, 50%), 57px 260px hsl(1404, 100%, 50%), 56px 261px hsl(1409.4, 100%, 50%), 55px 262px hsl(1414.8, 100%, 50%), 55px 263px hsl(1420.2, 100%, 50%), 54px 264px hsl(1425.6, 100%, 50%), 53px 265px hsl(1431, 100%, 50%), 52px 266px hsl(1436.4, 100%, 50%), 51px 267px hsl(1441.8, 100%, 50%), 50px 268px hsl(1447.2, 100%, 50%), 49px 269px hsl(1452.6, 100%, 50%), 48px 270px hsl(1458, 100%, 50%), 47px 271px hsl(1463.4, 100%, 50%), 46px 272px hsl(1468.8, 100%, 50%), 45px 273px hsl(1474.2, 100%, 50%), 43px 274px hsl(1479.6, 100%, 50%), 42px 275px hsl(1485, 100%, 50%), 41px 276px hsl(1490.4, 100%, 50%), 39px 277px hsl(1495.8, 100%, 50%), 38px 278px hsl(1501.2, 100%, 50%), 36px 279px hsl(1506.6, 100%, 50%), 35px 280px hsl(1512, 100%, 50%), 33px 281px hsl(1517.4, 100%, 50%), 32px 282px hsl(1522.8, 100%, 50%), 30px 283px hsl(1528.2, 100%, 50%), 28px 284px hsl(1533.6, 100%, 50%), 27px 285px hsl(1539, 100%, 50%), 25px 286px hsl(1544.4, 100%, 50%), 23px 287px hsl(1549.8, 100%, 50%), 22px 288px hsl(1555.2, 100%, 50%), 20px 289px hsl(1560.6, 100%, 50%), 18px 290px hsl(1566, 100%, 50%), 16px 291px hsl(1571.4, 100%, 50%), 14px 292px hsl(1576.8, 100%, 50%), 13px 293px hsl(1582.2, 100%, 50%), 11px 294px hsl(1587.6, 100%, 50%), 9px 295px hsl(1593, 100%, 50%), 7px 296px hsl(1598.4, 100%, 50%), 5px 297px hsl(1603.8, 100%, 50%), 3px 298px hsl(1609.2, 100%, 50%), 1px 299px hsl(1614.6, 100%, 50%), 2px 300px hsl(1620, 100%, 50%), -1px 301px hsl(1625.4, 100%, 50%), -3px 302px hsl(1630.8, 100%, 50%), -5px 303px hsl(1636.2, 100%, 50%), -7px 304px hsl(1641.6, 100%, 50%), -9px 305px hsl(1647, 100%, 50%), -11px 306px hsl(1652.4, 100%, 50%), -13px 307px hsl(1657.8, 100%, 50%), -14px 308px hsl(1663.2, 100%, 50%), -16px 309px hsl(1668.6, 100%, 50%), -18px 310px hsl(1674, 100%, 50%), -20px 311px hsl(1679.4, 100%, 50%), -22px 312px hsl(1684.8, 100%, 50%), -23px 313px hsl(1690.2, 100%, 50%), -25px 314px hsl(1695.6, 100%, 50%), -27px 315px hsl(1701, 100%, 50%), -28px 316px hsl(1706.4, 100%, 50%), -30px 317px hsl(1711.8, 100%, 50%), -32px 318px hsl(1717.2, 100%, 50%), -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%); font-size: 30px;";
    
    console.log("%c| Lyntr+ loaded!   ",css)
    console.log(`%c| Version: v${VERSION}   `,css)
    console.log("%c| Author: Sylicium   ", css)
    console.log("%c| GitHub: https://github.com/Sylicium/lyntr-plus-userscript   ", css)



    function showChangelog(full=false) {

        
        // Display a box the show changelog of new version in the center of the screen
        let element = document.createElement("div");
        let list = "0123456789abcdef".split("");
        let btn_ok = `lp-changelog-temp-button-ok-${Array(32).fill(null).map(x => list[Math.floor(Math.random() * list.length)]).join("")}`;
        let btn_see_all = `lp-changelog-temp-button-see-all-${Array(32).fill(null).map(x => list[Math.floor(Math.random() * list.length)]).join("")}`;
        let btn_github = `lp-changelog-temp-button-github-${Array(32).fill(null).map(x => list[Math.floor(Math.random() * list.length)]).join("")}`;
        let btn_close = `lp-changelog-close-button-close-${Array(32).fill(null).map(x => list[Math.floor(Math.random() * list.length)]).join("")}`;
        let btn_idontlikesplashclosebutton = `lp-changelog-close-button-idontlikesplashclosebutton-${Array(32).fill(null).map(x => list[Math.floor(Math.random() * list.length)]).join("")}`;

        let CHANGELOG_TEXT = ""
        if(full) {

            for(let VERSION in _VERSION_CHANGELOG_) {
                CHANGELOG_TEXT += `<h1 class="lp-changelog-version-title" style="font-size: 1.5em; margin-bottom: 10px;text-align:center;">v${VERSION}</h1>`
                CHANGELOG_TEXT += `<div class="lp-changelog-version">`
                for(let categoryName in _VERSION_CHANGELOG_[VERSION]) {
                    if(_VERSION_CHANGELOG_[VERSION][categoryName].length == 0) continue;
                    
                    CHANGELOG_TEXT += `<p style="margin-bottom: 10px;"><span style="text-decoration:underline;">${categoryName}</span>:</p>`
                    CHANGELOG_TEXT += `<ul style="margin: 0px 0px 10px 20px;list-style-type: '• ';">`
                    for(let change of _VERSION_CHANGELOG_[VERSION][categoryName]) {
                        CHANGELOG_TEXT += `<li>${change}</li>`
                    }
                    CHANGELOG_TEXT += `</ul>`
                }
                CHANGELOG_TEXT += `</div>`
            }
        } else {
            if(_VERSION_CHANGELOG_.hasOwnProperty(VERSION)) {
                CHANGELOG_TEXT += `<h1 class="lp-changelog-version-title" style="font-size: 1.5em; margin-bottom: 10px;text-align:center;">v${VERSION}</h1>`
                CHANGELOG_TEXT += `<div class="lp-changelog-version">`
                for(let categoryName in _VERSION_CHANGELOG_[VERSION]) {
                    if(_VERSION_CHANGELOG_[VERSION][categoryName].length == 0) continue;
                    
                    CHANGELOG_TEXT += `<p style="margin-bottom: 10px;"><span style="text-decoration:underline;">${categoryName}</span>:</p>`
                    CHANGELOG_TEXT += `<ul style="margin: 0px 0px 10px 20px;list-style-type: '• ';">`
                    for(let change of _VERSION_CHANGELOG_[VERSION][categoryName]) {
                        CHANGELOG_TEXT += `<li>${change}</li>`
                    }
                    CHANGELOG_TEXT += `</ul>`
                }
                CHANGELOG_TEXT += `</div>`
            } else {
                CHANGELOG_TEXT = `<p style="margin-bottom: 10px;">Changelog is missing for this version</p>`
            }
        }

        element.innerHTML = `
        <div class="lp-changelog2">
            <h1 style="font-size: 2em; margin-bottom: 10px;text-align:center;">Lyntr+ Changelog</h1>
            <div class="lp-changelog-close-button" id='${btn_close}'>
                ${_DATAS_.assets.close}
            </div>
            <div class="lp-changelog-content">

                ${CHANGELOG_TEXT}

            </div>
            <div class="lp-changelog-footer">
                <button class="primary-button lp-changelog-temp-button-github" id='${btn_github}'>GitHub</button>
                <button class="primary-button lp-changelog-temp-button-see-all" id='${btn_see_all}'>${full ? `See only last` : `See all versions`}</button>
                <button class="primary-button" id='${btn_idontlikesplashclosebutton}'>I don't like the splash close buttons (Bruh @Epical)</button>
            </div>
            
        </div>
        `;
        element.className = "lp-changelog1";

        document.body.appendChild(element);


        const splashButtonSvgPath = document.getElementById(btn_close).getElementsByClassName("lp-svg-splash-bg")?.[0]
        if(localStorage.getItem("lyntr-plus-idontlikechangelogclosebuttonsplash") === "true") {
            splashButtonSvgPath.setAttribute("fill","#FFFFFF00")
        } else {
            splashButtonSvgPath.setAttribute("fill","#CCC")
        }

        document.getElementById(btn_idontlikesplashclosebutton).addEventListener("click", () => {
            let currentChoice = localStorage.getItem("lyntr-plus-idontlikechangelogclosebuttonsplash") === "true"
            let newChoice_idontlike = !currentChoice
            localStorage.setItem("lyntr-plus-idontlikechangelogclosebuttonsplash", newChoice_idontlike)
            if(newChoice_idontlike) {
                // I don't like the splash close button
                document.getElementById(btn_close).getElementsByClassName("lp-svg-splash-bg")?.[0].setAttribute("fill","#FFFFFF00")
            } else {
                // I like the splash close button
                document.getElementById(btn_close).getElementsByClassName("lp-svg-splash-bg")?.[0].setAttribute("fill","#CCC")
            }
            
        })

        let closeHitboxes = [...document.getElementById(btn_close).getElementsByClassName("lp-close-hitbox")]
        for(let hitbox of closeHitboxes) {
            hitbox.addEventListener("click", () => {
                element.remove();
            })
        }

        document.getElementById(btn_see_all).addEventListener("click", () => {
            element.remove();
            showChangelog(!full)
        })
        document.getElementById(btn_github).addEventListener("click", () => {
            window.open("https://github.com/Sylicium/lyntr-plus-userscript", "_BLANK")
        })

    }

    function checkAutoDisplayChangelog() {
        
        let displayChangelog = false
        if(localStorage.getItem("lyntr-plus-currentVersion") != VERSION) {
            displayChangelog = true
            console.log("New version detected, displaying changelog")
        }
        localStorage.setItem("lyntr-plus-currentVersion", VERSION)
        if(!displayChangelog) return;
        showChangelog()
    }

    checkAutoDisplayChangelog()



    // Hey ! Here's a little easter egg for you
    // When doing the word per minute challenge, you can paste the following code in the console to automatically fill the input field with the text to type (giving you average 42000 words per minute)
    // Unfortunately, you can't earn more than 60 points in total for this challenge.
    /*

    (function wordPerMinute() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        function getText() { return [...document.getElementsByClassName("whitespace-pre-wrap font-mono text-lg")[0].children].map(x => x.textContent).join("") }

        async function start() {
            let inputElem = null
            while(true) {
                try {
                    if(!inputElem) {
                        inputElem = document.getElementsByClassName("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")[0]
                    }
                    let text = getText()
                    inputElem.value = text
                    inputElem.dispatchEvent(new Event('input', { bubbles: true }))
            } catch(e) { console.log("error", e) }
                await sleep(10)
            }
        }
    })();

    */

    
    let questions = [
        {
            id: 'AGI',
            answer: 'artificialgeneralintelligence',
            win: 4,
            lose: -3
        },
        {
            id: 'CatQuestion',
            answer: true,
            win: 1,
            lose: -2
        },
        {
            id: 'ShortFormContent',
            answers: {
                "0": 0,
                "1": -1,
                "2": -2,
                "3": -3,
                "4": -4,
                "5": -5,
                "6": -6,
                "7": -7,
                "8": -8,
                "9": -9,
                "10": -10,
                "11": -11,
                "12": -12,
            },
        },
        {
            id: 'Chemistry',
            answer: 'francium',
            win: 10,
            lose: -5
        },
        {
            id: 'GPT',
            answer: 'generativepretrainedtransformer',
            win: 5,
            lose: -3
        },
        {
            id: 'MathQuestion',
            answer: '30',
            win: 8,
            lose: -20
        },
        {
            id: 'ContentCreators',
            answers: {
                "0": 0,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": -1,
                "5": -1,
                "6": -1,
                "7": -1,
                "8": -2,
                "9": -2,
                "10": -2,
                "11": -2,
                "12": -3,
                "13": -3,
                "14": -3,
                "15": -3,
                "16": -4,
                "17": -4,
                "18": -4,
                "19": -4,
                "20": -5,
                "21": -5,
                "22": -5,
                "23": -5,
                "24": -6,
                "25": -6,
                "26": -6,
                "27": -6,
                "28": -7,
                "29": -7,
                "30": -7,
                "31": -7,
                "32": -8,
                "33": -8,
                "34": -8,
                "35": -8,
                "36": -9,
                "37": -9,
                "38": -9,
                "39": -9,
                "40": -10,
                "41": -10,
                "42": -10,
                "43": -10,
                "44": -11,
                "45": -11,
                "46": -11,
                "47": -11,
            }
        },
        {
            id: 'MathProblem',
            answer: '10',
            win: 15,
            lose: -10
        },
        {
            id: 'SequenceSymbol',
            answer: 'idfk',
            win: 10,
            lose: -7
        },
        {
            id: 'SequenceNumber',
            answer: 42,
            win: 9,
            lose: -3
        },
        {
            id: 'Dexerto',
            answer: true,
            win: -25,
            lose: 25,
        },
        {
            id: 'MathProblemComplex',
            answer: '355',
            win: 25,
            lose: 0
        },
        {
            id: 'TypingTest',
            answers: {
                "0": 0,
                "1": 0,
                "2": 1,
                "3": 1,
                "4": 2,
                "5": 2,
                "6": 3,
                "7": 3,
                "8": 4,
                "9": 4,
                "10": 5,
                "11": 5,
                "12": 6,
                "13": 6,
                "14": 7,
                "15": 7,
                "16": 8,
                "17": 8,
                "18": 9,
                "19": 9,
                "20": 10,
                "21": 10,
                "22": 11,
                "23": 11,
                "24": 12,
                "25": 12,
                "26": 13,
                "27": 13,
                "28": 14,
                "29": 14,
                "30": 15,
                "31": 15,
                "32": 16,
                "33": 16,
                "34": 17,
                "35": 17,
                "36": 18,
                "37": 18,
                "38": 19,
                "39": 19,
                "40": 20,
                "41": 20,
                "42": 21,
                "43": 21,
                "44": 22,
                "45": 22,
                "46": 23,
                "47": 23,
                "48": 24,
                "49": 24,
                "50": 25,
                "51": 25,
                "52": 26,
                "53": 26,
                "54": 27,
                "55": 27,
                "56": 28,
                "57": 28,
                "58": 29,
                "59": 29,
                "60": 30,
                "61": 30,
                "62": 31,
                "63": 31,
                "64": 32,
                "65": 32,
                "66": 33,
                "67": 33,
                "68": 34,
                "69": 34,
                "70": 35,
                "71": 35,
                "72": 36,
                "73": 36,
                "74": 37,
                "75": 37,
                "76": 38,
                "77": 38,
                "78": 39,
                "79": 39,
                "80": 40,
                "81": 40,
                "82": 41,
                "83": 41,
                "84": 42,
                "85": 42,
                "86": 43,
                "87": 43,
                "88": 44,
                "89": 44,
                "90": 45,
                "91": 45,
                "92": 46,
                "93": 46,
                "94": 47,
                "95": 47,
                "96": 48,
                "97": 48,
                "98": 49,
                "99": 49,
                "100": 50,
                "101": 50,
                "102": 51,
                "103": 51,
                "104": 52,
                "105": 52,
                "106": 53,
                "107": 53,
                "108": 54,
                "109": 54,
                "110": 55,
                "111": 55,
                "112": 56,
                "113": 56,
                "114": 57,
                "115": 57,
                "116": 58,
                "117": 58,
                "118": 59,
                "119": 59,
                "120": 60
            }
        },
        {
            id: 'AudioRick',
            answer: true,
            win: -13,
            lose: 5
        },
        {
            id: 'Degree',
            answer: true,
            win: 0,
            lose: -5
        },
        {
            id: 'AudioAgeOfWar',
            answer: true,
            win: 15,
            lose: -5
        },
        {
            id: 'British',
            answer: true,
            win: -10,
            lose: 1,
        },
        {
            id: 'Kubernete',
            answer: true,
            win: -3,
            lose: 0
        },
        {
            id: 'ReactionImage',
            answer: true,
            win: -10,
            lose: 5
        },
        {
            id: 'GimmickAccount',
            answer: true,
            win: -5,
            lose: 5
        }
    ]

    // Function to calulate highest score from the questions
    function getHighestScore() {
        let highestScore = 80;
        let answers = []
        for(let question of questions) {
            if(question.hasOwnProperty('answer')) {
                answers.push({
                    id: question.id,
                    answer: question.win > question.lose ? question.answer : "AAAAAAAAAAAAAA"
                })
                highestScore += Math.max(question.win, question.lose)
            } else {

                highestScore += Math.max(...Object.values(question.answers))
                // Get the key for the highest value
                let max = Math.max(...Object.values(question.answers))
                let key = Object.keys(question.answers).find(key => question.answers[key] === max)
                answers.push({
                    id: question.id,
                    answer: key
                })
            }
        }
        return {
            score: highestScore,
            answers: answers
        }
    }


    // Function to calulate lowest score from the questions
    function getLowestScore() {
        let lowestScore = 80;
        let answers = []
        for(let question of questions) {
            if(question.hasOwnProperty('answer')) {
                answers.push({
                    id: question.id,
                    answer: question.win < question.lose ? question.answer : "AAAAAAAAAAAAAA"
                })
                lowestScore += Math.min(question.win, question.lose)
            } else {

                lowestScore += Math.min(...Object.values(question.answers))
                // Get the key for the highest value
                let min = Math.min(...Object.values(question.answers))
                let key = Object.keys(question.answers).find(key => question.answers[key] === min)
                answers.push({
                    id: question.id,
                    answer: key
                })
            }
        }
        return {
            score: lowestScore,
            answers: answers
        }
    }

    function getSmort() {

        function checkIfCreation() {
            let elemList = [...document.getElementsByClassName("w-full rounded-md border-2 border-primary p-4 md:min-w-[400px] md:max-w-[400px]")]
            for(let elem of elemList) {
                let spanList = [...elem.getElementsByTagName("span")]
                for(let span of spanList) {
                    if(span.textContent == "IQ test") {
                        return true
                    }
                }
            }
            return false
        }
        
        if(checkIfCreation()) {
            console.log([`%c \n \n[lyntr+] IQ test detected, looks like you're trying to create a new IQ test.`,
            `[lyntr+] If you want to apply the highest score, run beSmart() in the console.`,
            `[lyntr+] If you want to apply the lowest score, run beDumb() in the console.\n \n `].join("\n"),`color: #000; font-size: 1.2em;background-color:lightgreen;`)
        }

        let higher = {"score":283,"answers":[{"id":"AGI","answer":"artificialgeneralintelligence"},{"id":"CatQuestion","answer":true},{"id":"ShortFormContent","answer":"0"},{"id":"Chemistry","answer":"francium"},{"id":"GPT","answer":"generativepretrainedtransformer"},{"id":"MathQuestion","answer":"30"},{"id":"ContentCreators","answer":"0"},{"id":"MathProblem","answer":"10"},{"id":"SequenceSymbol","answer":"idfk"},{"id":"SequenceNumber","answer":42},{"id":"Dexerto","answer":"AAAAAAAAAAAAAA"},{"id":"MathProblemComplex","answer":"355"},{"id":"TypingTest","answer":"120"},{"id":"AudioRick","answer":"AAAAAAAAAAAAAA"},{"id":"Degree","answer":true},{"id":"AudioAgeOfWar","answer":true},{"id":"British","answer":"AAAAAAAAAAAAAA"},{"id":"Kubernete","answer":"AAAAAAAAAAAAAA"},{"id":"ReactionImage","answer":"AAAAAAAAAAAAAA"},{"id":"GimmickAccount","answer":"AAAAAAAAAAAAAA"}]}
        let lower = {"score":-72,"answers":[{"id":"AGI","answer":"AAAAAAAAAAAAAA"},{"id":"CatQuestion","answer":"AAAAAAAAAAAAAA"},{"id":"ShortFormContent","answer":"12"},{"id":"Chemistry","answer":"AAAAAAAAAAAAAA"},{"id":"GPT","answer":"AAAAAAAAAAAAAA"},{"id":"MathQuestion","answer":"AAAAAAAAAAAAAA"},{"id":"ContentCreators","answer":"44"},{"id":"MathProblem","answer":"AAAAAAAAAAAAAA"},{"id":"SequenceSymbol","answer":"AAAAAAAAAAAAAA"},{"id":"SequenceNumber","answer":"AAAAAAAAAAAAAA"},{"id":"Dexerto","answer":true},{"id":"MathProblemComplex","answer":"AAAAAAAAAAAAAA"},{"id":"TypingTest","answer":"0"},{"id":"AudioRick","answer":true},{"id":"Degree","answer":"AAAAAAAAAAAAAA"},{"id":"AudioAgeOfWar","answer":"AAAAAAAAAAAAAA"},{"id":"British","answer":true},{"id":"Kubernete","answer":true},{"id":"ReactionImage","answer":true},{"id":"GimmickAccount","answer":true}]}
        // Function to apply score in the localStorage
        function applyScore(type, answers) {
            for(let answer of answers) {
                localStorage.setItem(answer.id, `${answer.answer}`)
            }
            localStorage.setItem("current_question", "20")
            localStorage.setItem("lyntr-plus-beSmort", "true")
            localStorage.setItem("lyntr-plus-beSmort-applied",type)
        }
    
        window.beSmart  = function() {
            applyScore("highest", higher.answers)
            console.log(`%cCongrats! You are now smart (${higher.score} IQ) !`, `color: #009900; font-size: 2em;`)
            console.log(`Automatically reloading in 3 second...`)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
        window.beDumb   = function() {
            applyScore("lowest", lower.answers)
            console.log(`%cCongrats! You are now dumb (${lower.score} IQ) !`, `color: #990000; font-size: 2em;`)
            console.log(`Automatically reloading in 3 second...`)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
    
    }
    window.addEventListener("load", () => {
        setTimeout(() => {
            getSmort()
        }, 1000)
    })


    } catch(error) {
        console.error(`[Lyntr+] Error: ${error}`)
        alert(`[Lyntr+] Lyntr+ encountered an error, please check the console for more information. If possible, update to last version of Lyntr+`)
    }

})();





