
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    //ドロワーメニュー
  $(".js-hamburger ").click(function () {
    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    } else {
      $(this).addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
      $(".header").addClass("is-open");
    }
  });

   //メニュー内リンクのクリック処理
   $(".js-sp-nav a").click(function (event) {
    const target = $(this).attr("href");

    if (target.startsWith("#")) {
      event.preventDefault();
      const position = $(target).offset().top;

      $("html, body").animate({ scrollTop: position }, 500);

      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    } else {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
    }
  });

  //PC幅にしたときハンバーガーメニューとドロワーを閉じる
  $(window).resize(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
      $("body").css({ height: "", overflow: "" });
    }
  });

  //ハンバーガーメニュー展開時背景をスクロールさせない方法
  $(".js-hamburger .js-sp-nav").click(function () {
    if ($("body").css("overflow") === "hidden") {
      $("body").css({ height: "", overflow: "" });
    } else {
      $("body").css({ height: "100%", overflow: "hidden" });
    }
  });

});

//スクロールイベントでページトップボタンを表示/非表示
$(function () {
  $(".js-page-top").hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 70) {
      $(".js-page-top").fadeIn();
    } else {
      $(".js-page-top").fadeOut();
    }
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = $('footer').outerHeight();

    if (scrollHeight - scrollPosition <= footHeight) {
      $(".js-page-top").css({
        "position": "absolute",
        "bottom": 16 + footHeight,
      });
    } else {
      $(".js-page-top").css({
        "position": "fixed",
        "bottom": "16px",
      });
    }
  });
});