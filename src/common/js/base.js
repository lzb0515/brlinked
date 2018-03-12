export const newsTitles = {
    "default":[
        {
            "type": 0,
            "path": "focusNews",
            "page": "要闻"
        },
        {
            "type": 0,
            "path": "focusChina",
            "page": "中国"
        },
        {
            "type": 0,
            "path": "focusRussia",
            "page": "俄罗斯"
        },
        {
            "type": 0,
            "path": "focusBrazil",
            "page": "巴西"
        },
        {
            "type": 0,
            "path": "focusPakistan",
            "page": "巴基斯坦"
        },
        {
            "type": 0,
            "path": "focusHongKong",
            "page": "香港"
        },
        {
            "type": 0,
            "path": "focusIsrael",
            "page": "以色列"
        },
        {
            "type": 0,
            "path": "focusGermany",
            "page": "德国"
        },
        {
            "type": 0,
            "path": "focusBelarus",
            "page": "白俄罗斯"
        }
    ],
    "recommendations":[
        {
            "type":0,
            "path":"aaa",
            "page":"旅游"
        }
    ],
    "placeNews":[
        {
            "type":1,
            "path":"bbb",
            "page":"上海"
        }
    ]
}

const URL = "http://localhost:3000/api/";
export const url = {
    news: URL+'getNews/'
}
export const searchCon = {
    profCon: '请输入专家的姓名或者相关内容',
    projCon: '请输入项目的名称或者相关内容'
}
export const titleCon = {
    profCon: '专家列表',
    projCon: '项目列表'
}