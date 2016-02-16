#!/bin/sh

heroku pg:psql --app aas-data-warehouse << EOF
\copy (SELECT * FROM sideparties_venue) TO '~/www/projects/sxsw/public/venues.csv' CSV HEADER;
\copy (SELECT id::INT, party_name, party_description, party_date, party_start_time, bands, free_entry::VARCHAR, free_food::VARCHAR, rsvp_required::VARCHAR, staff_pick::VARCHAR, event_or_rsvp_link, poster, party_place_id::INT, badge_required::VARCHAR FROM sideparties_event) TO '~/www/projects/sxsw/public/parties.csv' CSV HEADER;
\q
EOF
cd ~/www/projects/sxsw/public
csvjson venues.csv > venues.json
csvjson parties.csv > parties.json
python merge_json.py
rm venues.csv parties.csv venues.json parties.json
