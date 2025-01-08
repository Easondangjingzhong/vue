//将base64转换为blob
export const dataURLtoBlob = (dataurl) =>{ 
  var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//将blob转换为file
export const blobToFile = (theBlob, fileName) => {
 theBlob.lastModifiedDate = new Date();
 theBlob.name = fileName;
 return theBlob;
}

/**
* file或blob转base64
* @param {*} blob file或者blob
* @param {*} callback function (data)通过参数获得base64
*/
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
}
export const blobToDataURI = (blob, callback) => {
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function (e) {
      callback(e.target.result);
  }
}
export const fileToBlob = (file) => {
  return new Blob([file], { type: file.type });
}