// import axios from "axios";

// const upload = async (file) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "fiverr");

//   try {
//     const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);

//     const { url } = res.data;
//     return url;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default upload;

import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  const uploadLink = import.meta.env.VITE_UPLOAD_LINK;

  // Check if the upload link is defined
  if (!uploadLink) {
    console.error('VITE_UPLOAD_LINK is undefined. Please check your environment variables.');
    throw new Error('VITE_UPLOAD_LINK is undefined');
  }

  try {
    const res = await axios.post(uploadLink, data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
};

export default upload;
