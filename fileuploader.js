(function(window, undefined){
	var sended = 0,
		file_field = null,
		options = null,
		xhr = new XMLHttpRequest(),
		form_data = new FormData();

	var prepare_request = function(){
		xhr.open('post', options.url, true);

		if(file_field != null){
			form_data.append('file', file_field.files[sended]);
			xhr.timeout = options.timeout;
			if(options.onprogress && typeof options.onprogress == "function"){
				xhr.upload.addEventListener('progress', options.onprogress, false);
			}
			if(options.oncomplete && typeof options.oncomplete == "function"){
				xhr.addEventListener('loadend', options.oncomplete, false);
			}
			if(options.onerror && typeof options.onerror == "function"){
				xhr.addEventListener('error', options.onerror, false);
			}
			if(options.ontimeout && typeof options.ontimeout == "function"){
				xhr.addEventListener('timeout', options.ontimeout, false);
			}
		}
		
		if(options.headers){
			for(key in options.headers)
			{
				xhr.setRequestHeader(key, options.headers[key]);	
			}
		}

		if(options.data){
			for(key in options.data)
			{
				form_data.append(key, options.data[key]);	
			}
		}		

		xhr.addEventListener('loadend', function(event){
			upload_next_file();
		}, false);

		console.log(sended);
	};

	window.fileuploader = function(input_options){
		if(typeof input_options == "object"){
			form_data = new FormData();
			options = input_options;
			file_field = document.querySelector(input_options.selector);
			prepare_request();
			xhr.send(form_data);
		}else{
			return null;
		}
	};

	var upload_next_file = function(){
		if(file_field.files.length > 1){
			sended+=1;
			if(file_field.files[sended] != undefined){
				delete xhr;
				xhr = new XMLHttpRequest();
				form_data = new FormData();
				form_data.append('file', file_field.files[sended]);
				prepare_request();
				xhr.send(form_data);
				delete form_data;
			}else{
				sended = 0;
				file_field.value = "";
			}
		}
	};

})(window);