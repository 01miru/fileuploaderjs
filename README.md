# HTML5 file uploader [![Build Status](https://travis-ci.org/01miru/fileuploaderjs.svg?branch=master)](https://travis-ci.org/01miru/fileuploaderjs)

Tiny, multifile, pure javascript (works without jquery) ajax uploader for modern browsers (including mobile).

## Features

- Can handle large files (1GB+)
- Multi file support
- Every file will be send as separate request
- Ultra lightweight ~ 2KB
- Every file has unique identifier (UUID)
- Ultra customizable
- Mobile browsers are supported
- MIT Licensed

## Installation using bower

```shell
> bower install fileuploader
```

## Options

Name             | Type    | Description
-----------------|---------|-----------------------------
url			     | string  | URL for sending requests
file_input_name  | string  | file field name in request (default: "file")
headers	         | object  | list of headers
data		     | object  | list of other parameters to send
selector		 | string  | file input selector (ex. "#file-input")

## Events

Name        | Type     | Description
------------|----------|---------------------------
onsubmit    | function | after each upload
onprogress  | function | while uploading file 
oncomplete  | function | after sending the file
onerror     | function | when error occured
finally     | function | after sending all files

## Example

HTML
```HTML
<html>
<head>
	<meta charset="utf-8">
	<script src="fileuploader.min.js"></script>
</head>
<body>
	<input type="file" class="user-file" multiple>
	<button class="send" onclick="upload()">Send</button>
	<br/><br/>
	<progress min="0" max="100" value="0" class="progressbar"></progress>
</body>
</html>
```

JavaScript

```javascript
function upload(){
    var loader = document.querySelector('.progressbar');
    var upl = fileuploader({
        selector: '.user-file',
        file_input_name: 'file',
        url: 'upload.php',
        headers: {
            'myCsrfToken': '!334234#2344$234234@@234'
        },
        data: {
            'filename': 'myfile',
            'type': 'other'
        },
        onsubmit: function(xhr){
            console.log("Starting upload for: " + xhr.fu.file.name);
            console.log("Upload uuid: " + xhr.fu.uuid);
        },
        onprogress: function(e, xhr){
            loader.value = Math.round((e.loaded / e.total) * 100);
        },
        oncomplete: function(data, status, xhr){
            loader.value = 100;
            console.log('complete');
            console.log(data);
        },
        onerror: function(data, status, xhr){
            console.log(data);
        },
        finally: function(){
            console.log('all files sent');
        }

    });
}
```

Full example with simple php file available in example directory.

### On complete event

Data parameter contains response from server. If content type of response is JSON, will be automaticly converted to object or array.

Status parameter contains status code from response (ex. 200, 302..)

### On error event

Same as above.

### Supported browsers
IE 10+, Chrome 7+, FIrefox 4+, Safari 5+, Opera 12+, iOS Safari 5+, Android Browser 3+. Supports also all other mobile browsers excpet Opera Mini 8.


### Licence
MIT License