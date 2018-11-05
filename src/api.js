function setAdminApi(path) {
    let global='http://cms.cnlive.com:8768';
    return global+path;
}

const api = {
    userList: setAdminApi('/user/list'), // 获取用户列表
    user: setAdminApi('/user'), // 用户详情
    siteList: setAdminApi('/site/user/list'), // 用户下的站点列表
    siteChange: setAdminApi('/site/change'), // 更改当前站点
    siteDetail: setAdminApi('/site'), // 查询某个站点详情

    contentList: setAdminApi('/content/page'), // 获取内容列表
    contentTop: setAdminApi('/content/top'), // 内容置顶与取消置顶
    contentOnline: setAdminApi('/content/status'), // 内容上线与下线
    contentChannel: setAdminApi('/channel/list/content'), // 内容的栏目树
    contentWeight: setAdminApi('/content/weight'), // 保存内容权重

    uploadPicture: setAdminApi('/upload/1'), // 上传单张图片

    modelList: setAdminApi('/content/model/list'), // 模型列表
    modelItemsList: setAdminApi('/content/modelItem/list'), // 获取模型项
}

export default api;