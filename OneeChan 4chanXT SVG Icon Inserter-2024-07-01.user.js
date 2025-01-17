// ==UserScript==
// @name         OneeChan-4chanXT-Icon-Inserter
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  try to take over the world!
// @author       You
// @match        https://boards.4chan.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=4chan.org
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        #OneeChanLink {
            font-size: 0;
        }
    `);

    // TODO: There might be a CSS solution that can do this without the javascript. It instead uses: 
    //  #OneeChanLink::before {
    //      content: url('data:image/svg+xml;utf8,<svg>...</svg>');
    //  }
    // Basically, putting the svg in a data URL - unfortunately, I've messed with it and I can't get this solution to work. Maybe for another attempt in the future :^).
    
    // TODO: Currently, on larger pages, I think OneeChan appends its button before 4chanXInitFinished fires. 
    // Hence, the text "OneeChan" appears for a fraction of a second. 
    // I should probably replace the event listener with another mechanism that detects when #shortcuts is created
    
    function replace_Oneechan_link_with_inline_svg_icon() 
    {
        const OneeChan_link = document.querySelector("#OneeChanLink");

        //replace classes fa fa-icon with settings-link
        OneeChan_link.classList.remove(...OneeChan_link.classList);
        OneeChan_link.classList.add("settings-link");

        //remove "OneeChan" text - technically not necessary due to the innerHTML setting right after 
        OneeChan_link.textContent = "";

        const inline_svg = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="125 175 1698 1698"><path d="M896,1024c0-70.667-25-131-75-181s-110.333-75-181-75s-131,25-181,75s-75,110.333-75,181s25,131,75,181s110.333,75,181,75  s131-25,181-75S896,1094.667,896,1024z M1664,1536c0-34.667-12.667-64.667-38-90s-55.333-38-90-38s-64.667,12.667-90,38  s-38,55.333-38,90c0,35.333,12.5,65.5,37.5,90.5s55.167,37.5,90.5,37.5s65.5-12.5,90.5-37.5S1664,1571.333,1664,1536z M1664,512  c0-34.667-12.667-64.667-38-90s-55.333-38-90-38s-64.667,12.667-90,38s-38,55.333-38,90c0,35.333,12.5,65.5,37.5,90.5  s55.167,37.5,90.5,37.5s65.5-12.5,90.5-37.5S1664,547.333,1664,512z M1280,933v185c0,6.667-2.333,13.167-7,19.5s-10,9.833-16,10.5  l-155,24c-7.333,23.333-18,48.667-32,76c22.667,32,52.667,70.333,90,115c4.667,6.667,7,13.333,7,20c0,8-2.333,14.333-7,19  c-15.333,20-42.833,49.833-82.5,89.5s-65.833,59.5-78.5,59.5c-7.333,0-14.333-2.333-21-7l-115-90c-24.667,12.667-50.333,23-77,31  c-7.333,72-15,123.667-23,155c-4.667,16-14.667,24-30,24H547c-7.333,0-14-2.5-20-7.5s-9.333-10.833-10-17.5l-23-153  c-22.667-6.667-47.667-17-75-31l-118,89c-4.667,4.667-11.333,7-20,7c-7.333,0-14.333-2.667-21-8c-96-88.667-144-142-144-160  c0-6,2.333-12.333,7-19c6.667-9.333,20.333-27,41-53s36.333-46.333,47-61c-15.333-29.333-27-56.667-35-82l-152-24  c-6.667-0.667-12.333-3.833-17-9.5s-7-12.167-7-19.5V930c0-6.667,2.333-13.167,7-19.5s10-9.833,16-10.5l155-24  c7.333-23.333,18-48.667,32-76c-22.667-32-52.667-70.333-90-115c-4.667-7.333-7-14-7-20c0-8,2.333-14.667,7-20  c14.667-20,42-49.667,82-89s66.333-59,79-59c7.333,0,14.333,2.333,21,7l115,90c22.667-12,48.333-22.667,77-32  c7.333-72,15-123.333,23-154c4.667-16,14.667-24,30-24h186c7.333,0,14,2.5,20,7.5s9.333,10.833,10,17.5l23,153  c22.667,6.667,47.667,17,75,31l118-89c5.333-4.667,12-7,20-7c7.333,0,14.333,2.667,21,8c96,88.667,144,142,144,160  c0,6-2.333,12.333-7,19c-8,10.667-22,28.667-42,54s-35,45.333-45,60c15.333,32,26.667,59.333,34,82l152,23  c6.667,1.333,12.333,4.833,17,10.5S1280,925.667,1280,933z M1920,1466v140c0,10.667-49.667,21-149,31c-8,18-18,35.333-30,52  c34,75.333,51,121.333,51,138c0,2.667-1.333,5-4,7c-81.333,47.333-122.667,71-124,71c-5.333,0-20.667-15.667-46-47s-42.667-54-52-68  c-13.333,1.333-23.333,2-30,2s-16.667-0.667-30-2c-9.333,14-26.667,36.667-52,68s-40.667,47-46,47c-1.333,0-42.667-23.667-124-71  c-2.667-2-4-4.333-4-7c0-16.667,17-62.667,51-138c-12-16.667-22-34-30-52c-99.333-10-149-20.333-149-31v-140  c0-10.667,49.667-21,149-31c8.667-19.333,18.667-36.667,30-52c-34-75.333-51-121.333-51-138c0-2.667,1.333-5,4-7  c2.667-1.333,14.333-8,35-20s40.333-23.333,59-34s28.667-16,30-16c5.333,0,20.667,15.5,46,46.5s42.667,53.5,52,67.5  c13.333-1.333,23.333-2,30-2s16.667,0.667,30,2c34-47.333,64.667-84.667,92-112l6-2c2.667,0,44,23.333,124,70c2.667,2,4,4.333,4,7  c0,16.667-17,62.667-51,138c11.333,15.333,21.333,32.667,30,52C1870.333,1445,1920,1455.333,1920,1466z M1920,442v140  c0,10.667-49.667,21-149,31c-8,18-18,35.333-30,52c34,75.333,51,121.333,51,138c0,2.667-1.333,5-4,7  c-81.333,47.333-122.667,71-124,71c-5.333,0-20.667-15.667-46-47s-42.667-54-52-68c-13.333,1.333-23.333,2-30,2s-16.667-0.667-30-2  c-9.333,14-26.667,36.667-52,68s-40.667,47-46,47c-1.333,0-42.667-23.667-124-71c-2.667-2-4-4.333-4-7c0-16.667,17-62.667,51-138  c-12-16.667-22-34-30-52c-99.333-10-149-20.333-149-31V442c0-10.667,49.667-21,149-31c8.667-19.333,18.667-36.667,30-52  c-34-75.333-51-121.333-51-138c0-2.667,1.333-5,4-7c2.667-1.333,14.333-8,35-20s40.333-23.333,59-34s28.667-16,30-16  c5.333,0,20.667,15.5,46,46.5s42.667,53.5,52,67.5c13.333-1.333,23.333-2,30-2s16.667,0.667,30,2c34-47.333,64.667-84.667,92-112  l6-2c2.667,0,44,23.333,124,70c2.667,2,4,4.333,4,7c0,16.667-17,62.667-51,138c11.333,15.333,21.333,32.667,30,52  C1870.333,421,1920,431.333,1920,442z" fill="currentColor"></path></svg>`
        OneeChan_link.innerHTML = inline_svg;
        OneeChan_link.firstChild.style.overflow = "visible"; //to allow overflowing the icon boundary
    }

    function has_OneeChan_appended_settings_button()
    {
        return document.querySelector("#OneeChanLink") !== null;
    }

    function after_4chanX_finished() 
    {
        //The 4chanX(T) header should be available now, however, Oneechan takes a little while to add its own settings button
        const shortcuts = document.querySelector("#shortcuts");

        //If the OneeChan settings button exists now, replace it
        if (has_OneeChan_appended_settings_button()) 
        {
            replace_Oneechan_link_with_inline_svg_icon();
        }
        else //If not, wait for OneeChan to add its settings button
        {
            const observer = new MutationObserver((e) => {
                if (has_OneeChan_appended_settings_button()) //check if the mutation made to the "#shortcuts" children is OneeChan appending the button or not
                {
                    replace_Oneechan_link_with_inline_svg_icon();
                    observer.disconnect();
                }
            });
    
            observer.observe(shortcuts, { childList: true }); //will call the callback every time a child of #shortcuts is appended or removed (in our case, appended)
        }
    }

    //4chanX(T) provides an event for userscripts to use when it's finished initializing: https://github.com/ccd0/4chan-x/wiki/4chan-X-API
    document.addEventListener("4chanXInitFinished", after_4chanX_finished);

})();



