import axios from 'axios';
import moment from 'moment';

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function getCommonHeaders(params = {}) {
  var accessToken, headers = {};
  if(!params.token) {
    accessToken = getCookie('token');
      // accessToken = "08f08f23-d6ce-4659-aa93-2d2fa420e306";
  } else {
    accessToken = params.token;
  }
  headers = {
    'Authorization': accessToken,
  };
  if(params.user && params.user.defaultLocation) {
    headers.Locations = params.user.defaultLocation;
  }
  if(params.user && params.user.all_locations_selected) {
    headers.all_locations_selected = true;
  }
  if(params.user && params.user.userId) {
    headers.user = params.user.userId;
  }
  return headers;
}

function doHttpGet(url, options) {
    options = options || {};
    options.headers = Object.assign(options.headers || {}, getCommonHeaders(options));
    return axios.get(url, options);
}

function doHttpPost(url, content, options) {
  options = options || {};
  options.headers = Object.assign(options.headers || {}, getCommonHeaders(options));
  return axios.post(url, content, options);
}

function doHttpPatch(url, content, options) {
  options = options || {};
  options.headers = Object.assign(options.headers || {}, getCommonHeaders(options));
  return axios.patch(url, content, options);
}

function doHttpPut(url, content, options) {
  options = options || {};
  options.headers = Object.assign(options.headers || {}, getCommonHeaders(options));
  return axios.put(url, content, options);
}

function doHttpDelete(url, content, options) {
  options = options || {};
  options.headers = Object.assign(options.headers || {}, getCommonHeaders(options));
  options['data'] = content;
  return axios.delete(url,options);
}

function abortRequest(requestId){
    axios.abort(requestId);
}

function handleGenericResponse(response){
    var wrappedResponse = response['data'];
    if(wrappedResponse && wrappedResponse['response'] && wrappedResponse.hasOwnProperty('appErrorCode') && wrappedResponse.hasOwnProperty('appErrorMessage')){
        if(wrappedResponse.hasOwnProperty('appErrorMessage') && wrappedResponse.hasOwnProperty('appErrorCode') && wrappedResponse['appErrorMessage'] && wrappedResponse['appErrorCode']){
          return handleError(wrappedResponse);
        }
        else{
          return {
            'data':wrappedResponse['response'],
            'type':'success'
          }
        }
    }
    if(response && response.data && response.data.status == 'SUCCESS'){
        return {'type':'success','data':response.data.response}
    }
    else if(response && response.status && (response.status=='ERROR' || response.status=='FAILURE') ||
      (response.data && (response.data.status == 'ERROR'||response.data.status == 'FAILURE')))
    {
        return handleError(response);
    }
    else if(response && (response.status=='200' || response.status==='DONE' || response.status==='SUCCESS')){
        return {'type':'success','data':response.data || {}}
    }
    else{
      return null;
    }
}

function handleError(error){
    if(error && error.hasOwnProperty('appErrorCode') && error.hasOwnProperty('appErrorMessage')){
      return{
        'type':'failure','data':(error['appErrorMessage'])
      }
    }
    if(error && error.status && (error.status=='FAILURE'||error.status=='ERROR'||error.data.status=='FAILURE'||error.data.status=='ERROR')){
        return {'type':'failure','data':(error.errorMessage||error.data.errorMessage)}
    }
    if(error && error.status=='500'){
      console.log(
        'There was an internal server error , kindly contact tech support'
      )
    }
    if(error && error.response && error.response.status != 2 && error.response.data && error.response.data.hasOwnProperty('appErrorMessage')){
      if(error.response.data.appErrorMessage.length){
        console.log(
          'error.response.data.appErrorMessage'
        )
      }
      else{
        console.log(
          'There was an error. Kindly report this to Tech-Support team'
        )
      }
      return {
        'type':'failure',
        'data':error.response.data.appErrorMessage
      }
    }
    else{
        return {'type':'failure','data':'Unhandled Error , Kindly report this to tech team'}
    }
}

function dateFormatter(date, format) {
  return date ? moment(date).format(format || 'DD-MM-YYYY | HH:mm') : '';
}

function JSONToCSVConvertor(listData, headers, fileTitle) {
  let CSV = '';
  CSV += fileTitle + '\r\n\n';
  let row = '';

  for (let i=0, len=headers.length; i<len; i++) {

      let header = headers[i];
      let label = header.headerLabel;

      row += label + ',';
  }

  row = row.slice(0, -1);

  CSV += row + '\r\n';
  for (let i = 0; i < listData.length; i++) {

      row = '';
      let record = listData[i];

      for (let j=0,jlen=headers.length; j<jlen; j++) {

        let header = headers[j];
        let value = '';
        if(header.attribute !== undefined && header.attribute != null){
            value = record[header.attribute];
        }

        if(value == undefined || value == null) {
          value = '';
        }
        row += '"' + (header.formatter ? header.formatter(record) : value) + '",';
      }
      row.slice(0, row.length - 1);

      CSV += row + '\r\n';
  }

  if (CSV === '') {
      alert('Invalid data');
      return;
  }
  var datetimeStr = new moment().format('MMMM-Do-YYYY,h-mm-ss-a');
  let fileName = fileTitle + '_' + datetimeStr + '.csv';
    var blob = new Blob([CSV], {type: 'csv'});
    if(window.navigator.msSaveOrOpenBlob) {
       window.navigator.msSaveBlob(blob, fileName);
    }
    else{
       var elem = window.document.createElement('a');
       elem.href = window.URL.createObjectURL(blob);
       elem.download = fileName;
       document.body.appendChild(elem);
       elem.click();
       document.body.removeChild(elem);
    }
}

function JSONToCSVConvertorWithoutHeaders(JSONData, fileTitle) {
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    CSV += fileTitle + '\r\n\n';
    var row = '',
        headers = [];

    for (var index in arrData[0]) {
        row += index + ',';
        headers.push(index);
    }

    row = row.slice(0, -1);

    CSV += row + '\r\n';
    for (var i = 0; i < arrData.length; i++) {
        row = '';

        for (var k = 0; k < headers.length; k++) {
            row += '"' + arrData[i][headers[k]] + '",';
        }

        row.slice(0, row.length - 1);

        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert('Invalid data');
        return;
    }

    var fileName = 'MyReport_';
    fileName += fileTitle.replace(/ /g, '_');
    var uri = 'data:text/xls;charset=utf-8,' + encodeURI(CSV);
    var link = document.createElement('a');
    link.href = uri;
    link.style.visibility = 'hidden';
    link.download = fileName + '.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export { doHttpGet, doHttpPost, doHttpPatch, doHttpDelete, doHttpPut, getCookie, handleGenericResponse, handleError, abortRequest, dateFormatter, JSONToCSVConvertor, JSONToCSVConvertorWithoutHeaders };
