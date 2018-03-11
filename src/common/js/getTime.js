
const date=function (uploadTime){
	var date=new Date();
	var nowTime=date.getTime();
	var time=nowTime-uploadTime;
	var hour=Math.floor(time/1000/3600);
	var second=Math.floor((time/1000-hour*3600)/60);
	if(hour>=1){
		return hour+"小时"
	}else{
		return second+"分钟"
	}
}

export default date;