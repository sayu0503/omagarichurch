

jQuery(function ($) { // WordPressでも$を使えるようにするスコープ

  // ドロワーメニューの開閉
  $(".js-hamburger").click(function () {
    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
      $("body").css("overflow", "auto"); // 背景スクロールを戻す
    } else {
      $(this).addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
      $(".header").addClass("is-open");
      $("body").css("overflow", "hidden"); // 背景を固定
    }
  });

  // メニュー内リンククリック時
  $(".js-sp-nav a").click(function (event) {
    const target = $(this).attr("href");

    if (target.startsWith("#")) {
      event.preventDefault();
      const headerHeight = $(".js-header").outerHeight();
      const $target = $(target);
      if ($target.length) {
        const position = $target.offset().top - headerHeight;
        $("html, body").animate({ scrollTop: position }, 500);
      }
    }

    // メニューを閉じる処理
    $(".js-hamburger").removeClass("is-active");
    $(".js-sp-nav").fadeOut(300);
    $(".header").removeClass("is-open");
    $("body").css("overflow", "auto");
  });

  // ウィンドウ幅が768px以上になったらメニューを閉じる
  $(window).resize(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
      $(".header").removeClass("is-open");
      $("body").css("overflow", "auto");
    }
  });

  // アンカーリンクのスムーススクロール（ページ内）
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    const headerHeight = $(".js-header").outerHeight();
    const href = $(this).attr("href");
    const $target = href === "#" || href === "" ? $("html") : $(href);

    if ($target.length) {
      const position = $target.offset().top - headerHeight;
      $("html, body").animate({ scrollTop: position }, 600, "swing");
    }
  });

  // ページ読み込み時にハッシュがある場合の処理
  if (location.hash) {
    const headerHeight = $(".js-header").outerHeight();
    const $target = $(location.hash);
    if ($target.length) {
      const position = $target.offset().top - headerHeight;
      $("html, body").animate({ scrollTop: position }, 600, "swing");
    }
  }

  // スクロールでページトップボタン表示制御
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

  // サイドバーアコーディオン
  $(".js-accordion-title.is-open").next().show();
  $(".js-accordion-title").on("click", function () {
    $(this).next().slideToggle(300);
    $(this).toggleClass("is-open", 300);
  });

});
