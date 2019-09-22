# Tom's Intercom code test!

Hello reader, apologies for the delay!

Here is one of the ways I might approach the problem; Truth be told, I would most likely migrate this data to a database, and then use an SQL query to do this, however I have approached the problem in a way more alligned to my _normal, read: 'Front End'_ style of working!

I have used Express with Webpack to create a prod ready restful app, that will allow the user to be able to fetch a list of users, limited by distance, and sorted.

## To run locally:

install with: `yarn`<br/>
run with: `yarn start`

*To fetch the data:*<br/>
via curl: `curl localhost:5000/customers-by-location`<br/>
via curl, and saving to an output: `curl -o output.txt localhost:5000/customers-by-location`<br/>
via postman: `GET localhost:5000/customers-by-location`

Each of the following Params can be set, and default to the requirements:

```
  centerLat: number // defaults to 53.339428
  centerLng: number // defaults to -6.257664
  dataSrc: "local" | "web" // defaults to local - allows you to pull from a local static file, or from the aws hosted file that was provided
  maxRadius: number // defaults to 100
  orderBy: "latitude" | "longitude" | "name" | "user_id" // defaults to "user_id"
  orderDir: "asc" | "desc" // defaults to "asc"
```

## To run in prod:

Same as above, but with this url: `https://tom-p-intercom-test.herokuapp.com/customers-by-location` (may take a second to boot)

## Testing:

Unit testing with Jest:

install with: `yarn`<br/>
run with: `yarn test`

## Postman:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0af5aad0debf20698b21)
