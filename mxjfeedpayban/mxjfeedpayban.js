Page({
  mixins: [require('../../../common/utils/mixins/plugIn')],
  data: {
    //todo 上线前换成生产地址
    baseH5Url: swan.Apis.baseMxjH5,
    appkey_dev: swan.Apis.aiappKey.substring(swan.Apis.aiappKey.indexOf('_dev') + 1),//测试环境截取dev后几位，生产环境对这个没要求
    authStatus: '',//是否实名验证0未实名，1实名
    accessToken: '',//用户信息
    openId: '',//用户openId
    payBanWhiteList: '',
    createAccountFlag: '',//获取开卡状态1未开卡，0开卡
    userStatus: '',
    cypherData: '',
    cypherIv: '',
    longitude: '',
    latitude: '',
    functionalEntrance: '',
    channel: '',
    swanId: '',
    showWebview: false,
    showBackIcon: false,//webview的h5页是否显示返回按钮，如果直接从feed流打开此页面，需要显示返回按钮
    mxj: '',//免息劵
  },
  async onShow() {
    const next = await swan.actions.getCardOpenStatusNotRouter({ tkNpssward: true });
  },
  async onLoad(params) {
    // 进入H5获取swanid
    swan.getSwanId({
      success: ({ data }) => {
        swan.store.userInfo.swanID = data.swanid;
      },
    });
    // 进入H5获取地理位置
    swan.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latLnt = {
          lat: res.latitude,
          lnt: res.longitude,
        };
        swan.store.userInfo.latLnt = latLnt;
      },
    });
    // await swan.actions.bxLogin();
    if (!swan.store.userInfo.loginState) {
      await swan.actions.bxLogin();
    }
    // 如果params为空侧代表是从首页进来
    if (params.functionalEntrance === '201004' && params.channel === '201001') {
      swan.store.dragonBoat.p.functionalEntrance = '201004';
      swan.store.dragonBoat.p.channel = '201001';
    } else {
      swan.store.dragonBoat.p.functionalEntrance = "104050";
      swan.store.dragonBoat.p.channel = params.channel;
    }
    // 实名认证
    const realNameInfo = await swan.Utils.getRealNameInfo();
    const paramsData = {
      decryptData: realNameInfo.data,
      iv: realNameInfo.iv,
    };
    const { res } = await swan.actions.queryPayCompanionWhiteList(true);
    swan.store.payBanWhiteList = res;
    if (swan.store.userInfo.loginState) {
      if (swan.store.cardInfo.cardOpenStep === 'ERROR') {
        await swan.actions.getSfAccountList(true);
      }
      if (swan.store.cardInfo.cardOpenStep === 'ERROR') {
        return;
      }
      // 查询免息劵
      let result = '';
      let couponList1 = await swan.actions.getQueryCouponList({
        couponType: '04903', // 免息劵
        couponStatus: '1,3,5', // 可使用,已使用,冻结
      })
      let finalList = couponList1.couponList;
      result = finalList.find((item) => {
        return item.couponType == "04903";
      });
      console.log(result)
      this.setData({
        accessToken: swan.store.userInfo.accessToken,
        openId: swan.store.userInfo.openId,
        createAccountFlag: swan.store.cardInfo.cardOpenStep === 'NOT_OPEN' ? '1' : '0',
        mxj: result ? '0' : '1',//0已领1未领劵
        payBanWhiteList: swan.store.payBanWhiteList || 0,
        longitude: swan.store.userInfo.latLnt.lnt,
        latitude: swan.store.userInfo.latLnt.lat,
        swanId: swan.store.userInfo.swanID,
        cypherData: encodeURIComponent(realNameInfo.data) || '',
        cypherIv: encodeURIComponent(realNameInfo.iv) || '',
        functionalEntrance: swan.store.dragonBoat.p.functionalEntrance,
        channel: swan.store.dragonBoat.p.channel,
        showBackIcon: getCurrentPages().length > 1 ? 0 : 1
      });
    }
    //使用神策系统进行埋点
    swan.Utils.trackEvent('PF_aiHua_swan_SF_BrandingPage', { channel: swan.store.dragonBoat.p.channel, functionalEntrance: swan.store.dragonBoat.p.functionalEntrance, createAccountFlag: swan.store.cardInfo.cardOpenStep }, 'sa');
    // 获取实名信息
    swan.Utils.bxRequest({
      url: swan.Apis.decryptCustomerInfo,
      noLoading: true,
      noDebounce: true,
      data: paramsData,
      success: (data) => {
        if (data.name) { // 已实名,跳转ai花, 带加密文件字段
          console.log('data.name' + data.name);
          this.setData({
            authStatus: 1,
            showWebview: true
          })
        } else { // 未实名，跳转实名认证
          this.setData({
            authStatus: 0,
            showWebview: true
          })
        }
      }
    });
  },
})
