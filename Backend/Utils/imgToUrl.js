import constantInstances from "../Constants/instants.js";

export const imgToURL = (data) => {
  // for req.file {key:value, key:value}

  if (data && Object.keys(data)?.length) {
    console.log("from imgToUrl:--------->", data.filename);
    return `${constantInstances.backendImgPath}/${data.filename}`;
  }

  // if nothing has been sent then returning "", empty string
  return "";
};

export const arrayImgToURL = (data) => {
  // for req.files, [{},{},{}]
  if (data.length) {
    const fileNamesHolder = data?.map(({ filename }) => {
      return { image: `${constantInstances.backendImgPath}/${filename}` };
    });
    return fileNamesHolder;
  }

  return [];
};
