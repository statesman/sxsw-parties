#!/usr/bin/python

"""
Some fields in the csvjson'd Postgres dump need type conversion/cleanup.
Also, we only want one json object.
That's what this here duder is for.
"""

import json


def toBool(x):
    if x == "true":
        return True
    elif x == "false":
        return False
    else:
        return ""


def convertBreaks(x):
    return "<br>".join(x.splitlines())


with open('venues.json', 'rb') as v, \
     open('parties.json', 'rb') as p, \
     open('data.json', 'wb') as out:
    venues = json.load(v)
    parties = json.load(p)

    venues_out = []
    parties_out = []

    for venue in venues:
        v = {}
        v['id'] = int(venue['id'])
        v['name'] = venue['name']
        v['address'] = venue['address']
        try:
            v['latitude'] = float(venue['latitude'])
            v['longitude'] = float(venue['longitude'])
        except:
            v['latitude'] = 30.3079827
            v['longitude'] = -97.8934866
        v['venue_website'] = venue['venue_website']
        v['twitter_handle'] = venue['twitter_handle']
        v['facebook_url'] = venue['facebook_url']
        venues_out.append(v)

    for party in parties:
        p = {}
        p['id'] = int(party['id'])
        p['party_name'] = party['party_name']
        p['party_description'] = convertBreaks(party['party_description'])
        p['party_date'] = party['party_date']
        p['party_start_time'] = party['party_start_time']
        p['bands'] = convertBreaks(party['bands'])
        p['free_entry'] = toBool(party['free_entry'])
        p['free_food'] = toBool(party['free_food'])
        p['rsvp_required'] = toBool(party['rsvp_required'])
        p['staff_pick'] = toBool(party['staff_pick'])
        p['badge_required'] = toBool(party['badge_required'])
        p['event_or_rsvp_link'] = party['event_or_rsvp_link']
        p['poster'] = party['poster']
        p['party_place_id'] = int(party['party_place_id'])
        parties_out.append(p)

    obj = {}

    obj['venues'] = venues_out
    obj['events'] = parties_out

    out.write(json.dumps(obj))

    print("~~~~~ BUENO ~~~~~")
