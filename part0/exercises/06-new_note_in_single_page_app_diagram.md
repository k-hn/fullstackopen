sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message": "note created"} (Status: 200)
    deactivate server

    Note right of browser: The browser executes the callback function that makes a POST request to the server and then update HTML if successful
