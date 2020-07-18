function selectedActive(elem) {
        var selectedAttr = $(elem),
                selectionID = "." + $(selectedAttr).data("select");

        $(".selecton a").removeClass("active");
        $(selectedAttr).addClass("active");
        $(".food-menu").removeClass("active");

        if (selectionID == ".*") $(".food-menu").addClass("active");
        else $(selectionID).addClass("active");
}

function selectedDailyActive(elem) {
        var selectedAttr = $(elem),
                selectionID = "." + $(selectedAttr).data("select");

        $(".dailySelecton a").removeClass("active");
        $(selectedAttr).addClass("active");
        $(".daily-menu").removeClass("active");

        if (selectionID == ".*") $(".daily-menu").addClass("active");
        else $(selectionID).addClass("active");
}

function selectedPizzaActive(elem) {
        var selectedAttr = $(elem),
                selectionID = "." + $(selectedAttr).data("select");

        $(".pizzaSelecton a").removeClass("active");
        $(selectedAttr).addClass("active");
        $(".pizza-menu").removeClass("active");

        if (selectionID == ".*") $(".pizza-menu").addClass("active");
        else $(selectionID).addClass("active");
}


function enableCounterUp(a) {
        var counterElement;
        if (isExists('#counter')) {
                counterElement = $('#counter');
        } else {
                return;
        }
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
                        var $this = $(this),
                                countDuration = $this.data('duration'),
                                countTo = $this.attr('data-count');
                        $({
                                countNum: $this.text()
                        }).animate({
                                countNum: countTo
                        }, {
                                duration: countDuration,
                                easing: 'swing',
                                step: function () {
                                        $this.text(Math.floor(this.countNum));
                                },
                                complete: function () {
                                        $this.text(this.countNum);
                                }
                        });
                });
                a = 1;
        }
        return a;
}

function panelAccordian() {

        var panelTitle = $('.panel-title');
        panelTitle.on('click', function () {
                $(this).toggleClass('active');
                return false;
        });

}


function enableRadialProgress() {
        $(".radial-progress").each(function () {
                var $this = $(this),
                        progPercent = $this.data('prog-percent');

                var bar = new ProgressBar.Circle(this, {
                        color: '#fff',
                        strokeWidth: 3,
                        trailWidth: 0,
                        easing: 'easeInOut',
                        duration: 1400,
                        text: {},
                        from: {
                                color: '#fff',
                                width: 1
                        },
                        to: {
                                color: '#EF002E',
                                width: 3
                        },
                        // Set default step function for all animate calls
                        step: function (state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) {
                                        circle.setText('');
                                } else {
                                        circle.setText(value);
                                }
                        }
                });

                $(this).waypoint(function () {
                        bar.animate(progPercent);
                }, {
                        offset: "90%"
                })
        });
}

(function ($) {

        "use strict";

        // ACCORDIAN

        panelAccordian();

        // RADIAL PROGRESS BAR
        enableRadialProgress();

        enableSwiper();

        $(`#${new Date().getDay()}day`).addClass("active")

        /*COUNTER*/
        var countLineProgress = 0;
        var countCounterUp = 0;
        var a = 0;
        countCounterUp = enableCounterUp(countCounterUp);

        $(window).on('scroll', function () {
                countCounterUp = enableCounterUp(countCounterUp);
        });

        /*CUSTOME ISOTOPE*/
        var selectedAttr = $('.selecton [data-select].active');
        selectedActive(selectedAttr);

        $('.selecton [data-select]').on("click", function () {
                var selectedAttr = $(this);
                selectedActive(selectedAttr);
                return false;
        });

        var selectedDailyAttr = $('.dailySelecton [data-select].active');
        selectedDailyActive(selectedDailyAttr);

        $('.dailySelecton [data-select]').on("click", function () {
                var selectedDailyAttr = $(this);
                selectedDailyActive(selectedDailyAttr);
                return false;
        });

        var selectedPizzaAttr = $('.pizzaSelecton [data-select].active');
        selectedPizzaActive(selectedPizzaAttr);

        $('.pizzaSelecton [data-select]').on("click", function () {
                var selectedPizzaAttr = $(this);
                selectedPizzaActive(selectedPizzaAttr);
                return false;
        });


        // DROPDOWN MENU

        var winWidth = $(window).width();
        dropdownMenu(winWidth);

        $(window).on('resize', function () {
                winWidth = $(window).width();
                dropdownMenu(winWidth);

        });


        $('[data-menu]').on('click', function () {

                var mainMenu = $(this).data('menu');

                $(mainMenu).toggleClass('visible-menu');

        });

        $.get("https://playludo.live/pizza/reviews", function (data) {
                for (const item of data.items) {
                        let string = `<div class="reviewContainer">
                <p style="overflow: hidden;text-overflow: ellipsis;"><span class="name">${item.name || ""}</span>${item.title || ""}</p>
                ${item.comment? '<p class="des">'+item.comment+'</p>'+getStars(item.stars || 5): '<p class="emptyDes"></p>'+getStars(item.stars || 5)}</div>`
                        $("#scrollReview").append(string)
                }
        });

        $(".rating input:radio").attr("checked", false);

        $('.rating input').click(function () {
                $(".rating span").removeClass('checked');
                switch (this.id) {
                        case 'str1':
                                $('#str1').parent().addClass('checked');
                                break;
                        case 'str2':
                                $('#str1').parent().addClass('checked');
                                $('#str2').parent().addClass('checked');
                                break;
                        case 'str3':
                                $('#str1').parent().addClass('checked');
                                $('#str2').parent().addClass('checked');
                                $('#str3').parent().addClass('checked');
                                break;
                        case 'str4':
                                $('#str1').parent().addClass('checked');
                                $('#str2').parent().addClass('checked');
                                $('#str3').parent().addClass('checked');
                                $('#str4').parent().addClass('checked');
                                break;
                        case 'str5':
                                $('#str1').parent().addClass('checked');
                                $('#str2').parent().addClass('checked');
                                $('#str3').parent().addClass('checked');
                                $('#str4').parent().addClass('checked');
                                $('#str5').parent().addClass('checked');
                                break;
                }
        });

        $('input:radio').change(
                function () {
                        $('#starsValue').val(this.value)
                });

        $("form").submit(function (e) {
                e.preventDefault();
                let name = $('#nameInput').val()
                let comment = $('#commentInput').val()
                let stars = $('#starsValue').val()
                if (!name) {
                        alert("Name is Required")
                        return
                }
                if (!comment) {
                        alert("Comment is Required")
                        return
                }
                if (!stars) {
                        alert("Stars are Required")
                        return
                }
                $.post("https://playludo.live/pizza/reviews", {
                        name: name,
                        comment: comment,
                        stars: stars
                }, function (data) {
                        alert(`Feedback Submitted`);
                        $(".rating span").removeClass('checked');
                        $('#nameInput').val(null)
                        $('#commentInput').val(null)
                        $('#starsValue').val(null)
                });
        });

})(jQuery);


function getStars(starts) {
        let elem = ""
        switch (starts) {
                case 1:
                        elem = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`
                        break;
                case 2:
                        elem = elem = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>`
                        break;
                case 3:
                        elem = elem = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>`
                        break;
                case 4:
                        elem = elem = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>`
                        break;
                case 5:
                        elem = elem = `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>`
                        break;
        }
        return elem
}

function dropdownMenu(winWidth) {

        if (winWidth > 767) {

                $('.main-menu li.drop-down').on('mouseover', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.addClass('mouseover');

                }).on('mouseleave', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.removeClass('mouseover');
                });

        } else {

                $('.main-menu li.drop-down > a').on('click', function () {

                        if ($(this).attr('href') == '#') return false;
                        if ($(this).hasClass('mouseover')) {
                                $(this).removeClass('mouseover');
                        } else {
                                $(this).addClass('mouseover');
                        }
                        return false;
                });
        }

}

function enableSwiper() {

        if (isExists('.swiper-container')) {

                $('.swiper-container').each(function (index) {

                        var swiperDirection = $(this).data('swiper-direction'),
                                swiperSlidePerView = $(this).data('swiper-slides-per-view'),
                                swiperBreakpoints = $(this).data('swiper-breakpoints'),
                                swiperSpeed = $(this).data('swiper-speed'),
                                swiperCrossFade = $(this).data('swiper-crossfade'),
                                swiperLoop = $(this).data('swiper-loop'),
                                swiperAutoplay = $(this).data('swiper-autoplay'),
                                swiperMousewheelControl = $(this).data('swiper-wheel-control'),
                                swipeSlidesPerview = $(this).data('slides-perview'),
                                swiperMargin = parseInt($(this).data('swiper-margin')),
                                swiperSlideEffect = $(this).data('slide-effect'),
                                swiperAutoHeight = $(this).data('autoheight'),
                                swiperScrollbar = ($(this).data('scrollbar') ? $(this).parentsUntil('.swiper-area').find('.swiper-scrollbar') : null);
                        swiperScrollbar = (isExists(swiperScrollbar) ? swiperScrollbar : null),
                                swprResponsive = $(this).data('swpr-responsive');

                        var swiper = new Swiper($(this)[0], {
                                pagination: $(this).find('.swiper-pagination'),
                                slidesPerView: (swiperSlidePerView ? swiperSlidePerView : 1),
                                direction: (swiperDirection ? swiperDirection : 'horizontal'),
                                loop: (swiperLoop ? swiperLoop : false),
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                autoplay: (swiperAutoplay ? swiperAutoplay : false),
                                paginationClickable: true,
                                spaceBetween: (swiperMargin ? swiperMargin : 0),
                                mousewheelControl: ((swiperMousewheelControl) ? swiperMousewheelControl : false),
                                scrollbar: (swiperScrollbar ? swiperScrollbar : null),
                                scrollbarHide: false,
                                speed: (swiperSpeed ? swiperSpeed : 1000),
                                autoHeight: ((swiperAutoHeight == false) ? swiperAutoHeight : true),
                                effect: (swiperSlideEffect ? swiperSlideEffect : 'coverflow'),
                                fade: {
                                        crossFade: swiperCrossFade ? swiperCrossFade : false
                                },
                                breakpoints: {
                                        1200: {
                                                slidesPerView: swprResponsive[3] ? swprResponsive[3] : 1,
                                        },
                                        992: {
                                                slidesPerView: swprResponsive[2] ? swprResponsive[2] : 1,
                                        },
                                        768: {
                                                slidesPerView: swprResponsive[1] ? swprResponsive[1] : 1,
                                        },
                                        576: {
                                                slidesPerView: swprResponsive[0] ? swprResponsive[0] : 1,
                                        }

                                },
                        });

                        $('.swiper-container').hover(function () {
                                swiper.stopAutoplay();
                        }, function () {
                                swiper.startAutoplay();
                        });


                });


        }
}

function isExists(elem) {
        if ($(elem).length > 0) {
                return true;
        }
        return false;
}

function initMap() {

        // Create a map object, and include the MapTypeId to add
        // to the map type control.

        var uluru = {
                lat: 56.946285,
                lng: 24.105078
        };
        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
        });

        var image = 'images/google-marker.png';
        var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                icon: image
        });
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
}