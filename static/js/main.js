/**
 * Flourishes.
 */
(function () {
    var el = document.getElementById('sizzle-reel');
    var vids = JSON.parse(el.dataset.videos);
    var i = Math.floor(Math.random() * vids.length);
    el.addEventListener('ended', function () {
        i = i + 1;
        if (! vids[i]) {
            i = 0;
        }
        this.setAttribute('src', vids[i].src);
        this.setAttribute('poster', vids[i].poster);
        this.load();
        this.querySelector('a').setAttribute('href', vids[i].src);
    });
    document.addEventListener('DOMContentLoaded', function () {
        el.setAttribute('src', vids[i].src);
        el.querySelector('a').setAttribute('href', vids[i].src);
    });
})();
