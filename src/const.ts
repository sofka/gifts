export const WINDOW_SIZE = {
    MOBILE_S: '320px',
    MOBILE_M: '375px',
    MOBILE_L: '425px',
    TABLET: '768px',
    LAPTOP: '1024px',
    LAPTOP_L: '1440px',
    DESCTOP: '2560px'
  }
  
  export const DEVICE = {
    MOBILE_S: `(min-width: ${WINDOW_SIZE.MOBILE_S})`,
    MOBILE_M: `(min-width: ${WINDOW_SIZE.MOBILE_M})`,
    MOBILE_L: `(min-width: ${WINDOW_SIZE.MOBILE_L})`,
    TABLET: `(min-width: ${WINDOW_SIZE.TABLET})`,
    LAPTOP: `(min-width: ${WINDOW_SIZE.LAPTOP})`,
    LAPTOP_L: `(min-width: ${WINDOW_SIZE.LAPTOP_L})`,
    DESCTOP: `(min-width: ${WINDOW_SIZE.DESCTOP})`,
    DESCTOP_L: `(min-width: ${WINDOW_SIZE.DESCTOP})`
  };

  export const BASE_URL = 'http://localhost:3001/';