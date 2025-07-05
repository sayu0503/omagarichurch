
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  $(function () {
    // ドロワーメニューの開閉
    $(".js-hamburger").click(function () {
      if ($(this).hasClass("is-active")) {
        // メニューを閉じる
        $(this).removeClass("is-active");
        $(".js-sp-nav").fadeOut(300);
        $(".header").removeClass("is-open");
        $("body").css("overflow", "auto"); // 背景スクロールを戻す
      } else {
        // メニューを開く
        $(this).addClass("is-active");
        $(".js-sp-nav").fadeIn(300);
        $(".header").addClass("is-open");
        $("body").css("overflow", "hidden"); // 背景を固定
      }
    });

    // メニュー内リンクをクリックした時
    $(".js-sp-nav a").click(function (event) {
      const target = $(this).attr("href");

      if (target.startsWith("#")) {
        event.preventDefault();
        const position = $(target).offset().top;

        $("html, body").animate({ scrollTop: position }, 500);
      }

      // 共通でメニューを閉じる処理
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
      $("body").css("overflow", "auto"); // スクロールを有効に戻す
    });
  
    // ウィンドウサイズが768px以上になったらメニューを強制的に閉じる
    $(window).resize(function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        $(".js-hamburger").removeClass("is-active");
        $(".js-sp-nav").fadeOut(300);
        $(".header").removeClass("is-open");
        $("body").css("overflow", "auto");
      }
    });

    // アンカーリンクのスムーススクロール
    $('a[href^="#"]').click(function (e) {
      e.preventDefault();
      var headerHeight = $(".js-header").outerHeight();
      var href = $(this).attr("href");
      var target = href === "#" || href === "" ? $("html") : $(href);

      if (target.length) {
        var position = target.offset().top - headerHeight;
        $("html, body").animate({ scrollTop: position }, 600, "swing");
      }
    });
  });


});


$(function () {
  // ページ読み込み時にハッシュがあるかチェック
  if (location.hash) {
    var headerHeight = $(".js-header").outerHeight();
    var target = $(location.hash);
    if (target.length) {
      var position = target.offset().top - headerHeight;
      $("html, body").animate({ scrollTop: position }, 600, "swing");
    }
  }
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

//サイドバーのアコーディオン
$(function () {
  $(".js-accordion-title.is-open").next().show();
  $(".js-accordion-title").on("click", function () {
    $(this).next().slideToggle(300);
    $(this).toggleClass("is-open", 300);
  });
});