/**
 * Flourishes.
 */
(function () {
    var el = document.getElementById('sizzle-reel');
    el.addEventListener('ended', function () {
        // Just redirect when we're done watching the sizzle reel for this party.
        window.location =  window.location.protocol + '//' + window.location.host + '/assets/hex90-trailer/trailer.html';
    });
})();
