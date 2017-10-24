//引入编码模块
var iconv = require("iconv-lite");
//引入 printhelper 模块
var printhelper = require("./printhelper.js");
//设备编号
var uuid = "您的设备编号";

//用户绑定
var data ={
	Uuid:uuid,
	UserId:"0" //0改成您系统的用户编号（自己定义）最好是数字
}
//请求回调
function userBindCallBack(result){	
	//处理您的业务逻辑
	//返回格式 {"OpenUserId":160715,"Code":200,"Message":"成功"}
	console.log(result);
}
printhelper.userBind(data,userBindCallBack);

//获取设备状态
data = {
	Uuid:uuid
}
//请求回调
function getDeviceStateCallBack(result){	
	//处理您的业务逻辑
	//返回格式 {"State":0,"Code":200,"Message":"成功"} state:代表设备状态，详见api文档
	console.log("=="+result);
}
printhelper.getDeviceState(data,getDeviceStateCallBack);

//提交打印
var content = "测试打印\n测试换行";
var b = new Buffer(iconv.encode(content,'GBK'));
content= b.toString("base64");
var jsonContent="[{\"Alignment\":0,\"BaseText\":\"" + content + "\",\"Bold\":0,\"FontSize\":0,\"PrintType\":0}]";
data = {
	Uuid:uuid,
	PrintContent:jsonContent,
	OpenUserId:"160715" //改成用户设备绑定返回的OpenUserId即可
}
//请求回调
function printContentCallBack(result){	
	//处理您的业务逻辑
	//返回格式 {"TaskId":0,"Code":200,"Message":"成功"}  TaskId:任务编号
	console.log("=="+result);
}
printhelper.printContent(data,printContentCallBack);

data = {
	TaskId:0 //任务编号
}
function getTaskStateCallBack(result){	
	//处理您的业务逻辑
	//返回格式 {"State":1,"Code":200,"Message":"成功"} state:代表打印任务状态，详见api文档
	console.log("=="+result);
}
printhelper.getTaskState(data,getTaskStateCallBack);