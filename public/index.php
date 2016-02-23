<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <?php
  $meta = array(
    "title" => "SXSW 2016 parties | Statesman.com",
    "description" => "Your guide to the best parties at SXSW 2016.",
    "shortcut_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.austin360.com_8bc327bbc45a4eafb5625408192c5ff6.ico",
    "apple_touch_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.statesman.com_fa2d2d6e73614535b997734c7e7d2287.png",
    "img" => "assets/share.png",
    "url" => "http://projects.statesman.com/sxsw/",
    "twitter" => "statesman"
  );
?>

  <title>Interactive: <?php print $meta['title']; ?> | Austin American-Statesman</title>
  <link rel="shortcut icon" href="<?php print $meta['shortcut_icon']; ?>" />
  <link rel="apple-touch-icon" href="<?php print $meta['apple_touch_icon']; ?>" />

  <link rel="canonical" href="<?php print $meta['url']; ?>" />

  <meta name="description" content="<?php print $meta['description']; ?>">

  <meta property="og:title" content="<?php print $meta['title']; ?>"/>
  <meta property="og:description" content="<?php print $meta['description']; ?>"/>
  <meta property="og:image" id="fb_img_meta" content="<?php print $meta['img']; ?>" />
  <meta property="og:url" content="<?php print $meta['url']; ?>"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
  <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
  <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
  <meta name="twitter:image" id="tw_img_meta" content="<?php print $meta['img']; ?>" />
  <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/style.css">

  <link href='https://fonts.googleapis.com/css?family=Roboto:400,900' rel='stylesheet' type='text/css'>

  <?php /* CMG advertising and analytics */ ?>
  <?php include "includes/advertising.inc"; ?>
  <?php include "includes/metrics-head.inc"; ?>

</head>
<body data-spy="scroll" data-target=".navbar-scroller">
<nav class="navbar navbar-default navbar-fixed-top" role="navigaton">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="http://www.austin360.com/" target="_blank">
        <img width="122" height="50" src="assets/logo_austin360_color.png">
      </a>
      <div class="navbar-header" id="search_and_spinner">
          <a class="navbar-text" href="#searchbox">Search</a>
      </div>

    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" style="padding-top:5px;">

        <li class="visible-xs small-social"><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
      </ul>
        <ul class="nav navbar-nav navbar-right social hidden-xs">
          <li><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a></li>
          <li><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
        </ul>
    </div>
  </div>
</nav>

    <article>

<div class="container" id="loader" style="display:none;">
    <h1><i class="fa fa-spinner fa-spin"></i> Loading ...</h1>
</div>

<div id="top_matter">

    <div id="splash">
        <div class="container">
            <h1>Your unofficial SXSW party guide</h1>
                <p class="lead">Search for <span id="total_count"></span> parties happening at SXSW 2016. Got a party to add? <a href="mailto:rcorbelli@statesman.com?subject=SXSW%20Party%20Guide">Let us know</a>.</p>
        </div>
    </div>

    <div id="searchbox">
        <div class="container">
                <label>Click options to filter results</label>
                <div class="clearfix"></div>
                <button class="btn btn-success btn-lg check_button" type="button" id="free_entry_button"><i class="fa fa-circle-o"></i> Free entry</button>
                <button class="btn btn-primary btn-lg check_button" type="button" id="free_food_button"><i class="fa fa-circle-o"></i> Free food</button>
                <button class="btn btn-info btn-lg check_button" type="button" id="rsvp_button"><i class="fa fa-circle-o"></i> RSVP required</button>
                <button class="btn btn-warning btn-lg check_button" type="button" id="staff_pick_button"><i class="fa fa-circle-o"></i> Staff pick</button>
                <button class="btn btn-danger btn-lg check_button" type="button" id="badge_req_button"><i class="fa fa-circle-o"></i> Badge required</button>

                <div class="row" style="margin-top:20px;">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group" style="margin-top:10px;">
                        <label for="day_search">Select day (leave blank for all)</label>
                        <input type="text" class="form-control input-lg" id="day_search" value="">
                    </div>
                    <div id="more_filters" style="display:none;">
                        <div class="form-group" style="margin-top:10px;">
                            <label for="event_search">Event name contains</label>
                            <input type="text" class="form-control input-lg morefilter" id="event_search" placeholder="Looking for a specific event?">
                        </div>
                        <div class="form-group" style="margin-top:10px;">
                            <label for="venue_search">Venue name contains</label>
                            <input type="text" class="form-control input-lg morefilter" id="venue_search" placeholder="A venue?">
                        </div>
                        <div class="form-group" style="margin-top:10px;">
                            <label for="band_search">Band names contain</label>
                            <input type="text" class="form-control input-lg morefilter" id="band_search" placeholder="A band?">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xs-12">
                    <div id="geo_search_wrapper">
                        <div class="form-group" style="margin-top:10px;">
                            <label for="geo_search">Find parties nearby</label>
                            <select class="form-control input-lg" id="geo_search">
                                <option value="" selected="selected">All</option>
                                <option value="1">Within 1 mile of me</option>
                                <option value="0.75">Within 3/4 mile of me</option>
                                <option value="0.5">Within 1/2 mile of me</option>
                                <option value="0.25">Within 1/4 mile of me</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div> <!-- //.row -->
                <div class="row">
                    <div class="col-md-12">
                            <p class="small">
                               <a id="more_filter_click">
                                   <span class="toggle_options">More options &raquo;</span>
                                   <span class="toggle_options" style="display:none;">&laquo; Fewer options</span>
                               </a>
                            </p>
                            <button type="button" class="btn btn-lg btn-default" id="submit_button">
                                Search &raquo;
                            </button>
                    </div>
                </div>


        </div> <!-- //.container -->
    </div> <!-- //#searchbox -->

</div> <!-- // #top_matter -->

    <?php include "includes/banner-ad.inc";?>

<div id="bottom_matter">
    <div id="results_count"></div>

    <div class="container">
        <div class="row grid" id="outlist"></div>
    </div>
</div>
    </article>

    <script type="text/html" class="template">
        <% _.each(sxsw, function(d) { %>
            <div class="col-xs-12 col-sm-6 col-md-4 grid-item" id="<%= d.event_details.id %>">
                <div class="inner_card">
                <div class="sharebox">
                    <p class="lead">
                        Share this party&emsp;<a href="<%= aas_social(d.event_details.id, d.event_details.party_name, d.event_details.party_start_time, d.event_details.party_date, d.venue_details.name).tw %>" target="_blank"><i class="fa fa-twitter"></i></a>&ensp;&ensp;<a href="<%= aas_social(d.event_details.id, d.event_details.party_name, d.event_details.party_start_time, d.event_details.party_date, d.venue_details.name).fb %>" target="_blank"><i class="fa fa-facebook-square"></i></a>
                    </p>
                </div>
                <div class="clearfix"></div>

                <div class="inner-wrapper">
                <h2 style="margin-top:0; font-weight:bold;">
                    <%= d.event_details.party_name %>
                </h2>
                <p class="ital">
                    March <%= d.event_details.party_date %>
                    &ensp;&bull;&ensp;
                    <%= get12Hour(d.event_details.party_start_time) %>
                    <% if (d.event_details.rsvp_required) { %>
                    &ensp;&bull;&ensp;
                    <a href="<%= d.event_details.event_or_rsvp_link %>" target="_blank">RSVP</a>
                    <% }; %>
                </p>

                <%= labelIt(d.event_details) %>

                <p class="comment"><%= d.event_details.party_description %></p>

                <% if (d.event_details.event_or_rsvp_link && d.event_details.event_or_rsvp_link !== "") { %>
                <hr>
                <p><a href="<%= d.event_details.event_or_rsvp_link %>" target="_blank">Website</a></p>
                <% }; %>

                <% if (d.event_details.bands && d.event_details.bands !== "") { %>
                    <hr>
                <p class="comment"><span class="bold">Bands</span><br><%= d.event_details.bands %></p>
                <% }; %>

                <hr>

                <h3 class="bold">
                    <%= d.venue_details.name %>
                </h3>
                <p><i class="fa fa-map-marker"></i>&ensp;<a href="<%= googleMap(d.venue_details.address) %>" target="_blank"><%= d.venue_details.address %></a></p>

                <% if (d.calendars) { %>
                <!--
                    <hr>
                    <p>
                        <b>Add to calendar</b><br>
                        <a role="button" class="btn btn-xs btn-default cal" href="<%= d.calendars.google.href %>" target="_blank"><i class="fa <%= d.calendars.google.icon %>"></i>&emsp;Google</a><br>
                        <a role="button" class="btn btn-xs btn-default cal" href="<%= d.calendars.ics.href %>" target="_blank"><i class="fa <%= d.calendars.ics.icon %>"></i>&emsp;iCal</a><br>
                        <a role="button" class="btn btn-xs btn-default cal" href="<%= d.calendars.ics.href %>" target="_blank"><i class="fa <%= d.calendars.ics.icon %>"></i>&emsp;Outlook</a><br>
                        <a role="button" class="btn btn-xs btn-default cal" href="<%= d.calendars.yahoo.href %>" target="_blank"><i class="fa <%= d.calendars.yahoo.icon %>"></i>&emsp;Yahoo!</a>
                    </p>
                -->
                <% }; %>

                <% if (d.event_details.poster && d.event_details.poster !== "") { %>
                <img src="<%= fetchImg(d.event_details.poster) %>" style="width:100%; margin-top:10px;" />
                <% }; %>

            </div>
        </div>

            </div>
        <% }); %>
    </script>

    <!-- bottom matter -->
    <?php include "includes/legal.inc";?>
    <?php include "includes/project-metrics.inc"; ?>
    <?php include "includes/metrics.inc"; ?>
    <script src="dist/scripts.js"></script>

  <?php if($_SERVER['SERVER_NAME'] === 'localhost'): ?>
    <script src="//localhost:35729/livereload.js"></script>
  <?php endif; ?>
</body>
</html>
