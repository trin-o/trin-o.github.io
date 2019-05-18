document.addEventListener('pjax:error', () => { console.log('Event: pjax:error'); });
document.addEventListener('pjax:prefetch', () => { console.log('Event: pjax:prefetch'); });
document.addEventListener('pjax:cancel', () => { console.log('Event: pjax:cancel'); });
document.addEventListener('pjax:scriptContentLoaded', () => { console.log('Event: pjax:scriptContentLoaded'); });
document.addEventListener('pjax:send', (e) => { console.log('Event: pjax:send', e); });
document.addEventListener('pjax:complete', () => {
    console.log('Event: pjax:complete');
    navActive();
});

new Pjax({
    elements: ".nav-link",
    selectors: ["main"],
    debug: true
});

function navActive() {
    var pgurl = window.location.pathname;
    if (pgurl.length > 1) {
        pgurl = pgurl.slice(0, -1);
    }
    $("nav a").each(function() {
        if ($(this).attr("href") == pgurl)
            $(this).addClass("active");
        else
            $(this).removeClass("active");
    })
}

function start() {
    navActive();
}