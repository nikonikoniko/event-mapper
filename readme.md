## EventObserver

```
collection: [event[observation]]
```


this react application maps a `collection` of `events` over time, each comprising of units of `observation`, allowing for aebitrary filtering by location, time, as well as other object properties of the units.

localstorage is used to remember a user's filter state and, and query parameters are used to be able to link a particular view of the data.

- local storage and query parameters
- dot notation of column names
- filter on any field

[demo](http://niko.io/projects/eventObserverMap/_dist/demo.html)

### todo

config values that still need to be developped

```
use_localstorage // currently just ON
use_params // currently just ON
search_fields // which fields to use for search
locale // or use global locale???
```

### config that is ready to go

```javascript
tilesUrl: link // the openstreetmap tiles url.  defaults to a black and white one
events.source_type:
                   http_json |
                   file_json |
                   google_sheet
events.config.spreadsheet_id: "" // if google_sheet is chosen, the id of the spreadsheet
events.config.sheet_name: "" // if google_sheet is chosen, the name of the sheet in the spreadsheet
events.config.json_url // if http_json is chosen, the url where the JSON can be requested from

events.filter_fields: array // the fields of the events that should show up in the filters box
  // config style like
{
key: str // the key
type: tagsFilter | select // see below for documentation
config: {} // on a per-type basis
}

observations.source_type:
                    http_json |
                    file_json |
                    google_sheet |
                    inline // todo: if the observations are included un the event.observations
observations.config.spreadsheet_id: "" // if google_sheet is chosen, the id of the spreadsheet
observations.config.sheet_name: "" // if google_sheet is chosen, the name of the sheet in the spreadsheet
observations.config.json_url // if http_json is chosen, the url where the JSON can be requested from
```

## filter by particular fields

show config possibilities

#### tagfilter


## current testing spreadsheet

[https://docs.google.com/spreadsheets/d/1NFJg-zzltsHS0s1nZBYI6Bq9riJN0MWra1_lmBwb4V4/edit#gid=639999126](https://docs.google.com/spreadsheets/d/1NFJg-zzltsHS0s1nZBYI6Bq9riJN0MWra1_lmBwb4V4/edit#gid=639999126)
