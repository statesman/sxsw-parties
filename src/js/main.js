// function to build label string
var labelIt = function(item) {
  var ls = [];
  if (item.free_entry) {
      ls.push('<span class="label label-danger"><i class="fa fa-thumbs-up"></i></span>');
  }
  if (item.staff_pick) {
      ls.push('<span class="label label-info"><i class="fa fa-star"></i></span>');
  }
  if (item.free_food) {
      ls.push('<span class="label label-primary"><i class="fa fa-cutlery"></i></span>');
  }
  if (item.rsvp) {
      ls.push('<span class="label label-warning"><i class="fa fa-pencil"></i></span>');
  }
  if (item.official) {
      ls.push('<span class="label label-success"><i class="fa fa-shield"></i></span>');
  }
  if (ls.length > 0) {
      return "<p>" + ls.join("&ensp;") + "</p>";
  } else {
      return "";
  }
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

// function to return tw/fb links
var aas_social = function(event_id, event_name, event_time, event_date, venue_name) {
    var root_url = window.location.hostname;
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
            moreText: "<i class='fa fa-plus-square-o'>",
            lessText: "<i class='fa fa-minus-square-o'>"
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
    var $list = $("#outlist");
    var $loading = $("#loading");
    var $submit_button = $("#submit_button");
    var $clear_button = $("#clear_button");
    var $event_filter = $("#event_search");
    var $venue_filter = $("#venue_search");
    var $band_filter = $("#band_search");
    var $free_entry = $("#free_entry");
    var $free_food = $("#free_food");
    var $rsvp = $("#rsvp");
    var $staff_pick = $("#staff_pick");
    var $official = $("#official");
    var $more_filters = $("#more_filters");
    var $toggle_options = $(".toggle_options");
    var $geo_search_wrapper = $('#geo_search_wrapper');
    var $filter_wrapper = $('#filter_wrapper');
    var $results_count = $("#results_count");

    // set global template variable
    _.templateSettings.variable = "sxsw";

    // fetch template for list div
    var template = _.template($( "script.template" ).html());

    // function to clear filters
    var clear_filters = function() {
        $loading.html("<i class='fa fa-cog fa-spin'></i>");
        $('input[type=text]').val('');
        $('input[type=checkbox]').attr('checked', false);
        $('#day_search option:eq(0)').prop('selected', true);
        $list.html('');
        $loading.html("");
    };

    // function to toggle additional filters
    var toggle_filters = function() {
        $more_filters.toggle();
        $toggle_options.toggle();
    };

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

    var init = function(data, latitude, longitude) {

        var time_for_SXSW = isItSXSW();

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
              $results_count.html("<hr><div class='alert alert-danger lead' role='alert'>Found <strong>1</strong> party</div>");
              $(".comment").shorten();
          }
        }

        if (time_for_SXSW) {
            var d = new Date();
            var today = d.getDate().toString();
            $('#day_search option[value="' + today + '"]').attr("selected", "selected");
        }

        $clear_button.on('click', clear_filters);

        $('#more_filter_click').on('click', toggle_filters);

        $submit_button.on('click', function() {
            $loading.html("<i class='fa fa-cog fa-spin'></i>");
            var search_state = getSearchState();
            var matches = _.chain(data.events)
                .filter(function(d) {
                    var venue_details = _.findWhere(data.venues, {"id": d.venue});
                    var exclude = 0;
                    if (search_state.event_name !== "") {
                        if (d.name.toUpperCase().indexOf(search_state.event_name) < 0) {
                            exclude++;
                        }
                    }
                    if (search_state.band !== "") {
                        if (d.bands.toUpperCase().indexOf(search_state.band) < 0) {
                            exclude++;
                        }
                    }
                    if (search_state.day !== "") {
                        if (Number(search_state.day) !== d.date) {
                            exclude++;
                        }
                    }
                    if (search_state.geo !== "") {
                        if (latitude && latitude !== null && longitude && longitude !== null) {
                          var venue_lat = venue_details.lat;
                          var venue_lng = venue_details.lng;
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
                        if (d.rsvp !== search_state.rsvp) {
                            exclude++;
                        }
                    }
                    if (search_state.staff_pick === true) {
                        if (d.staff_pick !== search_state.staff_pick) {
                            exclude++;
                        }
                    }
                    if (search_state.official === true) {
                        if (d.official !== search_state.official) {
                            exclude++;
                        }
                    }
                    return exclude === 0;
                })
                .map(function(value) {
                    return {
                        event_details: value,
                        venue_details: _.findWhere(data.venues, {"id": value.venue}),
                    };
                })
                .sortBy(
                    function(x) {
                        return new Date("March " + x.date + ", 2016 " + x.time).getTime();
                    }
                )
                .value();

            $list.html(template(matches));
            $(".comment").shorten();
            var count = "parties";
            if (matches.length === 1) {
                count = "party";
            }
            $results_count.html("<hr><div class='alert alert-danger lead' role='alert'>Found <strong>" + matches.length + "</strong> " + count + "</div>");
            $loading.html("");
        });

        $('input[type=text]').bind('keypress', function(e) {
               var key_code = e.keyCode || e.which;
               if(key_code == 13) {
                   $submit_button.click();
               }
        });
    };

    var getSearchState = function() {
        var geo = "";
        if (navigator.geolocation) {
            geo = $("#geo_search option:selected").val();
        }
        return {
            day: $("#day_search option:selected").val(),
            geo: geo,
            event_name: $event_filter.val().toUpperCase(),
            venue: $venue_filter.val().toUpperCase(),
            band: $band_filter.val().toUpperCase(),
            free_entry: $free_entry.is(":checked"),
            free_food: $free_food.is(":checked"),
            rsvp: $rsvp.is(":checked"),
            staff_pick: $staff_pick.is(":checked"),
            official: $official.is(":checked")
        };
    };

    $(document).ready(function() {
        $.getJSON(data_url, function(d) {
            // function to return user lat/lng, if geolocation is available and they opt in
            var getCoords = function(callback) {
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(callback, declined_geocoding);
                } else {
                    callback(null);
                }
            };
            var declined_geocoding = function() {
                $filter_wrapper.show();
                init(d, null, null);
            };
            getCoords(function(position) {
              if(position !== null) {
                  $loading.html("<i class='fa fa-cog fa-spin'></i>");
                  var user_lat = position.coords.latitude;
                  var user_lng = position.coords.longitude;
                  $geo_search_wrapper.show();
                  init(d, user_lat, user_lng);
                  $filter_wrapper.show();
                  $loading.html('');
              } else {
                  $loading.html("<i class='fa fa-cog fa-spin'></i>");
                  init(d, null, null);
                  $filter_wrapper.show();
                  $loading.html('');
              }
            });
        });
    });

}(jQuery, _));
