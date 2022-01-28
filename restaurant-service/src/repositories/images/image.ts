
const { default: axios } = require('axios');

export const getImages = () => {
    return axios
      .get('http://localhost:3010/images')
      // .get('http://image-service:3010/images')
      .then((res: any) => {
        // console.log('res', res)
        return res.data
      }
      )
      .catch((err:any) => {
        console.log('err', err);
      }
      );
  }

//   export default  getImages