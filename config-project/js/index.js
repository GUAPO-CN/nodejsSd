let _eslint,editStr,_initEditor,submitText,creatXHR,xhrRequest;
	var textarea2 = {
		"axios": {
			"baseURL": function({
				_req
			}) {
				if (_req.header.origin == 'http://oss-bulletin.test.glsx.com.cn') {
					return "http://qcdidicb.glsx.net:7060"
				} else if (_req.header.origin.startsWith('http://192.168')) {
					return "http://192.168.3.206:8923"
				} else if (_req.header.origin.startsWith('http://oss-bulletin.glsx.com.cn')) {
					return "http://didicb.glsx.com.cn"
				} else if (_req.header.origin.startsWith('http://localhost')) {
					return "http://qcdidicb.glsx.net:7060"
				} else {
					return "http://192.168.3.171:7300/mock/5cb0021e4bd1a108f923bf92/oss-notice/"
				}
			},
			"fileUploadURL": function({
				_req
			}) {
				if (_req.header.origin == 'http://oss-bulletin.test.glsx.com.cn') {
					return "http://dj.test.glsx.com.cn/web-dj-site"
				} else if (_req.header.origin.startsWith('http://192.168')) {
					return "http://192.168.3.206:8923"
				} else if (_req.header.origin.startsWith('http://oss-bulletin.glsx.com.cn')) {
					return "http://gps.cgacar.com/web-dj-site"
				} else if (_req.header.origin.startsWith('http://localhost')) {
					return "http://192.168.2.89:8091"
				} else {
					return "http://192.168.3.171:7300/mock/5cb0021e4bd1a108f923bf92/oss-notice/"
				}
			},
			"whiteList": [
				'router',
				'router?method=glsx.accounts.admin.bulletin.create',
				'router?method=glsx.accounts.admin.bulletin.create.check',
				'glsx.accounts.admin.bulletin.search',
				'glsx.accounts.bulletin.push.search',
				'glsx.accounts.admin.bulletin.complete.search',
				'glsx.accounts.bulletin.publish.cancel',
				'glsx.accounts.admin.merchant.group.dict',
				'glsx.accounts.admin.merchant.getall',
				'glsx.accounts.bulletin.message.detail',
				'glsx.accounts.admin.bulletin.create',
				'glsx.accounts.admin.bulletin.detail'
			],
			"timeout": 15000,
			"result": {
				"data_key": "data",
				"message_key": "message",
				"code_key": "code",
				"code_success_value": "0",
				"code_message_map": {}
			}
		},
		"css_url": 'http://oss-config.test.glsx.com.cn/mock/5be17454f31545347559d499/config/index.css'
	}
	
	//自定义textarea
		document.getElementById('textarea').value= '';

	//ace web编辑器 
		_initEditor = () => {
			// 1.初始化editor(）
				var editor = ace.edit('editor');
			//2.设置主题
				editor.setTheme('ace/theme/monokai')
				// editor.setTheme("ace/theme/twilight");

				editor.setOption('tabSize', 2)
				editor.setOption('fontSize', 15)
				editor.setOption('enableLiveAutocompletion', true)
				editor.setOption('enableSnippets', true)
				// editor.execCommand('find')//与ctrl+f功能一致
				// editor.moveCursorTo(0, 0)//移动光标至第0行，第0列
			//3.设置编辑语言
				editor.getSession().setMode('ace/mode/javascript');

				editor.clearSelection()
				editor.getSession().setUseWorker(false)
				editor.on('change', () => {
					// console.log(editor.getValue(),'editor.getValue()');
				})
				editor.commands.addCommand({
					name: 'save',
					bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
					exec: () => {
						// console.log(editor.getValue(),'editor.getValue()');
						editStr = editor.getValue()
						_eslint()
						submitText(editStr)
					}
				})
				// editor.setValue(JSON.stringify(textarea2))
		}
		_eslint = () =>{
			try {
				const value = (new Function(`return ${editStr}`))() // eslint-disable-line
				if (!value) {
					alert('不能为空')
					return
				} else if (typeof value !== 'object') {
					throw 'new Error()'
				}
			} catch (error) {
				if (!/^http(s)?:\/\//.test(editStr)) {
					console.log(error,'error');
					alert('请输入对象格式')
					return
				}
			}
		}
		submitText = (data) => {
			let fd =new FormData();
			fd.append('json',data)
			let reqData = JSON.stringify({'json':data})
			xhrRequest('http://localhost:5555/bhgConfig',reqData,(res)=>{
				console.log(res,'res');
			})
		}
		creatXHR = () => {
			if(typeof XMLHttpRequest != 'undefined'){
				return new XMLHttpRequest()
			}else if(typeof ActiveXObject != 'undefined'){
				if(typeof arguments.callee.activeXString != 'string'){
					var version =  ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0' ,'MSXML2.XMLHttp'], i,len;
						for(i=0,len=versions.length; i<len;i++){
							try{
								new ActiveXObject(versions[i]);
								arguments.callee.activeXString = versions[i];
								break;
							}
							catch(ex){
								// jump
							}
						}
					return new ActiveXObject(arguments.callee.activeXString);
				}
			}else{
				throw new Error('No XHR object available.') 
			}
		}
		xhrRequest = (url,body,callback) => {
			let xhr = creatXHR();
			xhr.onreadyStateChange = ()=> {
				if(xhr.readyStatus == 4) {
					if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){//200 表示相应成功 304 表示缓存中存在请求的资源
						let str = xhr.responseText;
						callback(str);
					}
					else{
						return 'request is unsucessful '+xhr.status;
					}
				}
			}
			xhr.open('post',url,true)
			// xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
			xhr.setRequestHeader('Content-Type','application/json')
			xhr.send(body)
		}
		_initEditor();