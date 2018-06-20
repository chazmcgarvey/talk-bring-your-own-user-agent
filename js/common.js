
/*
 * Create a shortcut on a number key to jump to a named slide.
 *
 * Using the hotkey on the target slide will go "back" to the slide that was active before jumping
 * to the target slide.
 *
 * Example: Jump to the slide named "myslide" when the "1" key is pressed.
 *   createHotkey(1, 'myslide');
 */
function createHotkey(key, slideName) {
    var targetSlide = slideshow.getSlideByName(slideName);
    var lastSlide   = -1;
    document.addEventListener('keydown', function(e) {
        if (e.which === key + 48) {
            var currentNum  = slideshow.getCurrentSlideIndex() + 1;
            var targetNum   = targetSlide.getSlideIndex() + 1;
            if (currentNum !== targetNum) {
                lastSlide = currentNum;
                slideshow.gotoSlide(targetNum);
            }
            else {
                slideshow.gotoSlide(lastSlide);
            }
        }
    });
};

/*
 * Set a hotkey "u" to navigate backwards in time.
 *
 * If you get on the wrong slide, this might be the easiest way to get back on track. This is what
 * you might expect the browser's "Back" button to do if it worked.
 */
(function() {
    var history = [];
    var skip    = false;
    slideshow.on('hideSlide', function(slide) {
        if (skip) {
            skip = false;
            return;
        }
        history.push(slide.getSlideIndex() + 1);
    });
    document.addEventListener('keydown', function(e) {
        if (e.which === 85 /* [u]ndo */) {
            var lastNum = history.pop();
            if (lastNum) {
                skip = true;
                slideshow.gotoSlide(lastNum);
            }
        }
    });
})();

