EventObserver

```
collection: [event[observation]]
```


this react application maps a `collection` of `events` over time, each comprising of units of `observation`, allowing for aebitrary filtering by location, time, as well as other object properties of the units.

localstorage is used to remember a user's filter state and, and query parameters are used to be able to link a particular view of the data.

- local storage and query parameters
- dot notation of column names
- filter on any field



### todo

change config

```javascript
events_source_type: http_json | google_sheet // the type of the source
events_config.spreadsheet_id: "" // if google_sheet is chosen, the id of the spreadsheet
events_config.sheet_name: "" // if google_sheet is chosen, the name of the sheet in the spreadsheet
events_config.json_url // if http_json is chosen, the url where the JSON can be requested from

observations_source_type: http_json | google_sheet // the type of the source
observations_config.spreadsheet_id: "" // if google_sheet is chosen, the id of the spreadsheet
observations_config.sheet_name: "" // if google_sheet is chosen, the name of the sheet in the spreadsheet
observations_config.json_url // if http_json is chosen, the url where the JSON can be requested from
```
