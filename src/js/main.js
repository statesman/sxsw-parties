// function to build label string
var labelIt = function(item) {
  var ls = [];
  if (item.free_entry) {
      ls.push('<span class="label label-danger"><i class="fa fa-usd"></i></span>');
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
      return ls.join("&ensp;");
  } else {
      return "";
  }
};

(function($, _) {

  "use strict";

  var dataUrl = 'data.json';

    // cache dom references
    var $list = $("#outlist");
    var $loading = $("#loading");
    var $submit_button = $("#submit_button");
    var $event_filter = $("#event_search");
    var $venue_filter = $("#venue_search");
    var $band_filter = $("#band_search");
    var $free_entry = $("#free_entry");
    var $free_food = $("#free_food");
    var $rsvp = $("#rsvp");
    var $staff_pick = $("#staff_pick");
    var $official = $("#official");

    // set global template variable
    _.templateSettings.variable = "sxsw";

    // fetch template for list div
    var template = _.template($( "script.template" ).html());

    // function to load spinner, or not
    var spinner = function(waiting) {
        if (waiting) {
            $loading.html("<i class='fa fa-cog fa-spin'></i>");
        } else {
            $loading.html("");
        }
    };

    // is it sxsw?
    var isItSXSW = function(today) {
      var d = new Date();
      var sxsw_start = new Date("March 10, 2016");
      var sxsw_end = new Date("March 20, 2016");
      if (d >= sxsw_start && d<= sxsw_end) {
          return true;
      } else {
          return false;
      }
    };

    var doItUp = function(data) {
        // Did the user pass an event ID to the URL?
        if(window.location.hash) {
          spinner(true);
          var event_id = window.location.hash.replace("#","");
          var record = _.findWhere(data.events, {"id": Number(event_id)});
          if (record && record !== null) {
              var data_to_template = [{
                  event_details: record,
                  venue_details: _.findWhere(data.venues, {"id": record.venue})
              }];
              $list.html(template(data_to_template));
          }
          spinner(false);
        }

        var time_for_SXSW = isItSXSW();

        $submit_button.click(function() {
            spinner(true);
            var search_state = getSearchState();
            var matches = _.chain(data.events)
                .filter(function(d) {
                    var venue_details = _.findWhere(data.venues, {"id": d.venue});
                    var included = 0;
                    if (search_state.event_name !== "") {
                        if (d.name.toUpperCase().indexOf(search_state.event_name) < 0) {
                            included++;
                        }
                    }
                    if (search_state.day !== "") {
                        if (search_state.day !== d.date) {
                            included++;
                        }
                    }
                    if (search_state.venue !== "") {
                        if (venue_details.name.toUpperCase().indexOf(search_state.venue) < 0) {
                            included++;
                        }
                    }
                    if (search_state.free_food === true) {
                        if (d.free_food !== search_state.free_food) {
                            included++;
                        }
                    }
                    if (search_state.free_entry === true) {
                        if (d.free_entry !== search_state.free_entry) {
                            included++;
                        }
                    }
                    if (search_state.rsvp === true) {
                        if (d.rsvp !== search_state.rsvp) {
                            included++;
                        }
                    }
                    if (search_state.staff_pick === true) {
                        if (d.staff_pick !== search_state.staff_pick) {
                            included++;
                        }
                    }
                    if (search_state.official === true) {
                        if (d.official !== search_state.official) {
                            included++;
                        }
                    }
                    return included === 0;
                })
                .map(function(value, key) {
                    return {
                        event_details: value,
                        venue_details: _.findWhere(data.venues, {"id": value.venue}),
                    };
                })
                .sortBy(
                    function(x) {
                        return new Date(x.date + " " + x.time).getTime();
                    }
                )
                .value();

            $list.html(template(matches));
            spinner(false);

        });
        if (navigator.geolocation) {
            //console.log("geolocation enabled");
        }
        $('input[type=text]').bind('keypress', function(e) {
               var key_code = e.keyCode || e.which;
               if(key_code == 13) {
                   $submit_button.click();
               }
        });
    };

    var getSearchState = function() {
        return {
            day: $("#day_search option:selected").val(),
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
        $.getJSON(dataUrl, function(d) {
            doItUp(d);
        });
    });

/*
If it's SXSW and the browser has geolocation, load that view, else nah


if (broswerGeo() && isItSXSW()) {

} else {

}

  spinner(true);
*/

//  $('#locate_button').click(function() {});
/*
    var position;

      if (navigator.geolocation) {
          position = navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              return pos;
        };
        return position;
      };

console.log(position);
*/


}(jQuery, _));
