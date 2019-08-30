class YueWanPlatform extends SimplePlatform {
	public sdk: any;
	public constructor() {
		super();
		this.sdk = new window.JSLIB();
		this.channelName = "YUEWEN";
	}

    initBackStage() {
        this.backUrlAddr = "home.cqmijiu.com";
        this.backUrlKey = "4c4776e8db27d196ae19ddbb60143488";
    }

	public login(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
			let sdk = this.sdk;
            sdk.getUser(async (user) => {
				console.log(user.session_id);//user.session_id即临时通行码，用以获取用户信息接口的参数.
				console.log(user.type);//既j_game_id  用以判断哪个包（选用）
				console.log(user.os)//判断ios或者android平台（选用）
				console.log(user.devicetype)//设备型号（选用）

				let session_id = user.session_id;
				let loginCheckAddr = `${BackStageReqUtils.getYueWanLoginAddr()}?authorize_code=${session_id}`;
				let data = await BackStageReqUtils.sendBackStageReq(loginCheckAddr);
				if(data.ret == 1) {
					this.userID = data.content.user_id;
					this.userName = data.content.user_name;
					this.time = data.content.time;
					this.token = data.content.token;
					sdk.setUser({session_id: data.content.access_token, uid: this.userID, name: this.userName});
					sdk.shutDown("shutDown");
					resolve();
				}
			});
        })
    }
}