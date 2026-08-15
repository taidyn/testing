function theater_mode() {
    if (!document.body.classList.contains("is_fullscreen")) {
        let header_game = document.getElementById("header_game");
        if (!header_game.classList.contains("header_game_block")) {
            header_game.classList.add("header_game_block");
        }
        var e = document.getElementById("iframe_box"),
            t = document.getElementById("iframehtml5");
        null != e && (null !== t && t.focus(),
            e = document.documentElement,
            document.body.classList.add("is_fullscreen"),
            e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.msRequestFullscreen && e.msRequestFullscreen())
    } else {
        cancel_fullscreen();
    }
}

function force_fullscreen() {
    let header_game = document.getElementById("header_game");
    if (header_game.classList.contains("header_game_block")) {
        header_game.classList.remove("header_game_block");
    }
    var e = document.getElementById("iframe_box"),
        t = document.getElementById("iframehtml5");
    null != e && (null !== t && t.focus(),
        e = document.documentElement,
        document.body.classList.add("is_fullscreen"),
        e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.msRequestFullscreen && e.msRequestFullscreen())
}

function cancel_fullscreen() {
    document.body.classList.remove("is_fullscreen");
    var e = document.getElementById("iframehtml5");
    null !== e && e.focus(),
        document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
}

function exitHandler() {
    document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.body.classList.remove("is_fullscreen")
}

document.addEventListener && (document.addEventListener("fullscreenchange", exitHandler, false),
    document.addEventListener("mozfullscreenchange", exitHandler, false),
    document.addEventListener("MSFullscreenChange", exitHandler, false),
    document.addEventListener("webkitfullscreenchange", exitHandler, false))


// ============================ Header ================================= 
let lazyLoadImg = document.querySelectorAll(".lazy");
if (lazyLoadImg.length) {
    lazyload(lazyLoadImg);
}

var mask_category = document.querySelector(".mask_category");
var category_list = document.querySelector(".category_search").querySelector("nav");
var mask_category_close = mask_category.querySelector(".close");
mask_category_close.before(category_list.cloneNode(true));
mask_category_close.addEventListener("click", close_category_mask);
mask_category.addEventListener("click", function (e) {
    if (e.currentTarget === e.target) close_category_mask();
});
function tirgger_category_mask() {
    mask_category.classList.add("active");

    let lazyLoadImg = document.querySelectorAll(".lazy");
    if (lazyLoadImg.length) {
        lazyload(lazyLoadImg);
    }
}
function close_category_mask() {
    mask_category.classList.remove("active");
}
function tirgger_search_mask(obj) {
    obj.classList.toggle("active");
    document.body.classList.toggle("mobile_mask");
    document.querySelector("header").classList.toggle("mobile_active");
}
function close_search_mask() {
    document.querySelector(".search_trigger").dispatchEvent(new Event("click"));
}

// search
$('.btn_get_search').on('click', function () {
    gameSearch()
})

$('.input_search').on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        gameSearch()
    }
})
function gameSearch() {
    let keywords = $(".input_search").val();
    let rex_rule = /[ \`\-\.?:\\\/\_\'\*]+/g;
    var value1 = keywords.replace(rex_rule, " ").trim().toLowerCase();
    value1 = value1.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var url = '/search/' + value1;
    if (value1 && oldValue != value1) {
        oldValue = value1;
        window.location.href = url;
    }
}

// ============================ click pagination.php + show gif loading 
function paging(p) {
    $(".loading_mask").removeClass("hidden-load");
    if (!p) {
        p = 1;
    }
    let url = "/paging.ajax";
    $.ajax({
        async: true,
        url: url,
        type: "POST",
        data: {
            p: p,
            keywords: keywords,
            field_order: field_order,
            order_type: order_type,
            category_id: category_id,
            is_hot: is_hot,
            is_new: is_new,
            tag_id: tag_id,
            limit: limit,
        },
        success: function (response) {
            $(".loading_mask").addClass("hidden-load");
            $('html, body').animate({
                scrollTop: $(".scroll-top").offset().top
            }, 1000);
            if (response) {
                // $("#ajax-append").html(response);
                let data = JSON.parse(response);
                $("#ajax-append").html(data.html);
                $("#pagination").html(data.pagination);

                let lazyLoadImg = document.querySelectorAll(".lazy");
                if (lazyLoadImg.length) {
                    lazyload(lazyLoadImg);
                }
                // video_intro()
                initThumbHover(document);
            }
        }
    })
}

function paging_posts(p) {
    $(".loading_mask").removeClass("hidden-load");
    if (!p) {
        p = 1;
    }
    let url = '/paging_posts.ajax';
    $.ajax({
        async: true,
        url: url,
        type: "POST",
        data: {
            page: p,
            keywords: keywords,
            order_by: order_by,
            order_type: order_type,
            tag_id: tag_id,
            category_id: category_id,
            limit: limit
        },
        success: function (response) {
            $(".loading_mask").addClass("hidden-load");
            if (response !== '') {
                // document.getElementById("post_item_ajax").innerHTML = (response);
                $("#post_item_ajax").html(response);

                let lazyLoadImg = document.querySelectorAll(".lazy");
                if (lazyLoadImg.length) {
                    lazyload(lazyLoadImg);
                }
            }
            $('html, body').animate({
                scrollTop: $(".scroll-top").offset().top
            }, 1000);
        }
    })
}


// $(document).ready(function () {
//     if (!ads_cached_html) {
//         // console.log('addPlugin');
//         addPlugin(); // ajax full_rate + comment
//     }
// })

// // ajax full_rate + comment
// function addPlugin() {
//     if (!id_game && !url_game) {
//         return
//     }
//     let url = "/add-plugin.ajax";
//     $.ajax({
//         async: true,
//         url: url,
//         type: "POST",
//         data: {
//             id_game: id_game,
//             url_game: url_game,
//         },
//         success: function (response) {
//             if (response) {
//                 let data = JSON.parse(response);
//                 $("#append-rate").html(data.rate);
//                 $("#append-comment").html(data.comment);
//             }
//         }
//     })
// }

// copy embed
function copyToClipboard(e, t) {
    var o = $("<input>");
    $("body").append(o),
        $(e).select(),
        document.execCommand("Copy"),
        $(t).html("COPIED!"),
        setTimeout(function () {
            $(t).html("COPY")
        }, 3e3),
        o.remove()
}

// ============ total-like =============
$("#like_btn").one("click", function () {
    let value = $('#like_count').text();
    let number = parseInt(value) + 1;
    // console.log(html_cached);
    if (html_cached) {
        var url_like = '/like-game.ajax?id_game=' + id_game;
        var type_like = 'GET';
        var data_like = '';
    } else {
        var url_like = '/like-game.ajax';
        var type_like = 'POST';
        var data_like = {
            id_game: id_game,
        };
    }
    $.ajax({
        url: url_like,
        type: type_like,
        data: data_like,
        success: function () {
            $("#like_btn").addClass('like_btn_active').prop('disabled', true);
            $('#like_count').html(number);
        }
    })
})
