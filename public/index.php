<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <?php
  $meta = array(
    "title" => "SXSW side parties | Statesman.com",
    "description" => "Your guide to the best side parties at SXSW 2016.",
    "thumbnail" => "http://projects.statesman.com/sxsw/assets/share.png", // needs update
    "shortcut_icon" => "http://media.cmgdigital.com/shared/media/2015-11-16-11-32-05/web/site/www_mystatesman_com/images/favicon.ico",
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
  <meta property="og:image" content="<?php print $meta['thumbnail']; ?>"/>
  <meta property="og:url" content="<?php print $meta['url']; ?>"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
  <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
  <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
  <meta name="twitter:image" content="<?php print $meta['thumbnail']; ?>" />
  <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/style.css">

  <link href='http://fonts.googleapis.com/css?family=Lusitana:400,700' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:400,300,300italic,400italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Alfa+Slab+One' rel='stylesheet' type='text/css'>


  <?php /* CMG advertising and analytics */ ?>
  <?php include "includes/advertising.inc"; ?>
  <?php include "includes/metrics-head.inc"; ?>

</head>
<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

        <a class="navbar-brand" href="http://www.statesman.com/" target="_blank">
        <img class="visible-xs visible-sm" width="103" height="26" src="assets/logo-short-black.png" />
        <img class="hidden-xs hidden-sm" width="273" height="26" src="assets/logo.png" />
        </a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
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
      <div class="col-lg-6 interactive-header">
      <h1 id="pagetitle">Your unofficial SXSW party guide</h1>

      <p class="author">By So Andso</p>
      <p>Lucas ipsum dolor sit amet boba calrissian amidala sith dooku solo moff organa obi-wan windu. Gamorrean binks wedge darth. Mon darth mon kit ponda solo.</p>
      <hr>

              <h2 class="bold">Search&emsp;<span id="loading"></span></h2>
      <div id="filter_forms">


<label class="checkbox-inline input-lg" for="free_entry">
    <input type="checkbox" id="free_entry">
    <span class="label label-danger"><i class="fa fa-usd"></i>&emsp;Free entry</span>
</label>

<label class="checkbox-inline input-lg" for="free_food">
    <input type="checkbox" id="free_food" checked="checked">
    <span class="label label-primary"><i class="fa fa-cutlery"></i>&emsp;Free food</span>
</label>


<label class="checkbox-inline input-lg" for="rsvp">
    <input type="checkbox" id="rsvp">
    <span class="label label-warning"><i class="fa fa-pencil"></i>&emsp;RSVP required</span>
</label>

<label class="checkbox-inline input-lg" for="staff_pick"  style="float:left;">
    <input type="checkbox" id="staff_pick">
    <span class="label label-info"><i class="fa fa-star"></i>&emsp;Staff pick</span>
</label>


<label class="checkbox-inline input-lg" for="official">
    <input type="checkbox" id="official">
    <span class="label label-success"><i class="fa fa-shield"></i>&emsp;Badge required</span>
</label>


    <div class="form-group" style="margin-top:10px;">
        <label for="day_search">Day</label>
        <select class="form-control input-lg" id="day_search">
            <option value="" selected="selected">---------</option>
            <option value="10">Thu (March 10)</option>
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

    <div id="geo_filter"></div>

    <p class="small"><a id="more_filter_click">More options&ensp;<i class="fa fa-plus-square"></i></a></p>

    <div class="more_filters">

        <div class="form-group" style="margin-top:10px;">
            <label for="event_search">Event name</label>
            <input type="text" class="form-control input-lg" id="event_search">
        </div>

        <div class="form-group" style="margin-top:10px;">
            <label for="venue_search">Venue</label>
            <input type="text" class="form-control input-lg" id="venue_search" placeholder="Looking for a specific venue?">
        </div>

        <div class="form-group" style="margin-top:10px;">
            <label for="band_search">Band</label>
            <input type="text" class="form-control input-lg" id="band_search" placeholder="A specific band?">
        </div>
    </div>



      </div>

<button class="btn btn-primary btn-lg btn-block" type="button" id="submit_button">Go &raquo;</button>

            </div>

      <div class="col-lg-5 col-lg-offset-1">
          <div id="outlist"></div>
    </div>

    <script type="text/html" class="template">
        <% _.each(sxsw, function(d) { %>
            <div class="item" id="<%= d.event_details.id %>">
                <h2 style="margin-top:0; font-weight:bold;">
                    <%= d.event_details.name %>
                </h2>
                <h3><%= d.venue_details.name %></h3>
                <p><%= d.event_details.description %></p>
                <% if (d.event_details.bands && d.event_details.bands !== "") { %>
                <p><%= d.event_details.bands %></p>
                <% }; %>
                <p><%= labelIt(d.event_details) %></p>
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
