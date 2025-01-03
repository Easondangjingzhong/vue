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