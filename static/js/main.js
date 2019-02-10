/**
 * Flourishes.
 */
(function () {
    var v = document.getElementById('sizzle-reel');
    v.addEventListener('ended', function () {
        this.load();
    });
}());
