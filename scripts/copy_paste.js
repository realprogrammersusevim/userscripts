// ==UserScript==
// @name         Don't Fuck with Copy or Paste
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Allows copy-paste on all websites with a rerun command in the extension menu
// @match        *://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    // Function to enable copy-paste functionality
    function enableCopyPaste() {
        document.addEventListener('keydown', function(event) {
            if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v' || event.key === 'x')) {
                event.stopPropagation();
            }
        }, true);

        document.addEventListener('contextmenu', function(event) {
            event.stopPropagation();
        }, true);

        document.querySelectorAll('input, textarea').forEach(element => {
            element.removeAttribute('oncopy');
            element.removeAttribute('onpaste');
            element.removeAttribute('oncut');
            element.removeAttribute('onselectstart');
            element.removeAttribute('oncontextmenu');
        });

        document.oncopy = null;
        document.onpaste = null;
        document.oncut = null;
        document.oncontextmenu = null;

        console.log("Copy-paste restrictions disabled.");
    }

    // Register a command in the Violentmonkey extension menu to rerun the enableCopyPaste function
    GM_registerMenuCommand("Re-enable Copy-Paste", enableCopyPaste);

    // Run enableCopyPaste only after the page has fully loaded
    window.addEventListener('DOMContentLoaded', enableCopyPaste);
})();
