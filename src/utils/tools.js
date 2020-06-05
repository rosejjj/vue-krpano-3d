/**
 * @description 文件二进制流转base64
 *
 */
export const streamToBase64 = streams => {
  return new Promise((resolve, reject) => {
    let index = 0;
    let length = streams.length - 1;
    let files = [];
    let isSuccess = (i, len) => {
      if (i >= len) resolve(files);
    };
    let reader = new FileReader();
    for (let item of streams) {
      reader.readAsDataURL(item);
      reader.onload = e => {
        files.push({
          name: item.name,
          size: item.size,
          base64: e.target.result
        });
        index++;
        isSuccess(index, length);
      };
    }
  });
};
