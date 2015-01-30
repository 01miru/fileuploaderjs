/* fileuploader.js v0.1.4dev by Dorian Nowak */
(function(window, undefined){
	var sended = 0,
		file_field = null,
		options = null,
		xhr = new XMLHttpRequest(),
		form_data = new FormData();

	var getUUID = function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
		});
	};

	var prepare_request = function(){
		xhr = new XMLHttpRequest();
		xhr.open('post', options.url, true);
		xhr.fu = {
			'uuid': getUUID(),
			'file': null
		};

		if(file_field != null){
			form_data.append('file', file_field.files[sended]);
			xhr.fu.file = file_field.files[sended];
			xhr.timeout = options.timeout;
			if(options.onprogress && typeof options.onprogress == "function"){
				xhr.upload.addEventListener('progress', function(progress){
					options.onprogress(progress, xhr);
				}, false);
			}
			if(options.onsubmit && typeof options.onsubmit == "function"){
				options.onsubmit(xhr);
			}
			if(options.oncomplete && typeof options.oncomplete == "function"){
				xhr.addEventListener('loadend', function(){
					var content_type = this.getResponseHeader('content-type');
					var response = this.response;
					if (content_type == 'application/json'){
						try{
							response = JSON.parse(response);
						}catch(ex){}
					}
					options.oncomplete(response, this.status, this);
				}, false);
			}
			if(options.onerror && typeof options.onerror == "function"){
				xhr.addEventListener('error', function(){
					var content_type = this.getResponseHeader('content-type');
					var response = this.response;
					if (content_type == 'application/json'){
						try{
							response = JSON.parse(response);
						}catch(ex){}
					}
					options.onerror(response, this.status, this);
				}, false);
			}
			if(options.ontimeout && typeof options.ontimeout == "function"){
				xhr.addEventListener('timeout', function(){
					options.ontimeout(this, this.status)
				}, false);
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

		xhr.addEventListener('loadend', function(){
			upload_next_file();
		}, false);
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