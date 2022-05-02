fileSystem={fileRootPath:"fileSystem.root",isFile:function(t){return"1"==t["\\0"].slice(3)},isDir:function(t){return"0"==t["\\0"].slice(3)},isEmptyDir:function(t){if(isDefined(t))return Object.entries(t).length<=1},setPermissions:function(t,e){t["\\0"]=e+this.getType(t)},setType:function(t,e){if("0"!==e.toString()&&"1"!==e.toString())throw`Error 4: Bad type value :: ${e}`;t["\\0"]=this.getPermissions(t)+e},getPermissions:function(t){return t["\\0"].slice(0,3)},getType:function(t){return t["\\0"].slice(3)},getDir:function(path,returnPath=!1,throwError=!0,expected=null){if(path=path.trim(),!path.startsWith("/"))throw"Error 0: Bad Path Start :: Paths must start with '/'!";if(path.includes("\\0"))throw"Error 1: Bad character in path :: '\\0' - Cannot be used in a path!";path=path.slice(1);const objPath=path.split("/").map((t=>isTextEmpty(t)?"":`['${t}']`)).join("");try{retObj=eval(this.fileRootPath+objPath)}catch(t){retObj=null}if(isDefined(retObj)&&null!=expected&&fileSystem.isFile(retObj)!=expected)throw 0==expected?`Error 3: ${path} is not a directory`:`Error 2: ${path} is not a file!`;if(!isDefined(retObj)&&throwError)throw`/${path}: Path not found.`;return"array"==returnPath?[retObj,path.split("/")]:"string"==returnPath?[retObj,objPath]:retObj},write:function(path,type=null,text=null,permissions=null){let[file,filePath]=this.getDir(path,"array",!1);if(!isDefined(file)){let objPath=this.fileRootPath;filePath.forEach((x=>{const nextPath=isTextEmpty(x)?"":`['${x}']`;objPath+=nextPath,isDefined(eval(objPath))||eval(objPath+" = { '\\\\0': '7771' }")})),file=eval(objPath)}isDefined(file)&&(null!=type&&type!=this.getType(file)&&this.setType(file,type),null!=permissions&&permissions!=this.getPermissions(file)&&this.setPermissions(file,permissions),this.isFile(file)&&isDefined(text)&&(file.data=text))},read:function(t){return this.getDir(t,!1,!0,1).data},remove:function(path,force=!1){const[file,filePath]=this.getDir(path,"string");if(this.isDir(file)&&!this.isEmptyDir(file)&&!force)throw`Error 10: Directory is not empty  (${path}) - try remove(*path*, true) to force remove a directory`;eval("delete "+this.fileRootPath+filePath)},removeDir:function(t,e=!1){try{this.getDir(t,"string",!0,0)}catch(t){throw t}this.remove(t,e)},removeFile:function(t,e=!1){try{this.getDir(t,"string",!0,1)}catch(t){throw t}this.remove(t,e)},root:{"\\0":"7770",dev:{"\\0":"7770"},etc:{"\\0":"7770"},boot:{"\\0":"7770"},home:{"\\0":"7770"},root:{"\\0":"7770","test.txt":{"\\0":"7771",data:"Hello, World!"}},var:{"\\0":"7770"}}};