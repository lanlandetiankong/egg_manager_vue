const _import = require('~Router/_import_' + process.env.NODE_ENV)
const AnnouncementRouter = {
    path:'announcement',
    component:_import('index/announcement/AnnouncementPage'),
    name:'announcement',
    children:[
        {
            path:'create',
            component:_import('index/announcement/create/AnnouncementCreateView'),
            name:'announcementCreate',
            meta:{title:'创建通知公告',icon:"reconciliation",noCache:false,keepAlive:true}
        },
        {
            path:'all_list',
            component:_import('index/announcement/allList/AnnouncementAllListView'),
            name:'announcementAllList',
            meta:{title:'公告列表',icon:"bars",noCache:false,keepAlive:true}
        },
        {
            path:'my_create_list',
            component:_import('index/announcement/myCreateList/AnnouncementMyCreateListView'),
            name:'announcementMyCreateList',
            meta:{title:'我创建的公告列表',icon:"bars",noCache:false,keepAlive:true}
        },
        {
            path:'announcement_tag',
            component:_import('index/announcement/tag/AnnouncementTagView'),
            name:'announcementTag',
            meta:{title:'公告标签',icon:"reconciliation",noCache:false,keepAlive:true}
        },
    ]
};
export default AnnouncementRouter ;
