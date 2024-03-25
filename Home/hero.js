var isModernBrowser = false;

//AGM form checks
$("#Shareloginform").submit(function (e) {
	e.preventDefault();
	ShareholderLogin();
});

$(".going-back").click(function (e) {
	e.preventDefault();
	GoAgain();
});

//animate numbers
(function ($) {
	$(window).on("load", function () {
		$(document).scrollzipInit();
		$(document).rollerInit();
	});
	$(window).on("load scroll resize", function () {
		$('.numscroller').scrollzip({
			showFunction: function () {
				numberRoller($(this).attr('data-slno'));
			},
			wholeVisible: false,
		});
	});
	$.fn.scrollzipInit = function () {
		$('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
	};
	$.fn.rollerInit = function () {
		var i = 0;
		$('.numscroller').each(function () {
			i++;
			$(this).attr('data-slno', i);
			$(this).addClass("roller-title-number-" + i);
		});
	};
	$.fn.scrollzip = function (options) {
		var settings = $.extend({
			showFunction: null,
			hideFunction: null,
			showShift: 0,
			wholeVisible: false,
			hideShift: 0,
		}, options);
		return this.each(function (i, obj) {
			$(this).addClass('scrollzip');
			if ($.isFunction(settings.showFunction)) {
				if (
					!$(this).hasClass('isShown') &&
					($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
					($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
				) {
					$(this).addClass('isShown');
					settings.showFunction.call(this);
				}
			}
			if ($.isFunction(settings.hideFunction)) {
				if (
					$(this).hasClass('isShown') &&
					(($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
						($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
				) {
					$(this).removeClass('isShown');
					settings.hideFunction.call(this);
				}
			}
			return this;
		});
	};
	function numberRoller(slno) {
		var min = $('.roller-title-number-' + slno).attr('data-min');
		var max = $('.roller-title-number-' + slno).attr('data-max');
		var timediff = $('.roller-title-number-' + slno).attr('data-delay');
		var increment = $('.roller-title-number-' + slno).attr('data-increment');
		var numdiff = max - min;
		var timeout = (timediff * 1000) / numdiff;
		//if(numinc<10){
		//increment=Math.floor((timediff*1000)/10);
		//}//alert(increment);
		numberRoll(slno, min, max, increment, timeout);

	}
	function numberRoll(slno, min, max, increment, timeout) {//alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
		if (min <= max) {
			$('.roller-title-number-' + slno).html(min);
			min = parseInt(min) + parseInt(increment);
			setTimeout(function () { numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout)) }, timeout);
		} else {
			$('.roller-title-number-' + slno).html(max);
		}
	}
})(jQuery);

//brand id
var bName = 0;
if (document.getElementById("brandid")) {
	bName = document.getElementById("brandid").value;
}


//list APIs here
//staging
const storiesSearchApi = "/centricaapi/GetShapedStories/0/";
const storiesTitlesApi = "/centricaapi/StoriesSearchTitles/0/";
const storiesSearchAjaxApi = "/centricaapi/StoriesSearchAjax/0/";
const newsTitlesApi = "/centricaapi/NewsSearchTitles/0/";
const newsSearchApi = "/centricaapi/GetNews/0/?";
const brandedTitlesApi = "/centricaapi/NewsSearchTitles/";


// this is needed because IE11 does not support foreach
if (typeof Array.prototype.forEach != "function") {
	Array.prototype.forEach = function (callback) {
		for (var i = 0; i < this.length; i++) {
			callback.apply(this, [this[i], i, this]);
		}
	};
}
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}
// END this is needed because IE11 does not support foreach

//onlick go back used for pattern lib
function goBack() {
	window.history.back();
}

document.addEventListener("DOMContentLoaded", function (event) {
	preCheck();
});

function preCheck() {
	isModernBrowser = "visibilityState" in document;
	init();
}

function init() {
	carousellibraryblock.init();
	carouselmedia.init();
	carouselstandard.init();

	//this gets the media news
	Filterpressreleaseblock.init();

	//this stories
	filterStories.init();


	tabfunction.init();
	accordiofunction.init();
	homepagefunctions.init();
	burgermenu.init();
	gridview.init();
	pauseVideoHover.init();
	truncation.init();
	//homenavi.init();
	//stickyNav.init();
	autocomplete.init();
	storiesAutocomplete.init();
	cookieMonster.init();
	innovationsTeam.init();
	searchclean.init();
	openmedia.init();
}

var cookieMonster = {
	init: function () {
		$(".cookies-module").addClass("show");
		$(".close-monster").on("click", function (e) {
			e.preventDefault();
			$(".cookies-module")
				.removeClass("show")
				.addClass("close");
		});
	}
};

var autocomplete = {
	init: function () {
		var autocom = document.querySelector(".autocomplete-input");
		var brandTitles = 0;
		if (document.getElementById("brandid")) {
			brandTitles = document.getElementById("brandid").value;
		}



		if (autocom != null) {
			var ajax = new XMLHttpRequest();
			//local api
			if (brandTitles != 0) {
				ajax.open("GET", brandedTitlesApi + brandTitles, true);
			} else {
				ajax.open("GET", newsTitlesApi, true);
			}


			ajax.onload = function () {
				var list = JSON.parse(ajax.responseText).map(function (i) {
					return i.title;
				});
				new Awesomplete(document.querySelector("input.autocomplete-input"), {
					list: list
				});
			};
			ajax.send();
		}
	}
};

var storiesAutocomplete = {
	init: function () {
		var autocom = document.querySelector(".autocomplete-input-stories");
		if (autocom != null) {
			var ajax = new XMLHttpRequest();
			//change for live
			//ajax.open("GET", "https://centricawebstage-uks.azurewebsites.net/centricaapi/NewsSearchTitles/0/", true);

			//local api
			ajax.open("GET", storiesTitlesApi, true);
			ajax.onload = function () {
				var list = JSON.parse(ajax.responseText).map(function (i) {
					return i.title;
				});
				new Awesomplete(document.querySelector("input.autocomplete-input-stories"), {
					list: list
				});
			};
			ajax.send();
		}
	}
};

var homenavi = {
	init: function () {
		$("nav.menu").accessibleMegaMenu({
			uuidPrefix: "accessible-megamenu",
			menuClass: "nav",
			topNavItemClass: "nav__item",
			panelClass: "submenu-wrapper",
			panelGroupClass: "sub-nav-group",
			hoverClass: "hover",
			focusClass: "focus",
			openClass: "open"
		});
	}
};

var truncation = {
	init: function () {
		function maxLength(maxLen) {
			return function truncateToNearestSpace(idx, text) {
				// this may chop in the middle of a word
				var truncated = text.substr(0, maxLen);
				if (truncated.length >= maxLen) {
					return truncated.replace(/\s[^\s]+$/, "...");
				}
				if (/[^\s]$/.test(truncated)) return truncated.replace(/\s[^\s]+$/, "");
				else return truncated.trim();
			};
		}
		$(".truncate-title").text(maxLength(80));
		$(".truncate-title-inner p").text(maxLength(200));
		$(".truncate-title-inner-short p").text(maxLength(100));
	}
};

var innovationsTeam = {
	init: function () {
		if (!document.querySelectorAll(".innovatoions-team__module").length) {
			return;
		}

		var $grid = $('.innovatoions-team__module .grid').isotope({
			// options
		});

		$('.innovatoions-team__module .filters').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
			$('button.active-on', $(this).parent()).removeClass('active-on');
			$(this).addClass('active-on');
		});
		$grid.isotope({
			filter: '*'
		});

	}

};

//tabs
var stickyNav = {
	init: function () {
		// When the user scrolls the page, execute myFunction
		window.onscroll = function () {
			myFunction();
		};

		var navbar = document.getElementById("navbar");
		var sticky = navbar.offsetTop;

		// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
		function myFunction() {
			if (window.pageYOffset >= sticky) {
				navbar.classList.add("sticky");
			} else {
				navbar.classList.remove("sticky");
			}
		}

		var navSelction = document.querySelectorAll(".timeline-bar li a");
		if (navSelction) {
			navSelction.forEach(function (evt) {
				evt.addEventListener("click", function (e) {
					//e.preventDefault();
					var wot = this.getAttribute("href");

					$("html, body").animate({
						scrollTop: $(wot).offset().top
					},
						500
					);

					var elems = document.querySelectorAll(".timeline-bar li a");
					[].forEach.call(elems, function (el) {
						el.classList.remove("active");
					});
					this.classList.add("active");
				});
			});
		}
	}
};

var pauseVideoHover = {
	init: function () {
		var vidSelction = document.querySelectorAll(".video");
		if (vidSelction) {
			$(vidSelction).mouseover(function () {
				$(".hp-video")
					.get(0)
					.play();
			});

			$(vidSelction).mouseout(function () {
				$(".hp-video")
					.get(0)
					.pause();
			});
		}
	}
};


//stories js
var storiesOffset = 0;
var storiesNum = 15;
var storiesTopic = "*";

var storiesType = "*";
var storiesYear = "*";
var yearSelTypes = "*"

var storiesDateFrom = "";
var storiesDateTo = "";
var storiesSearchPhrase = "";
var breadListing = $('.breadcrumb-listing');
var breadListing3 = $("#myItemList");

var yearsFilteredSelected = "";


var filterStories = {
	selectedFilters: {},
	storiesSearchPhrase: "",

	getMarkup: function (
		title,
		imageUrl,
		pubDate,
		path,
		isInvestor,
		documentType,
		authorName,
		authorPosition,
		authorImage,
		isWide,
		align
	) {
		var tmpDate = new Date(pubDate);
		var dateArr = pubDate.split("T")[0].split("-");

		var altPath = path;

		var colSize = isWide;
		var placement = align;
		var dtype = documentType;

		//this will need to be removed when it goes live.for testing purposes only concerning shorthand stories
		// if (path.toLowerCase().startsWith("/story/")) {
		//   altPath = "/" + path;
		// }

		var monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		var dateReadable =
			dateArr[2] + " " + monthNames[tmpDate.getMonth()] + " " + dateArr[0];
		var dtime = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];

		var truncatedTitleLength = 75;
		var truncatedTitle = title.substr(0, truncatedTitleLength);
		if (truncatedTitle.length >= truncatedTitleLength) {
			truncatedTitle = truncatedTitle.replace(/\s[^\s]+$/, "&hellip;");
		}

		var markup = "";

		if (colSize === true || dtype === "*" || align === 1) {
			markup =
				'<article class="story-item width-67 right-align space-1 podcast featured-story stories-item"><div class="img-container">';
			markup +=
				'<img src="' +
				imageUrl +
				'"><a href="' +
				altPath +
				'" class="cta-arrow white"><span class="icon icon-Icon_expand"></span></a>';
			markup +=
				'<p class="cta-more"><a href="' +
				altPath +
				'" class="cta cta--ghost">Discover now</a></p></div><div class="details-overlay">';
			markup +=
				'<h3 class="heading-h3-overlay podcast-h3 heading-h3">' +
				title +
				"</h3></div>";
			markup +=
				'<button class="icon-plus expand-content"><span class="icon-Icon_expand"></span></button></article>';
		}
		if (colSize === true || dtype === "*" || align === 2) {
			markup =
				'<article class="story-item width-67 left-align space-1 podcast featured-story stories-item"><div class="img-container">';
			markup +=
				'<img src="' +
				imageUrl +
				'"><a href="' +
				altPath +
				'" class="cta-arrow white"><span class="icon icon-Icon_expand"></span></a>';
			markup +=
				'<p class="cta-more"><a href="' +
				altPath +
				'" class="cta cta--ghost">Discover now</a></p></div><div class="details-overlay">';
			markup +=
				'<h3 class="heading-h3-overlay podcast-h3 heading-h3">' +
				title +
				"</h3></div>";
			markup +=
				'<button class="icon-plus expand-content"><span class="icon-Icon_expand"></span></button></article>';
		} else if (colSize === true || dtype === 56) {
			markup +=
				'<article class="story-item width-33 space-1 podcast featured-story stories-item"><div class="img-container">';
			markup +=
				'<img src="' +
				imageUrl +
				'"><a href="' +
				altPath +
				'" class="cta-arrow white"><span class="icon icon-Icon_expand"></span></a>';
			markup +=
				'<p class="cta-more"><a href="' +
				altPath +
				'" class="cta cta--ghost">Discover now</a></p></div><div class="details-overlay">';
			markup +=
				'<h3 class="heading-h3-overlay podcast-h3 heading-h3">' +
				title +
				"</h3></div>";
			markup +=
				'<button class="icon-plus expand-content"><span class="icon-Icon_expand"></span></button></article>';
		} else if (documentType === 54) {
			markup +=
				'<article class="story-item width-33 space-1 podcast featured-story stories-item"><div class="img-container"><div class="icon-wrapper"><span class="icon icon-podcast"></span></div>';
			markup +=
				'<img src="' +
				imageUrl +
				'"><a href="' +
				altPath +
				'" class="cta-arrow white"><span class="icon icon-Icon_expand"></span></a>';
			markup +=
				'<p class="cta-more"><a href="' +
				altPath +
				'" class="cta cta--ghost"><span class="icon icon-Icon_microphone"></span>Listen to podcast</a></p></div><div class="details-overlay">';
			markup +=
				'<h3 class="heading-h3-overlay podcast-h3 heading-h3">' +
				title +
				"</h3></div>";
			markup +=
				'<button class="icon-plus expand-content"><span class="icon-Icon_expand"></span></button></article>';
		} else if (documentType === 52) {
			markup +=
				'<article class="latest-news__module--item stories-item width-33" data-date="' +
				dtime +
				'">';
			markup +=
				'<div class="item"><div class="img-container news-page"><img src="' +
				imageUrl +
				'"></div><div class="details bordered">';
			markup += '<a href="' + altPath + '" class="cta-overlay">';
			markup +=
				'<h3 class="heanding-h3 primary-blue">' + truncatedTitle + "</h3>";
			markup += '<div class="flex-item flex-center author">';
			markup +=
				'<img src="' +
				authorImage +
				'" alt="" width="50px" height="50px" class="author-img">';
			markup +=
				'<p class="no-margin">By <span class="name">' +
				authorName +
				"</span> <br><span>" +
				authorPosition +
				"</span></p></div></a>";
			markup += "</div></div></article>";
		} else {
			markup +=
				'<article class="latest-news__module--item stories-item width-33" data-date="' +
				dtime +
				'">';
			markup +=
				'<div class="item"><div class="img-container news-page"><img src="' +
				imageUrl +
				'"></div><div class="details bordered">';
			markup +=
				'<a href="' +
				altPath +
				'" class="cta-overlay"><date class="date-tag" data-time="' +
				dtime +
				'">' +
				dateReadable +
				"</date>";
			markup +=
				'<h3 class="heanding-h3 primary-blue">' +
				title +
				"</h3></a></div></div></article>";
		}
		return markup;
	},
	queryApi: function (yearSelTypes, storiesSearchPhrase) {
		var filterString2 = "";

		yearsFilteredSelected = yearSelTypes;

		//adding topic condition
		if (storiesTopic != "") {
			if (storiesType === null) {
				storiesType = "*";
			}
			filterString2 += "?doctype=" + storiesType + "&";
		}

		if (yearSelTypes) {
			filterString2 = "?doctype=*&";
		}

		//filter string input
		if (filterStories.storiesSearchPhrase != "") {
			filterString2 = "?search=" + filterStories.storiesSearchPhrase + "&";
		}

		if (storiesDateFrom === "" && storiesDateTo === "") {
			if (storiesTopic === null) {
				storiesTopic = "*";
			}
			filterString2 += "topics=" + storiesTopic + "&";
			if (
				storiesTopic !== "*" &&
				$("#stintro").length &&
				$("#stintro > .topic-" + storiesTopic).length
			) {
				$("#stintro > div").addClass("hidden");
				$("#stintro > .topic-" + storiesTopic).removeClass("hidden");
			} else if (storiesTopic === "*") {
				$("#stintro > div").addClass("hidden");
			}
		}

		if (yearSelTypes === undefined) {
			yearSelTypes = "*";
		}

		filterString2 += "years=" + yearSelTypes + "&";
		filterString2 += "offset=" + storiesOffset + "&";
		filterString2 += "num=" + storiesNum + "&";
		if ($("#topexclusions").length) {
			filterString2 += "excludedids=" + $("#topexclusions").val() + "&";
		}

		// LOCAL
		var apiBase = storiesSearchApi;
		var queryURL = apiBase + filterString2;
		var itemsMarkup = "";

		//console.log("API query: " + queryURL);
		$.getJSON(queryURL, function (data) {
			$.each(data.items, function (i, item) {
				itemsMarkup += filterStories.getMarkup(
					item.title,
					item.imageUrl,
					item.pubDate,
					item.path,
					item.isInvestor,
					item.documentType,
					item.authorName,
					item.authorPosition,
					item.authorImage,
					item.isWide,
					item.align
				);
			});
			if (storiesOffset === 0) {
				$(".stories-grid").html(itemsMarkup);
			} else {
				$(".stories-grid").append(itemsMarkup);
			}
			if (data.items.length < storiesNum) {
				$(".loadMoreCntnr").addClass("disabled");
			} else {
				$(".loadMoreCntnr").removeClass("disabled");
			}
		});
	},
	init: function () {

		//reset order api when clicked on tab
		$(".filter-list.stories .filter-opt[data-filter='*']").on("click", function (e) {
			e.preventDefault();
			$("#years li input[type='checkbox']").prop('checked', false);
			storiesOffset = 0;
			storiesTopic = "*";
			filterStories.queryApi(storiesTopic);
			breadListing3.empty();
		});


		$(".clearyear").on("click", function (e) {
			e.preventDefault();
			$("#years li input[type='checkbox']").prop("checked", false);
			storiesTopic = "*";
			storiesOffset = 0;
			filterStories.queryApi(storiesTopic, storiesOffset);
			breadListing3.empty();
		});


		//inital add deactive class onclick
		$(".filter-list.stories .filter-opt").on("click", function (e) {
			e.preventDefault();
			$(".filter-list.stories li a").addClass("deactive");
		});

		var gridEl = document.querySelector(".stories-grid");
		if (gridEl == null) {
			return;
		}

		var loadMoreBtn = document.querySelector(".loadmorebtn");
		if (loadMoreBtn) {
			loadMoreBtn.onclick = function (e) {
				e.preventDefault();
				storiesOffset += storiesNum;
				filterStories.queryApi();
			};
		}

		//load more button for years
		var loadMoreBtn2 = document.querySelector(".loadmorebtn-stories");
		if (loadMoreBtn2) {
			loadMoreBtn2.onclick = function (e) {
				//alert(yearsFilteredSelected);
				e.preventDefault();
				yearSelTypes = yearsFilteredSelected;
				storiesOffset += storiesNum;
				filterStories.queryApi(yearSelTypes);
			};
		}

		var itemSelector = ".stories-item";
		var activeFiltersList = [];

		filterStories.queryApi();

		var acc = document.getElementsByClassName("filter-opt");
		var i;

		for (i = 0; i < acc.length; i++) {
			acc[i].onclick = function (e) {
				e.preventDefault();
				var active = document.querySelector(".filter-opt.active");

				if (active && active != this) {
					active.classList.remove("active");
				}

				if (!this.classList.contains("active")) {
					this.classList.add("active");
				} else if (!this.classList.contains("search-button")) {
					this.classList.remove("active");
					//document.querySelectorAll(".filter-opt").forEach(e => e.classList.remove("deactive"));
					var eleeems = document.querySelectorAll(".filter-opt");
					[].forEach.call(eleeems, function (ell) {
						ell.classList.remove("deactive");
					});
				}

				var opt = this.dataset.list;

				var elems = document.querySelectorAll(".filter-types");
				[].forEach.call(elems, function (el) {
					el.classList.remove("active");
				});
				if (this.classList.contains("active")) {
					document.querySelector("#filter-" + opt).classList.toggle("active");
				}


			};
		}

		var fltrs = document.querySelectorAll(".filters-button-group button");
		if (fltrs) {
			fltrs.forEach(function (el) {
				el.addEventListener("click", function (e) {
					e.preventDefault();


					var filtersCntnrEl = document.querySelector(".filters-button-group");
					var allBtns = document.querySelectorAll(
						".filters-button-group button"
					);
					var allSelectedBtns;
					var selectedVals = [];

					var currentBtn = this;
					var currentBtnSelected = currentBtn.classList.contains("is-checked");
					var allFilterBtn = document.querySelector(
						".filters-button-group button[data-filter='*']"
					);

					if (!currentBtnSelected) {
						allBtns.forEach(function (el2) {
							el2.classList.remove("is-checked");
						});
						currentBtn.classList.add("is-checked");
					} else {
						//prevent unchecking "all"
						if (currentBtn.getAttribute("data-filter") != "*") {
							currentBtn.classList.remove("is-checked");
							allFilterBtn.classList.add("is-checked");
						}
					}

					var checkedButton = document.querySelector(
						".filters-button-group button.is-checked"
					);

					var currentSelectedFilter = checkedButton.getAttribute("data-filter");
					var currentSelectedFilterType = checkedButton.getAttribute("data-filter-type");

					storiesOffset = 0;
					storiesTopic = currentSelectedFilter;
					storiesType = currentSelectedFilterType;
					storiesDateFrom = "";
					storiesDateTo = "";
					filterStories.storiesSearchPhrase = "";

					filterStories.queryApi();
				});
			});
		}

		//search
		$("#filter-search input.cta.cta--ghost").on("click", function (e) {
			e.preventDefault();
			filterStories.storiesSearchPhrase = encodeURIComponent(
				$("#filter-search input.form-input.search-input").val()
			);
			filterStories.queryApi();
		});

		//filter by years selected
		$(".filter-types label:not(.heading-h5)").on("click", function () {
			var $currentCheckbox = $(this)
				.siblings('input[type="checkbox"]')
				.eq(0);
			var currentSelected = $currentCheckbox.is(":checked");
			var selectedFilters = {};
			var tmpVal;
			var tmpCat;
			var breadListing = $('.breadcrumb-listing');
			var breadListing3 = $("#myItemList");

			breadListing3.empty();

			//all filters but current one
			$allSelected = $(".filter-types input:checked").not($currentCheckbox);

			//if current one wasn't checked - nedded because this triggers before dom is updated
			if (!currentSelected) {
				$allSelected = $allSelected.add($currentCheckbox);
			}

			$allSelected.each(function () {
				tmpVal = $(this).val();
				tmpCat = $(this).data("category");
				if (!selectedFilters[tmpCat]) {
					selectedFilters[tmpCat] = [];
				}
				selectedFilters[tmpCat].push(tmpVal);
			});

			filterStories.selectedFilters = selectedFilters;

			//listing the years
			var ul = document.createElement("ul");
			document.getElementById("myItemList").appendChild(ul);
			var yearSelTypes = filterStories.selectedFilters[tmpCat];
			if (yearSelTypes != undefined) {
				var yearArr = yearSelTypes.toString().split(",");
				yearArr.forEach(function (item) {
					let li = document.createElement("li");
					ul.appendChild(li);
					li.innerHTML += item;
				});
			}


			//if no years selected remove selection
			if (yearSelTypes === undefined) {
				breadListing.empty();
				breadListing3.empty();
			}

			//filterStories.prOffset = 0;
			//filterStories.prSearchPhrase = "";
			filterStories.storiesSearchPhrase = "";
			filterStories.queryApi(yearSelTypes);

			//if any years selected unselect the other filters
			$('[data-category="years"]').click(function (event) {
				$(".filters-button-group .button:not(:nth-child(1))").removeClass('is-checked');
			});
			//if any years selected unselect the other filters
			$(".filters-button-group .button").click(function (event) {
				$('.filter-types ul li input[type="checkbox"]').prop('checked', false);
			});

		});

		$(".search-button-close .close-x").on("click", function (e) {
			e.preventDefault();
			$("#filter-search").removeClass("active");
			$(".search-wrapper").removeClass("active");
			$(".search-wrapper > .search-button").removeClass("active");
		});

		$(".search-button.filter-opt").on("click", function () {
			$(".search-wrapper").toggleClass("active");
		});

		//if seatch icon is active (close search bar)
		$(".search-wrapper").on("click", function () {
			$("#filter-search").removeClass("active");
			if ($(this).hasClass('active')) {
				$("#filter-search").addClass("active");
			}
		});

		//clear input when you click in
		$(".autocomplete-input-stories").on("click focusin", function () {
			this.value = "";
		});
		//clear search when you wonder off
		$(".filter-list.stories li").on("click", function () {
			$("div.filters-button-group button").removeClass("is-checked");
			$('.autocomplete-input-stories').val("");
			$("div.filters-button-group button:first-child").addClass("is-checked");
		});

	}
};

var Filterpressreleaseblock = {
	selectedFilters: {},
	prOffset: 0,
	prNum: 15,
	prDateFrom: "",
	prDateTo: "",
	prSearchPhrase: "",
	newsType: "company",
	brandName: bName,

	getMarkup: function (title, imageUrl, pubDate, path, isInvestor) {
		var tmpDate = new Date(pubDate);
		var dateArr = pubDate.split("T")[0].split("-");
		var newstag = "Company";
		if (isInvestor) {
			newstag = "Investor";
		}

		var altPath = path;

		//this will need to be removed when it goes live.for testing purposes only concerning shorthand stories
		// if (path.toLowerCase().startsWith("/story/")) {
		//   altPath = "/" + path;
		// }

		var monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		var dateReadable =
			dateArr[2] + " " + monthNames[tmpDate.getMonth()] + " " + dateArr[0];
		var dtime = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];

		var markup =
			'<article class="latest-news__module--item pr-item" data-date="' +
			dtime +
			'">';
		markup +=
			'<div class="item"><div class="img-container news-page"><img src="' +
			imageUrl +
			'"></div>';
		markup +=
			'<div class="details bordered"><a href="' +
			altPath +
			'" class="cta-overlay">';
		markup += '<date class="date-tag">' + dateReadable + "</date>";
		markup += '<h3 class="heanding-h3 primary-blue">' + title + "</h3>";
		markup +=
			'<p><span class="cta-pin"><span class="icon icon-Icon_TAG"></span>' +
			newstag +
			"</span></p></a></div></div></article>";

		return markup;
	},
	queryApi: function () {
		var filterString = "";
		//checking for brand name
		if (Filterpressreleaseblock.brandName != 0) {
			filterString += "brands=" + Filterpressreleaseblock.brandName + "&usebrands=1&";
		}
		if (Filterpressreleaseblock.prDateFrom != "") {
			filterString += "datefrom=" + Filterpressreleaseblock.prDateFrom + "&";
		}
		if (Filterpressreleaseblock.prDateTo != "") {
			filterString += "dateto=" + Filterpressreleaseblock.prDateTo + "&";
		}

		if (Filterpressreleaseblock.prSearchPhrase != "") {
			filterString += "search=" + Filterpressreleaseblock.prSearchPhrase + "&";
		}

		if (
			Filterpressreleaseblock.prDateFrom === "" &&
			Filterpressreleaseblock.prDateTo === "" &&
			Filterpressreleaseblock.prSearchPhrase === ""
		) {
			for (var key in Filterpressreleaseblock.selectedFilters) {
				filterString += key + "=";
				filterString += Filterpressreleaseblock.selectedFilters[key].join(",");
				filterString += "&";
			}
		}

		filterString += "offset=" + Filterpressreleaseblock.prOffset + "&";
		filterString += "num=" + Filterpressreleaseblock.prNum + "&";

		if (Filterpressreleaseblock.newsType === "investor") {
			filterString += "investornews=1&";
		}

		//change for live
		//var apiBase = "https://centricawebstage-uks.azurewebsites.net/centricaapi/GetNews/0/?";

		//local path testing
		var apiBase = newsSearchApi;

		var queryURL = apiBase + filterString;
		var itemsMarkup = "";

		//console.log("API query: " + queryURL);
		$.getJSON(queryURL, function (data) {
			$.each(data.items, function (i, item) {
				itemsMarkup += Filterpressreleaseblock.getMarkup(
					item.title,
					item.imageUrl,
					item.pubDate,
					item.path,
					item.isInvestor
				);
			});
			if (storiesOffset === 0) {
				$(".pr-grid").html(itemsMarkup);
				$(".pr-item")
					.hide()
					.fadeIn("slow");
			} else {
				$(".pr-grid").append(itemsMarkup);
				$(".pr-item")
					.hide()
					.fadeIn("slow");
			}
			if (data.items.length < storiesNum) {
				$(".loadMoreCntnr").addClass("disabled");
			} else {
				$(".loadMoreCntnr").removeClass("disabled");
			}
		});
	},
	init: function () {
		var gridEl = document.querySelector(".pr-grid");
		if (gridEl == null) {
			return;
		}
		var items = gridEl.querySelectorAll(".pr-item");
		if (!items) {
			return;
		}
		var itemSelector = ".pr-item";
		var activeFiltersList = [];
		//console.log($(".services-tab__link-item.is-active").attr("href"));
		if ($(".services-tab__link-item.is-active").attr("href") === "#tab_2") {
			Filterpressreleaseblock.newsType = "investor";
		} else {
			Filterpressreleaseblock.newsType = "company";
		}
		$(".services-tab__link-item").on("click", function () {
			if ($(this).attr("href") === "#tab_2") {
				Filterpressreleaseblock.newsType = "investor";
			} else {
				Filterpressreleaseblock.newsType = "company";
			}
			Filterpressreleaseblock.queryApi();
		});
		var loadMoreBtn = document.querySelector(".loadmorebtn");
		loadMoreBtn.onclick = function (e) {
			e.preventDefault();
			Filterpressreleaseblock.prOffset += Filterpressreleaseblock.prNum;

			Filterpressreleaseblock.queryApi();
		};

		//reset button on search
		var resetButton = document.querySelector(".reset-button");
		resetButton.onclick = function (e) {
			e.preventDefault();
			$(this)
				.closest("form")
				.find("input[type=text]")
				.val("");
			Filterpressreleaseblock.prSearchPhrase = "";
			Filterpressreleaseblock.prOffset = 0;
			Filterpressreleaseblock.prNum = 12;
			Filterpressreleaseblock.queryApi();
		};

		$(".search-button-close .close-x").on("click", function () {
			$("#filter-search").removeClass("active");
			$(".search-wrapper").removeClass("active");
			$(".search-wrapper > .search-button").removeClass("active");
		});

		$(".search-button.filter-opt").on("click", function () {
			$(".search-wrapper").toggleClass("active");
		});


		$(".autocomplete-input").on("click focusin", function () {
			this.value = "";
		});

		$(".filter-opt").on("click", function (e) {
			e.preventDefault();
			var isActive = $(this).hasClass("active");
			$(".filter-opt.active, .filter-types.active").removeClass("active");
			if (!isActive) {
				$(this).addClass("active");
				$("#filter-" + $(this).data("list")).addClass("active");
			}
		});

		$(".filter-types label:not(.heading-h5)").on("click", function () {
			var $currentCheckbox = $(this)
				.siblings('input[type="checkbox"]')
				.eq(0);
			var currentSelected = $currentCheckbox.is(":checked");
			var selectedFilters = {};
			var tmpVal;
			var tmpCat;

			//all filters but current one
			$allSelected = $(".filter-types input:checked").not($currentCheckbox);

			//if current one wasn't checked - nedded because this triggers before dom is updated
			if (!currentSelected) {
				$allSelected = $allSelected.add($currentCheckbox);
			}

			$allSelected.each(function () {
				tmpVal = $(this).val();
				tmpCat = $(this).data("category");
				if (!selectedFilters[tmpCat]) {
					selectedFilters[tmpCat] = [];
				}
				selectedFilters[tmpCat].push(tmpVal);
			});

			Filterpressreleaseblock.selectedFilters = selectedFilters;

			Filterpressreleaseblock.prDateFrom = "";
			Filterpressreleaseblock.prDateTo = "";
			Filterpressreleaseblock.prOffset = 0;
			Filterpressreleaseblock.prSearchPhrase = "";
			Filterpressreleaseblock.queryApi();
		});

		//Date range filter
		$("input.date-range-btn").on("click", function () {
			Filterpressreleaseblock.prDateFrom = $(
				"input.date-from",
				$(this)
					.parent()
					.parent()
			).val();
			Filterpressreleaseblock.prDateTo = $(
				"input.date-to",
				$(this)
					.parent()
					.parent()
			).val();

			Filterpressreleaseblock.prOffset = 0;
			Filterpressreleaseblock.prSearchPhrase = "";
			Filterpressreleaseblock.queryApi();
		});

		//search
		$("#filter-search input.cta.cta--ghost").on("click", function (e) {
			e.preventDefault();

			Filterpressreleaseblock.prSearchPhrase = encodeURIComponent(
				$("#filter-search input.form-input.search-input").val()
			);
			Filterpressreleaseblock.prDateFrom = "";
			Filterpressreleaseblock.prDateTo = "";
			Filterpressreleaseblock.prOffset = 0;
			Filterpressreleaseblock.queryApi();
		});

		Filterpressreleaseblock.queryApi();
	}
};

//grid view toggle
var gridview = {
	init: function () {
		var gridview = document.querySelectorAll(".view-option");

		if (gridview) {
			gridview.forEach(function (evt) {
				evt.addEventListener("click", function (e) {
					e.preventDefault();
					var elements = document.querySelectorAll(".filter-opt");
					[].forEach.call(elements, function (el) {
						el.classList.remove("active");
					});
					var opt = this.dataset.otpview;
					if (opt === "grid") {
						$(".latest-news__module")
							.removeClass("list")
							.addClass("grid");
					}
					if (opt === "list") {
						$(".latest-news__module")
							.removeClass("grid")
							.addClass("list");
					}
					var elems = document.querySelectorAll(".view-option");
					[].forEach.call(elems, function (el) {
						el.classList.remove("active");
					});
					this.classList.add("active");
				});
			});
		}
	}
};

var carouselmedia = {
	init: function () {
		var contactBlock = document.querySelector(".carousel-contact");
		if (contactBlock) {
			$(window).on("load", function (e) {
				var flkty = new Flickity(contactBlock, {
					cellAlign: "left",
					contain: true,
					pageDots: false,
					wrapAround: true,
					groupCells: true,
					prevNextButtons: true,
					draggable: false,
					imagesLoaded: true
				});
				flkty.resize();
			});
		}

		//carousel contact block
		var contactBlockDisabled = document.querySelector(
			".carousel-contact.disabled"
		);
		if (contactBlockDisabled) {
			$(window).on("load", function (e) {
				var flkty = new Flickity(contactBlockDisabled, {
					cellAlign: "left",
					contain: true,
					pageDots: false,
					groupCells: true,
					wrapAround: true,
					prevNextButtons: false,
					draggable: false,
					imagesLoaded: true
				});
				flkty.resize();
			});
		}

		//leadership block
		var leadershipBlock = document.querySelector(".leadership_team_carousel");
		if (leadershipBlock) {
			$(window).on("load", function (e) {
				var flkty = new Flickity(leadershipBlock, {
					groupCells: true,
					pageDots: false,
					cellAlign: 'center',
					wrapAround: false,
					prevNextButtons: true,
					draggable: false,
					imagesLoaded: true
				});
				flkty.resize();
			});
		}
	}
};

//carousel (main)
var carouselstandard = {
	init: function () {
		var carouselContainers = document.querySelectorAll(".carousel-container");

		for (var i = 0; i < carouselContainers.length; i++) {
			var container = carouselContainers[i];
			initCarouselContainer(container);
		}

		function initCarouselContainer(container) {
			var carousel = container.querySelector(".carousel");
			var flkty = new Flickity(carousel, {
				imagesLoaded: true,
				percentPosition: false,
				pageDots: false,
				wrapAround: true,
				prevNextButtons: false,
				draggable: false,
				imagesLoaded: true
			});

			var carouselStatus = container.querySelector(".carousel-status");

			if (carouselStatus) {
				function updateStatus() {
					var slideNumber = flkty.selectedIndex + 1;
					carouselStatus.textContent =
						slideNumber + " of " + flkty.slides.length;
				}
				updateStatus();
			}

			var previousButton = container.querySelector(".carousel--prev");
			previousButton.addEventListener("click", function () {
				flkty.previous();
			});

			var nextButton = container.querySelector(".carousel--next");
			nextButton.addEventListener("click", function () {
				flkty.next();
			});

			flkty.on("select", updateStatus);
		}
	}
};

var carousellibraryblock = {
	init: function () {
		var imgLibr = document.querySelector(".carousel-img-library");
		var videoLibrMain = document.querySelector(".carousel-video-library");
		var vidLibr = document.querySelector(".carousel-video-playlist");
		var playListOpt = document.querySelectorAll(
			".carousel-video-playlist .carousel-cell a"
		);

		if (imgLibr) {
			$(window).on("load", function (e) {
				var flktyImg = new Flickity(imgLibr, {
					cellAlign: "left",
					contain: true,
					pageDots: false,
					wrapAround: true,
					imagesLoaded: true
				});
			});
		}
		if (videoLibrMain) {
			$(window).on("load", function (e) {
				var flktyImg = new Flickity(videoLibrMain, {
					cellAlign: "left",
					contain: true,
					pageDots: false,
					wrapAround: true,
					draggable: false,
					groupCells: 3,
					imagesLoaded: true
				});
			});
		}
		if (vidLibr) {
			$(window).on("load", function (e) {
				var flktyVid = new Flickity(vidLibr, {
					cellAlign: "left",
					contain: true,
					pageDots: false,
					wrapAround: true,
					imagesLoaded: true
				});
			});

			playListOpt.forEach(function (el) {
				el.addEventListener("click", function (e) {
					e.preventDefault();
					var opt = this;
					var elems = document.querySelectorAll(".carousel-cell");
					[].forEach.call(elems, function (el) {
						el.classList.remove("active");
					});
					this.parentNode.classList.add("active");

					document.querySelector(".main-video-wrapper").classList.add("active");

					var videoID = this.dataset.videourl;
					var player = document.getElementById("player");
					player.src =
						"https://www.youtube.com/embed/" + videoID + "?autoplay=1";
				});
			});
		}
	}
};

var tabfunction = {
	init: function () {
		//Tabs
		var tabLinks = document.querySelectorAll(
			".services-tab__link-item, .timeline-tab__link-item"
		);
		var tabContents = document.querySelectorAll(
			".services-tab__tab-item, .timeline-tab__tab-item"
		);

		// Loop through the tab link
		for (var i = 0; i < tabLinks.length; i++) {
			tabLinks[i].addEventListener("click", function (e) {
				e.preventDefault();
				var id = this.hash.replace("#", "");

				// Loop through the tab content
				for (var j = 0; j < tabContents.length; j++) {
					var tabContent = tabContents[j];
					tabContent.classList.remove("is-visible");
					tabLinks[j].classList.remove("is-active");
					if (tabContent.id === id) {
						tabContent.classList.add("is-visible");
					}
				}

				this.classList.add("is-active");
			});
		}
	}
};
var accordiofunction = {
	init: function () {
		//Accordion
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function (ev) {
				closeAll(ev.target);
				this.parentNode.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		}

		function closeAll(tar) {
			var accs = document.querySelectorAll(".accordion");
			for (var i = 0; i < accs.length; i++) {
				if (accs[i] == tar) {
					continue;
				}
				accs[i].parentNode.classList.remove("active");
				var panel = accs[i].nextElementSibling;
				panel.style.maxHeight = null;
			}
		}
	}
};

var homepagefunctions = {
	init: function () {
		// initialize the megamenu

		// // initialize the megamenu
		// $('.navigation-wrapper').accessibleMegaMenu();

		// // hack so that the megamenu doesn't show flash of css animation after the page loads.
		// setTimeout(function () {
		//   $('body').removeClass('init');
		// }, 500);

		//$(".nav__subnav-secondary .has-children").keydown(function () {
		//  $(".nav__subnav-tertiary").toggleClass("hello");
		//});

		$(".mobile-item").mouseover(function () {
			$(this).toggleClass("text-title-move");
		});

		$(".mobile-item").mouseout(function () {
			$(this).toggleClass("text-title-move");
		});

		$(".mobile-item").click(function () {
			$(this)
				.toggleClass("is--expanded")
				.siblings()
				.removeClass("is--expanded");
		});
	}
};


var searchclean = {
	init: function () {
		$(".search-mobile-wrapper .search-content").on('submit', function () {
			var txtbox = $("#searchsite");
			var txtval = txtbox.val();
			txtval = txtval.replaceAll("<", " ").replaceAll(">", " ").replaceAll("%3C", " ").replaceAll("%3E", " ");
			txtbox.val(txtval);
			return true;
		});

		$(".search-navigation .search-content").on('submit', function () {
			var txtbox = $("#search");
			var txtval = txtbox.val();
			txtval = txtval.replaceAll("<", " ").replaceAll(">", " ").replaceAll("%3C", " ").replaceAll("%3E", " ");
			txtbox.val(txtval);
			return true;
		});
	}
};

var burgermenu = {
	init: function () {
		var hamburger = document.querySelector(".hamburger");

		if (hamburger) {

			//hides expand button on mobile if there are no children.
			$(".nav__item").each(function () {
				var $li = $(this);
				if ($li.find('.nav__subnav-secondary li').length == 0) {
					$li.find('.expand-menu').hide();
				}
			});


			// Look for .hamburger
			hamburger = document.querySelector(".hamburger");
			var search = document.querySelector(".search-button");
			var searchclose = document.querySelector(".search-button-close");

			// On click
			hamburger.addEventListener("click", function () {
				hamburger.classList.toggle("is-active");
				document.querySelector(".nav-main").classList.toggle("is-active");
				document.querySelector(".main-nav").classList.toggle("is-active");
			});

			search.addEventListener("click", function () {
				search.classList.toggle("is-active");
				document
					.querySelector(".search-navigation")
					.classList.toggle("is-active");
			});

			searchclose.addEventListener("click", function () {
				search.classList.toggle("is-active");
				searchclose.classList.toggle("is-active");
				document
					.querySelector(".search-navigation")
					.classList.toggle("is-active");
			});
		}

		var storyitem = document.querySelectorAll(".expand-content");
		if (storyitem) {
			storyitem.forEach(function (el) {
				el.addEventListener("click", function () {
					this.parentNode.classList.toggle("active");
				});
			});
		}

		$(".expand-menu").click(function () {
			$(this)
				.parent()
				.toggleClass("active")
				.siblings()
				.removeClass("active");
		});
		$(".sub-nested.has-children .expand-menu-secondary").click(function () {
			$(this)
				.parent()
				.toggleClass("open-subnav")
				.siblings()
				.removeClass("open-subnav");
		});
	}
};

var openmedia = {
	init: function () {

		// Automatically opens video layer for youtube vid references
		// e.g. #v=u6Yz_E0nfoc
		// e.g. #v=Mkl1Ipmq71U

		var hash = location.hash.substr(1);
		const regex = /(v=)((\w|-){11})/;
		let videomatch = hash.match(regex);

		if (videomatch) {
			var videoid = videomatch[2];
		}

		if (videoid) {

			var videolink = "";
			var videolinkarray = ["https://www.youtube.com/watch?v=" + videoid, "https://youtu.be/" + videoid];
			var videolinkarrayLen = videolinkarray.length

			for (i = 0; i < videolinkarrayLen; i++) {
				videolink = videolinkarray[i];

				if ($("a[href='" + videolink + "']").length) {
					loadVideo(i);
				}
			}

			function loadVideo(i) {

				// Scroll to location
				$('html,body').animate({
					scrollTop: $("a[href='" + videolinkarray[i] + "']").offset().top - 100
				}, 500);

				// Open layer
				setTimeout(function () {
					$("a[href='" + videolinkarray[i] + "']").trigger("click");
				}, 1000);

			}
		}
	}
};