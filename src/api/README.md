## src/api

Put apis here.  These include interactions with servers,
or persisting data.

They shouldn't be requiring any files outside of the api directory.  

### Directory Structure

    api/
        api-name/
            api-name.js
            sub-api/
                sub-api.js

### Use

Anywhere in the src directory, `require("api/api-name")` will
resolve to `src/api/api-name/api-name.js`.