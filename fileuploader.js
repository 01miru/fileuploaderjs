(function(window, undefined){
	window.fileuploader = function(input_options){
		if(typeof input_options == "object"){
			var fd = new FormData()
			var file_field = document.querySelector(input_options.selector)
			if(file_field != null){
				var xhr = new XMLHttpRequest();
				xhr.open('post', input_options.url, true);
				fd.append('file', file_field.files[0]);
				xhr.timeout = input_options.timeout;
				if(input_options.progress && typeof input_options.progress == "function"){
					xhr.upload.addEventListener('progress', input_options.progress, false);
				}
				if(input_options.oncomplete && typeof input_options.oncomplete == "function"){
					xhr.addEventListener('loadend', input_options.oncomplete, false);
				}
				if(input_options.onerror && typeof input_options.onerror == "function"){
					xhr.addEventListener('error', input_options.onerror, false);
				}
				if(input_options.ontimeout && typeof input_options.ontimeout == "function"){
					xhr.addEventListener('timeout', input_options.ontimeout, false);
				}
			}
			if(input_options.headers){
				for(key in input_options.headers)
				{
					xhr.setRequestHeader(key, input_options.headers[key]);	
				}
			}
			xhr.send(fd);
				return xhr;
		}else{
			return null;
		}
	};
})(window);