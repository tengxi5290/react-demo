import axios from 'axios'

let  axiosProxy= axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'contentType':"application/json"
    },
    withCredentials:true,
})

let axiosProxyFiles = axios.create({
  	headers: {
    	'X-Requested-With': 'XMLHttpRequest',
    	'Content-Type': 'multipart/form-data'
  	},
  	withCredentials:true,
})

let timestampToTime = function (timestamp) {
	var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y+M+D+h+m+s;
}

let getUrlParams = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export {
    axiosProxy,
    axiosProxyFiles,
    timestampToTime,
    getUrlParams
}