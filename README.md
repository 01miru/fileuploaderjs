# HTML5 file uploader

Tiny pure javascript ajax uploader for modern browsers (including mobile).

## Installation using bower

```shell
> bower install fileuploader
```

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
			url: 'upload.php',
			data: {
				'filename': 'myfile',
				'type': 'other'
			},
			onprogress: function(e){
				loader.value = Math.round((e.loaded / e.total) * 100);
			},
			oncomplete: function(data, status, xhr){
				loader.value = 100;
				console.log('complete');
			},
			onerror: function(data, status, xhr){
				console.log(e);
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