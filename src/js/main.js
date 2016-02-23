// function to build label string
var labelIt = function(item) {
  var ls = [];
  if (item.free_entry) {
      ls.push('<span class="label label-success" data-toggle="tooltip" data-placement="top" title="Free entry"><i class="fa fa-thumbs-up"></i></span>');
  }
  if (item.staff_pick) {
      ls.push('<span class="label label-warning" data-toggle="tooltip" data-placement="top" title="Staff pick"><i class="fa fa-star"></i></span>');
  }
  if (item.free_food) {
      ls.push('<span class="label label-primary" data-toggle="tooltip" data-placement="top" title="Free food"><i class="fa fa-cutlery"></i></span>');
  }
  if (item.rsvp) {
      ls.push('<span class="label label-info" data-toggle="tooltip" data-placement="top" title="RSVP required"><i class="fa fa-pencil"></i></span>');
  }
  if (item.official) {
      ls.push('<span class="label label-danger" data-toggle="tooltip" data-placement="top" title="Badge required"><i class="fa fa-shield"></i></span>');
  }
  if (ls.length > 0) {
      return "<p>" + ls.join("&ensp;") + "</p>";
  } else {
      return "";
  }
};

// make img tag

var fetchImg = function(link) {
    return "https://s3-us-west-2.amazonaws.com/media.data.statesman.com/" + link;
};

// function to return calendar items for Google, Yahoo, Outlook and iCal
// adapted from: https://github.com/carlsednaoui/add-to-calendar-buttons

  var calendarLinks = function(event_title, startDateTimeString, endDateTimeString, event_address, event_description) {

      var MS_IN_MINUTES = 60 * 1000;

      var formatTime = function(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
      };

      var calculateEndTime = function(event) {
        return event.end ?
          formatTime(event.end) :
          formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
      };

      var calendarGenerators = {
        google: function(event) {
          var startTime = formatTime(event.start);
          var endTime = calculateEndTime(event);

          var href = encodeURI([
            'https://www.google.com/calendar/render',
            '?action=TEMPLATE',
            '&text=' + (event.title || ''),
            '&dates=' + (startTime || ''),
            '/' + (endTime || ''),
            '&details=' + (event.description || ''),
            '&location=' + (event.address || ''),
            '&sprop=&sprop=name:'
          ].join(''));
          var google_obj = {
              icon: "fa-google",
              href: href
          };
          return google_obj;
      },

        yahoo: function(event) {
          var eventDuration = event.end ?
            ((event.end.getTime() - event.start.getTime())/ MS_IN_MINUTES) :
            event.duration;

          // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
          var yahooHourDuration = eventDuration < 600 ?
            '0' + Math.floor((eventDuration / 60)) :
            Math.floor((eventDuration / 60)) + '';

          var yahooMinuteDuration = eventDuration % 60 < 10 ?
            '0' + eventDuration % 60 :
            eventDuration % 60 + '';

          var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

          // Remove timezone from event time
          var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
                                                      MS_IN_MINUTES))) || '';

          var href = encodeURI([
            'http://calendar.yahoo.com/?v=60&view=d&type=20',
            '&title=' + (event.title || ''),
            '&st=' + st,
            '&dur=' + (yahooEventDuration || ''),
            '&desc=' + (event.description || ''),
            '&in_loc=' + (event.address || '')
          ].join(''));

          var yahoo_obj = {
              icon: "fa-yahoo",
              href: href
          };
          return yahoo_obj;
        },

        ics: function(event, calendarName) {
          var startTime = formatTime(event.start);
          var endTime = calculateEndTime(event);

          var href = encodeURI(
            'data:text/calendar;charset=utf8,' + [
              'BEGIN:VCALENDAR',
              'VERSION:2.0',
              'BEGIN:VEVENT',
              'URL:' + document.URL,
              'DTSTART:' + (startTime || ''),
              'DTEND:' + (endTime || ''),
              'SUMMARY:' + (event.title || ''),
              'DESCRIPTION:' + (event.description || ''),
              'LOCATION:' + (event.address || ''),
              'END:VEVENT',
              'END:VCALENDAR'].join('\n'));

          var ics_obj = {
            icon: "fa-calendar-plus-o",
            href: href
          };
          return ics_obj;
        },
      };

      var generateCalendars = function(event) {
        return {
          google: calendarGenerators.google(event),
          yahoo: calendarGenerators.yahoo(event),
          ics: calendarGenerators.ics(event)
        };
      };

      // Make sure we have the necessary event data, such as start time and event duration
      var validParams = function(params) {
        return params.data !== undefined && params.data.start !== undefined &&
          (params.data.end !== undefined || params.data.duration !== undefined);
      };

      var createCalendar = function(params) {
        if (!validParams(params)) {
          console.log('Event details missing.');
          return;
        }
        return generateCalendars(params.data);
      };

    var myCalendar = createCalendar({
      options: {
        class: '.add-cal',
      },
      data: {
        title: event_title,
        start: new Date(startDateTimeString),
        end: new Date(endDateTimeString),
        address: event_address + ' Austin TX',
        description: event_description
      }
    });

    return myCalendar;
};

// function to check/uncheck top button icons
var checkItOut = function() {
    var text = this.textContent.trim();
    if ($(this).hasClass("checked")) {
        $(this).html("<i class='fa fa-circle-o'></i> " + text)
               .removeClass("bold");
    } else {
        $(this).html("<i class='fa fa-check-circle-o'></i> " + text)
               .addClass("bold");
    }
    $(this).toggleClass("checked");
};

// function to add thousand-separator commas
var addCommas = function(num) {
    num += '';
    var x = num.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

// function to return google maps link
var googleMap = function(addy) {
    return "https://www.google.com/maps/place/" + addy.replace(/ /g,"+") + ",+Austin,+TX";
};

// haversine formula to return distance between two points, via http://www.movable-type.co.uk/scripts/latlong.html
var haversine = function(lat1, lng1, lat2, lng2) {
    var earth_radius = 3959; // mean earth radius in miles
    var l1 = lat1 * Math.PI / 180;
    var l2 = lat2 * Math.PI / 180;
    var lat_diff = (lat2-lat1) * Math.PI / 180;
    var lng_diff = (lng2-lng1) * Math.PI / 180;
    var a = Math.sin(lat_diff/2) * Math.sin(lat_diff/2) +
        Math.cos(l1) * Math.cos(l2) *
        Math.sin(lng_diff/2) * Math.sin(lng_diff/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earth_radius * c;
};

// function to return social links
var aas_social = function(event_id, event_name, event_time, event_date, venue_name) {
    var root_url = window.location.hostname + "/sxsw/";
    var twitter_message = encodeURIComponent("Via @statesman SXSW party guide: " + event_name + " ~ March " + event_date + ", " + get12Hour(event_time) + " ~ " + venue_name + ": " + root_url + "/#" + event_id);
    return {
        tw: "https://twitter.com/intent/tweet?text=" + twitter_message,
        fb: "http://www.facebook.com/sharer.php?u=" + root_url + "/#" + event_id
    };
};

// function to return 12-hour time from 24-hour clock
var get12Hour = function(timestring) {
    var timesplit = timestring.split(":");
    var hours = timesplit[0];
    var minutes = timesplit[1];
    var suffix = (Number(hours) >= 12) ? 'p.m.' : 'a.m.';
    hours = (Number(hours) > 12) ? (Number(hours) - 12) : Number(hours).toString();
    hours = (Number(hours) === 0) ? "12" : hours;
    var out_time = (hours + ":" + minutes + " " + suffix).replace(":00","");
    if (out_time === "12 a.m.") {
        out_time = "midnight";
    }
    if (out_time === "12 p.m.") {
        out_time = "noon";
    }
    return out_time;
};

(function($, _) {

  "use strict";

/*
 * jQuery Shorten plugin 1.0.0
 *
 * Copyright (c) 2013 Viral Patel
 * http://viralpatel.net
 *
 * Dual licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

 $.fn.shorten = function (settings) {

        var config = {
            showChars: 100,
            ellipsesText: "...",
            moreText: "<i class='fa fa-plus-square-o reload_masonry'></i>",
            lessText: "<i class='fa fa-minus-square-o reload_masonry'></i>"
        };

        if (settings) {
            $.extend(config, settings);
        }

        $(document).off("click", '.morelink');

        $(document).on({click: function () {

                var $this = $(this);
                if ($this.hasClass('less')) {
                    $this.removeClass('less');
                    $this.html(config.moreText);
                } else {
                    $this.addClass('less');
                    $this.html(config.lessText);
                }
                $this.parent().prev().toggle();
                $this.prev().toggle();
                return false;
            }
        }, '.morelink');

        return this.each(function () {
            var $this = $(this);
            if($this.hasClass("shortened")) return;

            $this.addClass("shortened");
            var content = $this.html();
            if (content.length > config.showChars) {
                var c = content.substr(0, config.showChars);
                var h = content.substr(config.showChars, content.length - config.showChars);
                var html = c + '<span class="moreellipses">' + config.ellipsesText + ' </span><span class="morecontent"><span>' + h + '</span> <a href="#" class="morelink">' + config.moreText + '</a></span>';
                $this.html(html);
                $(".morecontent span").hide();
            }
        });
    };


    // global variables
    var sxsw_start = 'March 10, 2016';
    var sxsw_end = 'March 20, 2016';
    var data_url = 'data.json';

    // cache dom references
    var $top_matter = $("#top_matter");
    var $list = $("#outlist");
    var $loader = $("#loader");
    var $buttons = $('.check_button');
    var $submit_button = $("#submit_button");
    var $day_filter = $("#day_search");
    var $event_filter = $("#event_search");
    var $venue_filter = $("#venue_search");
    var $band_filter = $("#band_search");
    var $free_entry = $("#free_entry_button");
    var $free_food = $("#free_food_button");
    var $rsvp = $("#rsvp_button");
    var $staff_pick = $("#staff_pick_button");
    var $official = $("#badge_req_button");
    var $more_filters = $("#more_filters");
    var $toggle_options = $(".toggle_options");
    var $geo_search_wrapper = $('#geo_search_wrapper');
    var $filter_wrapper = $('#filter_wrapper');
    var $outlist_wrapper = $('#outlist_wrapper');
    var $results_count = $("#results_count");
    var $bottom_matter = $('#bottom_matter');

    $buttons.on('click', checkItOut);

    // set global template variable
    _.templateSettings.variable = "sxsw";

    // fetch template for list div
    var template = _.template($( "script.template" ).html());

    // is it sxsw?
    var isItSXSW = function(today) {
      var d = new Date();
      var start = new Date(sxsw_start);
      var end = new Date(sxsw_end);
      if (d >= start && d<= end) {
          return true;
      } else {
          return false;
      }
    };

    // main function
    var init = function(data, latitude, longitude) {

        // womp up the datepicker
        $('#day_search').datepicker({
            todayHighlight: isItSXSW(),
            autoclose: true,
            format: "MM d",
            startDate: new Date(sxsw_start),
            endDate: new Date(sxsw_end),
            clearBtn: true
        });

        // check viewport and serve up a random background image
        // img files are slugged bg-sm-1, bg-md-1, bg-lg-1, etc., and we have eight of them

        var randBetween = function(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        };

        var random_number = randBetween(1,8).toString();

        var set_bg = function() {

            var viewport_width = $(window).width();
            var viewport_height = $(window).height();

            var is_vertical = function(h, w) {
                if (h > w) {
                    return true;
                } else {
                    return false;
                }
            };

            var viewport_vertical = is_vertical(viewport_height, viewport_width);

            if (viewport_width >= 600 && viewport_width < 1024) {
                $('body').css({
                    'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url("assets/bg-md-' + random_number + '.jpg")',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': '100%',
                    'backgroundPosition': 'center top',
                    'backgroundAttachment': 'fixed'
                });
            } else if (viewport_width >= 1024) {
                $('body').css({
                    'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(assets/bg-lg-' + random_number + '.jpg)',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': '100%',
                    'backgroundPosition': 'center center',
                    'backgroundAttachment': 'fixed'
                });
            }

            if (viewport_width < 600 && viewport_vertical) {
                $('body').css({
                    'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(assets/bg-small-vert.jpg)',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': '100%',
                    'backgroundPosition': 'center top',
                    'backgroundAttachment': 'fixed'
                });
            }
        };

        set_bg();

        $(window).on('resize', _.debounce(set_bg, 500));

        // smooth scroll to anchor links
        $('a[href^="#"]').on('click', function(e) {
            var target = $( $(this).attr('href') );
            if( target.length ) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 'fast');
            }
        });

        // function to clear filters
        var clear_filters = function() {
            $('input[type=text]').val('');
            $('.check_button').each(function (d) {
                var text = this.textContent.trim();
                $(this).removeClass("checked")
                       .html("<i class='fa fa-circle-o'></i> " + text);
            });
            $('select option:eq(0)').prop('selected', true);
            $list.html('');
            $bottom_matter.hide();
        };

        // function to toggle additional filters
        var toggle_filters = function() {
            $more_filters.toggle();
            $toggle_options.toggle();
        };

        $('#more_filter_click').on('click', toggle_filters);
        $("#total_count").html(addCommas(data.events.length));

        // Check if user passed a hashed ID to the URL
        if(window.location.hash) {
          var event_id = window.location.hash.replace("#","");
          var record = _.findWhere(data.events, {"id": Number(event_id)});
          if (record && record !== null) {
              var data_to_template = [{
                  event_details: record,
                  venue_details: _.findWhere(data.venues, {"id": record.venue})
              }];

              $list.html(template(data_to_template));
              $results_count.html("<div class='container'><h2>Found <strong>1</strong> party</h2><button class='btn btn-default btn-xs' type='button' id='clear_button' style='margin-top:0;'><i class='fa fa-times-circle'></i> Clear</button></div>");
              $bottom_matter.show();

              $("#clear_button").on('click', clear_filters);

              $(".comment").shorten();
              $('[data-toggle="tooltip"]').tooltip();
          }
        }

        // is it the week of SXSW? If so, set the select menu option to that day
        var time_for_SXSW = isItSXSW();

        if (time_for_SXSW) {
            var d = new Date();
            var today = d.getDate().toString();
            $('#day_search option[value="' + today + '"]').attr("selected", "selected");
        }

        // click submit, get results
        $submit_button.on('click', function() {
            $loader.show();
            var search_state = getSearchState();
            var matches = _.chain(data.events)
                .filter(function(d) {
                    var venue_details = _.findWhere(data.venues, {"id": +d.party_place_id});
                    var exclude = 0;
                    if (search_state.event_name !== "") {
                        if (d.party_name.toUpperCase().indexOf(search_state.event_name) < 0) {
                            exclude++;
                        }
                    }
                    if (search_state.band !== "") {
                        if (d.bands.toUpperCase().indexOf(search_state.band) < 0) {
                            exclude++;
                        }
                    }
                    if (search_state.day !== "") {
                        if (search_state.day !== d.party_date.toString()) {
                                exclude++;
                        }
                    }
                    if (search_state.geo !== "") {
                        if (latitude && latitude !== null && longitude && longitude !== null) {
                          var venue_lat = venue_details.latitude;
                          var venue_lng = venue_details.longitude;
                          var distance = haversine(latitude, longitude, venue_lat, venue_lng);
                          if (distance > parseFloat(search_state.geo)) {
                                  exclude++;
                          }
                        }
                    }
                    if (search_state.venue !== "") {
                        if (venue_details.name.toUpperCase().indexOf(search_state.venue) < 0) {
                            exclude++;
                        }
                    }
                    if (search_state.free_food === true) {
                        if (d.free_food !== search_state.free_food) {
                            exclude++;
                        }
                    }
                    if (search_state.free_entry === true) {
                        if (d.free_entry !== search_state.free_entry) {
                            exclude++;
                        }
                    }
                    if (search_state.rsvp === true) {
                        if (d.rsvp !== search_state.rsvp_required) {
                            exclude++;
                        }
                    }
                    if (search_state.staff_pick === true) {
                        if (d.staff_pick !== search_state.staff_pick) {
                            exclude++;
                        }
                    }
                    if (search_state.official === true) {
                        if (d.badge_required !== search_state.official) {
                            exclude++;
                        }
                    }
                    return exclude === 0;
                })
                .sortBy(
                    function(x) {
                        return new Date("March " + x.party_date + ", 2016 " + x.party_start_time).getTime();
                    }
                )
                .map(function(value) {
                    var venue_deets = _.findWhere(data.venues, {"id": +value.party_place_id});
                    return {
                        event_details: value,
                        venue_details: venue_deets,
                        calendars: calendarLinks(value.party_name, "March " + value.party_date + ", 2016 " + value.party_start_time, "March " + value.party_date + ", 2016 " + value.party_start_time, venue_deets.address + " Austin, TX", value.party_description)
                    };
                })
                .value();

            // pass data to template
            $list.html(template(matches));

            // trigger the shortening plugin
            $(".comment").shorten();

            // trigger tooltips
            $('[data-toggle="tooltip"]').tooltip();

            // initialize masonry
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item'
            });

            $grid.imagesLoaded().progress(function() {
              $grid.masonry('reloadItems')
                   .masonry('layout');
            });

            // reload masonry on shortlink click
            $('.morelink, .less').on("click", function () {
                    $grid.imagesLoaded( function () {
                      $grid.masonry('reloadItems')
                        .masonry('layout');
                    });
            });

            var count = "parties";

            if (matches.length === 1) {
                count = "party";
            }

            // populate results count div
            $results_count.html("<div class='container'><h2>Found <strong>" + matches.length + "</strong> " + count + "</h2><button class='btn btn-default btn-xs' type='button' id='clear_button' style='margin-top:0;'><i class='fa fa-times-circle'></i> Clear</button></div>");
            $bottom_matter.show();

            $("#clear_button").on('click', clear_filters);

            // scroll to top of ad
            var target = $("#ads");

            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 'fast');

            $loader.hide();

        });

        // fire submit on enter
        $('input[type=text]').bind('keypress', function(e) {
               var key_code = e.keyCode || e.which;
               if(key_code == 13) {
                   $submit_button.click();
               }
        });
            $loader.hide();
        };

    // function to get search state
    var getSearchState = function() {
        var geo = "";
        if (navigator.geolocation) {
            geo = $("#geo_search option:selected").val();
        }
        return {
            day: $day_filter.val().toUpperCase().replace("MARCH ",""),
            geo: geo,
            event_name: $event_filter.val().toUpperCase(),
            venue: $venue_filter.val().toUpperCase(),
            band: $band_filter.val().toUpperCase(),
            free_entry: $free_entry.hasClass("checked"),
            free_food: $free_food.hasClass("checked"),
            rsvp: $rsvp.hasClass("checked"),
            staff_pick: $staff_pick.hasClass("checked"),
            official: $official.hasClass("checked")
        };
    };

    $(document).ready(function() {
        $.getJSON(data_url, function(d) {
            // function to return user lat/lng, if geolocation is available and they opt in
            var getCoords = function(callback) {
                $loader.show();
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(callback, declined_geocoding);
                } else {
                    callback(null);
                }
            };
            var declined_geocoding = function() {
                $top_matter.show();
                $filter_wrapper.show();
                init(d, null, null);
                $loader.hide();
            };
            getCoords(function(position) {
              if(position !== null) {
                  var user_lat = position.coords.latitude;
                  var user_lng = position.coords.longitude;
                  $geo_search_wrapper.show();
                  init(d, user_lat, user_lng);
                  $top_matter.show();
                  $filter_wrapper.show();
              } else {
                  init(d, null, null);
                $top_matter.show();
                $filter_wrapper.show();
              }
            });
        });
    });

}(jQuery, _));
