<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <?php
  $meta = array(
    "title" => "SXSW side parties | Statesman.com",
    "description" => "Your guide to the best side parties at SXSW 2016.",
    "shortcut_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.austin360.com_8bc327bbc45a4eafb5625408192c5ff6.ico",
    "apple_touch_icon" => "http://media.cmgdigital.com/shared/theme-assets/242014/www.statesman.com_fa2d2d6e73614535b997734c7e7d2287.png",
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
  <meta property="og:image" id="fb_img_meta" content="" />
  <meta property="og:url" content="<?php print $meta['url']; ?>"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
  <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
  <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
  <meta name="twitter:image" id="tw_img_meta" content="" />
  <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/style.css">

  <link href='http://fonts.googleapis.com/css?family=Lusitana:400,700,900' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

  <?php /* CMG advertising and analytics */ ?>
  <?php include "includes/advertising.inc"; ?>
  <?php include "includes/metrics-head.inc"; ?>

</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top" role="navigaton">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="http://www.austin360.com/" target="_blank">
        <img width="122" height="50" src="assets/logo_austin360_color.png">
      </a>
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" style="padding-top:5px;">
        <li><a href="#filter_wrapper">Search</a></li>
        <li><a href="#" id="loader"></a></li>
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

  <article class="container">

    <div class="row main">

      <div class="col-lg-5">
          <div class="interactive-headers">

      <h1 id="pagetitle" style="font-weight:bold;">Your unofficial SXSW party guide</h1>

      <p class="author">By So Andso</p>
      <p>Lucas ipsum dolor sit amet boba calrissian amidala sith dooku solo moff organa obi-wan windu. There are <span id="total_count"></span> parties in this guide. Gamorrean binks wedge darth. Mon darth mon kit ponda solo. Got a party to add? <a href="mailto:rcorbelli@statesman.com?subject=SXSW%20Party%20Guide">Let us know</a>.</p>

      <p class="lead" id="loading"></p>

      </div>

          <div class="interactive-headers" id="filter_wrapper">
              <h3 class="bold" style="margin-top:0;">Search</h3>


      <div id="filter_forms" style="margin-top:10px;">

<div class="row">

<div class="col-md-6">
<div class="checkbox">
<label for="free_entry">
    <input type="checkbox" id="free_entry">
    <span class="label label-success check_label"><i class="fa fa-thumbs-up"></i>&emsp;Free entry</span>
</label>
</div>

<div class="checkbox">
<label for="free_food">
    <input type="checkbox" id="free_food">
    <span class="label label-primary check_label"><i class="fa fa-cutlery"></i>&emsp;Free food</span>
</label>
</div>

<div class="checkbox">
<label for="rsvp">
    <input type="checkbox" id="rsvp">
    <span class="label label-info check_label"><i class="fa fa-pencil"></i>&emsp;RSVP required</span>
</label>
</div>

</div>

<div class="col-md-6">

<div class="checkbox">
<label for="staff_pick">
    <input type="checkbox" id="staff_pick">
    <span class="label label-warning check_label"><i class="fa fa-star"></i>&emsp;Staff pick</span>
</label>
</div>

<div class="checkbox">
<label for="official">
    <input type="checkbox" id="official">
    <span class="label label-danger check_label"><i class="fa fa-shield"></i>&emsp;Badge required</span>
</label>
</div>


</div>
</div>

<div class="row">
    <div class="col-md-12">

<div class="form-group" style="margin-top:10px;">
    <label for="day_search">Day</label>
    <select class="form-control input-lg" id="day_search">
        <option value="10" selected="selected">Thu (March 10)</option>
        <option value="11">Fri (March 11)</option>
        <option value="12">Sat (March 12)</option>
        <option value="13">Sun (March 13)</option>
        <option value="14">Mon (March 14)</option>
        <option value="15">Tue (March 15)</option>
        <option value="16">Wed (March 16)</option>
        <option value="17">Thu (March 17)</option>
        <option value="18">Fri (March 18)</option>
        <option value="19">Sat (March 19)</option>
        <option value="20">Sun (March 20)</option>
    </select>
</div>

<div id="geo_search_wrapper">
    <div class="form-group" style="margin-top:10px;">
        <label for="geo_search">Nearby</label>
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
</div>

    <p class="small pull-right">
        <a id="more_filter_click">
            <span class="toggle_options">More options &raquo;</span>
            <span class="toggle_options" style="display:none;">&laquo; Fewer options</span>
        </a>
    </p>

    <div class="clearfix"></div>

    <div id="more_filters" style="display:none;">

        <div class="form-group" style="margin-top:10px;">
            <label for="event_search">Event name contains</label>
            <input type="text" class="form-control input-lg" id="event_search" placeholder="Looking for a specific event?">
        </div>

        <div class="form-group" style="margin-top:10px;">
            <label for="venue_search">Venue name contains</label>
            <input type="text" class="form-control input-lg" id="venue_search" placeholder="A venue?">
        </div>

        <div class="form-group" style="margin-top:10px;">
            <label for="band_search">Band names contain</label>
            <input type="text" class="form-control input-lg" id="band_search" placeholder="A band?">
        </div>
    </div>

      </div>


<button class="btn btn-default btn-lg" type="button" id="clear_button">
    <i class="fa fa-times-circle"></i> Clear
</button>

<button type="button" class="btn btn-primary btn-lg pull-right" id="submit_button">
    Go &raquo;
</button>


</div>

  <div class="interactive-headers" id="results_count"></div>

</div>



      <div class="col-lg-6 col-lg-offset-1">
          <div id="outlist"></div>
    </div>

    <script type="text/html" class="template">
        <% _.each(sxsw, function(d) { %>
            <div class="item" id="<%= d.event_details.id %>">
                <div class="sharebox">
                    <p class="lead">
                        Share this party
                        &emsp;
                            <a href="<%= aas_social(d.event_details.id, d.event_details.name, d.event_details.time, d.event_details.date, d.venue_details.name).tw %>" target="_blank"><i class="fa fa-twitter"></i></a>
                            &ensp;
                            <a href="<%= aas_social(d.event_details.id, d.event_details.name, d.event_details.time, d.event_details.date, d.venue_details.name).fb %>" target="_blank"><i class="fa fa-facebook-square"></i></a>

                    </p>
                </div>

                <div class="inner-wrapper">
                <h1 style="margin-top:0; font-weight:bold;">
                    <%= d.event_details.name %>
                </h1>
                <p class="ital">
                    March <%= d.event_details.date %>
                    &ensp;&bull;&ensp;
                    <%= get12Hour(d.event_details.time) %>
                    <% if (d.event_details.rsvp) { %>
                    &ensp;&bull;&ensp;
                    <a href="<%= d.event_details.event_link %>" target="_blank">RSVP</a>
                    <% }; %>
                </p>

                <%= labelIt(d.event_details) %>

                <p class="comment"><%= d.event_details.description %></p>

                <% if (d.event_details.event_link && d.event_details.event_link !== "") { %>
                <p><a href="<%= d.event_details.event_link %>" target="_blank">Website</a></p>
                <% }; %>

                <% if (d.event_details.bands && d.event_details.bands !== "") { %>
                    <hr>
                <p><span class="bold">Bands</span><br><%= d.event_details.bands %></p>
                <% }; %>

                <hr>

                <h3 class="bold">
                    <%= d.venue_details.name %>
                </h3>
                <p><i class="fa fa-map-marker"></i>&ensp;<a href="<%= googleMap(d.venue_details.address) %>" target="_blank"><%= d.venue_details.address %></a></p>

                <% if (d.event_details.poster && d.event_details.poster !== "") { %>
                <img src="<%= d.event_details.poster %>" style="width:100%; margin-top:10px;" />
                <% }; %>

            </div>

            </div>
        <% }); %>
    </script>

  </article>

    <!-- bottom matter -->
    <?php include "includes/banner-ad.inc";?>
    <?php include "includes/legal.inc";?>
    <?php include "includes/project-metrics.inc"; ?>
    <?php include "includes/metrics.inc"; ?>

    <script src="dist/scripts.js"></script>

  <?php if($_SERVER['SERVER_NAME'] === 'localhost'): ?>
    <script src="//localhost:35729/livereload.js"></script>
  <?php endif; ?>
</body>
</html>
