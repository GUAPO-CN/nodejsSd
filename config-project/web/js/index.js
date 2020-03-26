	let textarea2 = {'aa':111}
	//自定义textarea
		document.getElementById('textarea').value= '';

	//获取列表数据
		function getList(){
			let xhr = new XhrRequest();
			xhr.xhrRequest('http://localhost:5555/config/list',{'method':'get'},null,(res)=>{
				console.log(JSON.parse(res),'res');
			})
		}

	//ace web编辑器 
		function AceEditor(params){
			if(this instanceof AceEditor){
				this.ace = params.ace
				this.editStr = 'xxx'
				this.isPost = true
				this.callback = params.callback 
				this.URL = params.url

				if(typeof(this._initEditor) != 'function'){
					AceEditor.prototype._initEditor = () => {
						// 1.初始化editor(）
							var editor = this.ace.edit('editor');
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
									this.editStr = editor.getValue()
									this._eslint()
									alert(this.isPost)
									if(this.isPost){
										this.submitText(this.editStr)
									}
								}
							})
							// editor.setValue(JSON.stringify(textarea2))
					}
				}
				if(typeof(this._eslint) != 'function'){
					AceEditor.prototype._eslint = () =>{
						try {
							const value = (new Function(`return ${this.editStr}`))() // eslint-disable-line 将editStr 动态解析执行字符串
							if (!value) {
								this.isPost = false 
								alert('不能为空')
								return
							} else if (typeof value !== 'object') {
								this.isPost = false
								throw 'new Error()'
							}
						} catch (error) {
							if (!/^http(s)?:\/\//.test(this.editStr)) {
								console.log(error,'error');
								this.isPost = false
								alert('请输入对象格式')
								return
							}
						}
						this.isPost = true 
					}
				}
				if(typeof(this.submitText) != 'function'){
					AceEditor.prototype.submitText = (data) => {
						let reqData = JSON.stringify({'json':data})
						let xhr = new XhrRequest();
						xhr.xhrRequest(this.URL,{'method':'post'},reqData,(res)=>{
							// console.log(res,'res');
							this.callback(res)
						})
					}
				}
			}
		}
	
	//xhr
		function XhrRequest(){
			if(this instanceof XhrRequest){
				if(typeof(this.creatXHR) != 'function'){
					XhrRequest.prototype.creatXHR = () => {
						if(typeof XMLHttpRequest != 'undefined'){
							return new XMLHttpRequest()
						}else if(typeof ActiveXObject != 'undefined'){
							if(typeof arguments.callee.activeXString != 'string'){
								var versions =  ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0' ,'MSXML2.XMLHttp'], i,len;
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
							throw new Error('No XhrRequest object available.') 
						}
					}
				}
				if(typeof(this.xhrRequest) != 'function'){
					XhrRequest.prototype.xhrRequest = (url,options,body,callback) => {
						let xhr = this.creatXHR();
						xhr.onreadystatechange = ()=> {
							if(xhr.readyState == 4) {
								if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){//200 表示相应成功 304 表示缓存中存在请求的资源
									let str = xhr.responseText;
									callback(str);
								}
								else{
									return 'request is unsucessful '+xhr.status;
								}
							}
						}
						xhr.open(options.method,url,true)
						// xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
						options.method == 'post' && xhr.setRequestHeader('Content-Type','application/json')
						xhr.send(body)
					}
				}
			}else{
				throw Error('This function is requires new! ep: new XhrRequest()');
			}
		}
	
	//初始化编辑器
		const aceEditor = new AceEditor({
			'ace':ace,
			'url':'http://localhost:5555/config/add',
			'callback':(res) => {
				document.getElementById('id_iframe').contentWindow.document.body.innerHTML = res;
				console.log(res,'ressss');
			},
		});
		aceEditor._initEditor();