(function () {
	var header = document.getElementById("mainHeader");

	function changeHeader() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		header.classList.toggle("header-background", scrollTop >= 50 || document.body.classList.contains("nav-open"));
	}

	var didScroll = false;

	$(window).scroll(function () {
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			didScroll = false;
			changeHeader();
		}
	}, 100);

	changeHeader();

	document.getElementById("open-nav").addEventListener("click", function (event) {
		event.preventDefault();
		document.body.classList.toggle("nav-open");
		changeHeader();
	});

	$("a[href*=\\#]").on("click", function (event) {
		event.preventDefault();

		$("html, body").animate({
			scrollTop: $(this.hash).offset().top
		}, 500);
	});

    /*Scroll to top when arrow up clicked BEGIN*/
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 200) {
            $('#back2Top').fadeIn();
        } else {
            $('#back2Top').fadeOut();
        }
    });

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 400) {
            $('#ad-block-vertical').fadeIn();
        } else {
            $('#ad-block-vertical').fadeOut('fast');
        }
    });

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 400) {
            $('#share-bar').fadeIn();
        } else {
            $('#share-bar').fadeOut('fast');
        }
    });

    $(document).ready(function() {
        $("#back2Top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "fast");
            return false;
        });

	});

    $(document).ready(function() {
        $('.random-images').css({'background-image': 'url(/images/random/' + Math.floor(Math.random() * 13) + '.jpg)'});
    });

    (function() {
        var pre = document.getElementsByTagName('pre'),
            pl = pre.length;
        for (var i = 0; i < pl; i++) {
            pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
            var num = pre[i].innerHTML.split(/\n/).length;
            for (var j = 0; j < (num - 1); j++) {
                var line_num = pre[i].getElementsByTagName('span')[0];
                line_num.innerHTML += '<span>' + (j + 1) + '</span>';
            }
        }
    })();

    document.addEventListener("DOMContentLoaded", function() {
        var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
        var active = false;

        var lazyLoad = function() {
            if (active === false) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    });

    $(document).ready(function(){
        (adsbygoogle = window.adsbygoogle || []).push({});
    });
})();


