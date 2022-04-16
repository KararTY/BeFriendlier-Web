const PajbotConfig = {
  /**
   * Enable Pajbot checking.
   */
  enabled: true,

  /**
   * Custom pajbot channels - If length === 0 / unset, gets default values.
   * [See default values here.](https://github.com/KararTY/BeFriendlier-Shared/blob/master/src/pajbotList.ts)
   */
  channels: [],

  /**
   * HTTP request headers.
   */
  headers: {
    'content-type': 'application/json',
    'user-agent': 'befriendlierapp (https://github.com/kararty/befriendlier-web)'
  }
}

export default PajbotConfig
