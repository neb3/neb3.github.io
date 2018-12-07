"use strict";

var SanguoContract = function() {

    LocalContractStorage.defineProperty(this, "admin", null);
    LocalContractStorage.defineProperty(this, "droprate");
    LocalContractStorage.defineProperty(this, "goldrate");
    LocalContractStorage.defineProperty(this, "foodrate");
    LocalContractStorage.defineProperty(this, "initgoldrate");
    LocalContractStorage.defineProperty(this, "initfoodrate");
    LocalContractStorage.defineProperty(this, "harvest_minutes");
    LocalContractStorage.defineProperty(this, "protection_minutes");
    LocalContractStorage.defineProperty(this, "log_maxlength");
    LocalContractStorage.defineProperty(this, "search_value");
    LocalContractStorage.defineProperty(this, "max_city_guards");
    LocalContractStorage.defineProperty(this, "attack_reputation");
    LocalContractStorage.defineProperty(this, "search_reputation");

    LocalContractStorage.defineProperty(this, "city_cnt");
    LocalContractStorage.defineProperty(this, "characterclass_cnt");
    LocalContractStorage.defineProperty(this, "character_cnt");
    LocalContractStorage.defineProperty(this, "goodclass_cnt");
    LocalContractStorage.defineProperty(this, "good_cnt");
    LocalContractStorage.defineProperty(this, "skill_cnt");


    LocalContractStorage.defineMapProperty(this, "characterclass");
    LocalContractStorage.defineMapProperty(this, "goodclass");
    LocalContractStorage.defineMapProperty(this, "skill");
    LocalContractStorage.defineMapProperty(this, "city");
    LocalContractStorage.defineMapProperty(this, "playercity");
    LocalContractStorage.defineMapProperty(this, "playercharacter");
    LocalContractStorage.defineMapProperty(this, "character");
    LocalContractStorage.defineMapProperty(this, "charactergood");
    LocalContractStorage.defineMapProperty(this, "good");
    LocalContractStorage.defineMapProperty(this, "playergood");
    LocalContractStorage.defineMapProperty(this, "playerlog");


    LocalContractStorage.defineMapProperty(this, "leaderboard");

}

SanguoContract.prototype = {
    init: function() {
        this.admin = Blockchain.transaction.from;
        this.city_cnt = 0;
        this.characterclass_cnt = 0;
        this.character_cnt = 0;
        this.goodclass_cnt = 0;
        this.good_cnt = 0;
        this.harvest_minutes = 360;
        this.protection_minutes = 5;
        this.log_maxlength = 10;
        this.search_value = 0.01;
        this.max_city_guards= 6;
        this.attack_reputation = 5;
        this.search_reputation = 2;
        this.goldrate = [100,300];
        this.foodrate = [200,500];
        this.initgoldrate = [300,500];
        this.initfoodrate = [500,800];
        this.droprate = [
            {
                "rare":5,
                "droprate":[1,1]
            },
            {
                "rare":4,
                "droprate":[2,10]
            },
            {
                "rare":3,
                "droprate":[11,30]
            },
            {
                "rare":2,
                "droprate":[31,60]
            },
            {
                "rare":1,
                "droprate":[61,100]
            }
        ]

        this._initCharacterClass();
        this._initGoodClass();
        this._initLeaderboard();

    },
     _nasToWei: function() {
        return 1000000000000000000;
    },
    _initCityStats: function(city)
    {
        city["food"] = this._random(this.initgoldrate[0],this.initgoldrate[1])
        city["gold"] = this._random(this.initfoodrate[0],this.initfoodrate[1])
        city["exp"] = 0
        // city["population"] = this._random(20000,40000)
        // city["army"]=this._random(8000,12000)
        city["reputation"]= 0
        city["protected"]=false
        city["protection_startts"]=null
        city["protection_endts"]=null
        city["harvested"]=false
        city["harvest_startts"]=null
        city["harvest_endts"]=null
        return city;
    },
    _initCharacterClass:function(){

     this._addcharacterclass({
        "leadership": 98,
        "power": 72,
        "intellect": 96,
        "rare": 4,
        "skill":7,
        "name": "周瑜",
        "code":"zhouyu"
    });
    this._addcharacterclass({
        "leadership": 93,
        "power": 37,
        "intellect": 100,
        "rare": 5,
        "skill":1,
        "name": "诸葛亮",
        "code":"zhugeliang"
    });
    this._addcharacterclass({
        "leadership": 97,
        "power": 63,
        "intellect": 96,
        "rare": 4,
        "skill":8,
        "name": "司马懿",
        "code":"simayi"
    });
    this._addcharacterclass({
        "leadership": 97,
        "power": 100,
        "intellect": 26,
        "rare": 5,
        "skill":0,
        "name": "吕布",
        "code":"lvbu"
    });
    this._addcharacterclass({
        "leadership": 96,
        "power": 97,
        "intellect": 76,
        "rare": 4,
        "skill":3,
        "name": "关羽",
        "code":"guanyu"
    });
    this._addcharacterclass({
        "leadership": 90,
        "power": 98,
        "intellect": 30,
        "rare": 4,
        "skill":4,
        "name": "张飞",
        "code":"zhangfei"
    });
    this._addcharacterclass({
        "leadership": 97,
        "power": 66,
        "intellect": 95,
        "rare": 4,
        "skill":9,
        "name": "陆逊",
        "code":"luxun"
    });
    this._addcharacterclass({
        "leadership": 91,
        "power": 96,
        "intellect": 75,
        "rare": 4,
        "skill":2,
        "name": "赵云",
        "code":"zhaoyun"
    });
    this._addcharacterclass({
        "leadership": 93,
        "power": 97,
        "intellect": 44,
        "rare": 4,
        "skill":6,
        "name": "马超",
        "code":"machao"
    });
    this._addcharacterclass({
        "leadership": 90,
        "power": 93,
        "intellect": 64,
        "rare": 4,
        "skill":5,
        "name": "黄忠",
        "code":"huangzhong"
    });
    this._addcharacterclass({
        "leadership": 94,
        "power": 92,
        "intellect": 77,
        "rare": 4,
        "skill":12,
        "name": "张辽",
        "code":"zhangliao"
    });
    this._addcharacterclass({
        "leadership": 93,
        "power": 81,
        "intellect": 89,
        "rare": 3,
        "name": "吕蒙",
        "code":"lvmeng"
    });
    this._addcharacterclass({
        "leadership": 91,
        "power": 89,
        "intellect": 90,
        "rare": 3,
        "name": "姜维",
        "code":"jiangwei"
    });
    this._addcharacterclass({
        "leadership": 88,
        "power": 93,
        "intellect": 75,
        "rare": 3,
        "name": "甘宁",
        "code":"ganning"
    });
    this._addcharacterclass({
        "leadership": 90,
        "power": 93,
        "intellect": 69,
        "rare": 3,
        "name": "太史慈",
        "code":"taishici"
    });
    this._addcharacterclass({
        "leadership": 80,
        "power": 83,
        "intellect": 70,
        "rare": 2,
        "name": "黄盖",
        "code":"huanggai"
    });
    this._addcharacterclass({
        "leadership": 76,
        "power": 86,
        "intellect": 67,
        "rare": 2,
        "name": "关兴",
        "code":"guanxing"
    });
    this._addcharacterclass({
        "leadership": 78,
        "power": 87,
        "intellect": 48,
        "rare": 2,
        "name": "张苞",
        "code":"zhangbao"
    });
    this._addcharacterclass({
        "leadership": 92,
        "power": 88,
        "intellect": 72,
        "rare": 3,
        "name": "张郃",
        "code":"zhanghe"
    });
    this._addcharacterclass({
        "leadership": 92,
        "power": 90,
        "intellect": 63,
        "rare": 3,
        "skill":11,
        "name": "夏侯敦",
        "code":"xiahoudun"
    });
    this._addcharacterclass({
        "leadership": 90,
        "power": 91,
        "intellect": 68,
        "rare": 3,
        "skill":10,
        "name": "夏侯渊",
        "code":"xiahouyuan"
    });
    this._addcharacterclass({
        "leadership": 80,
        "power": 84,
        "intellect": 56,
        "rare": 2,
        "name": "乐进",
        "code":"yuejin"
    });

    this._addcharacterclass({
        "leadership": 81,
        "power": 85,
        "intellect": 66,
        "rare": 2,
        "name": "马岱",
        "code":"madai"
    });
    this._addcharacterclass({
        "leadership": 20,
        "power": 26,
        "intellect": 81,
        "rare": 5,
        "skill":16,
        "name": "貂蝉",
        "code":"diaochan"
    });
    this._addcharacterclass({
        "leadership": 76,
        "power": 86,
        "intellect": 70,
        "rare": 4,
        "name": "孙尚香",
        "code":"sunshangxiang"
    });
    this._addcharacterclass({
        "leadership": 85,
        "power": 86,
        "intellect": 60,
        "rare": 3,
        "name": "高顺",
        "code":"gaoshun"
    });

    this._addcharacterclass({
        "leadership": 81,
        "power": 45,
        "intellect": 98,
        "rare": 3,
        "name": "賈诩",
        "code":"jiaxu"
    });
    this._addcharacterclass({
        "leadership": 89,
        "power": 89,
        "intellect": 74,
        "rare": 3,
        "name": "徐晃",
        "code":"xuhuang"
    });
    this._addcharacterclass({
        "leadership": 78,
        "power": 36,
        "intellect": 97,
        "rare": 4,
        "name": "庞统",
        "code":"pangtong"
    });
    this._addcharacterclass({
        "leadership": 79,
        "power": 53,
        "intellect": 95,
        "rare": 3,
        "name": "法正",
        "code":"fazheng"
    });
    this._addcharacterclass({
        "leadership": 80,
        "power": 64,
        "intellect": 94,
        "rare": 3,
        "name": "徐庶",
        "code":"xushu"
    });
    this._addcharacterclass({
        "leadership": 78,
        "power": 59,
        "intellect": 94,
        "rare": 3,
        "name": "鲁肃",
        "code":"lusu"
    });
    this._addcharacterclass({
        "leadership": 52,
        "power": 12,
        "intellect": 97,
        "rare": 4,
        "skill":15,
        "name": "郭嘉",
        "code":"guojia"
    });
    this._addcharacterclass({
        "leadership": 48,
        "power": 14,
        "intellect": 96,
        "rare": 4,
        "name": "荀彧",
        "code":"xunyu"
    });
    this._addcharacterclass({
        "leadership": 79,
        "power": 92,
        "intellect": 32,
        "rare": 2,
        "name": "周泰",
        "code":"zhoutai"
    });
    this._addcharacterclass({
        "leadership": 93,
        "power": 87,
        "intellect": 89,
        "rare": 3,
        "name": "邓艾",
        "code":"dengai"
    });
    this._addcharacterclass({
        "leadership": 87,
        "power": 25,
        "intellect": 86,
        "rare": 2,
        "skill":13,
        "name": "张角",
        "code":"zhangjiao"
    });
    this._addcharacterclass({
        "leadership": 79,
        "power": 93,
        "intellect": 71,
        "rare": 3,
        "name": "庞德",
        "code":"pangde"
    });
    this._addcharacterclass({
        "leadership": 72,
        "power": 95,
        "intellect": 35,
        "rare": 3,
        "skill":13,
        "name": "典韦",
        "code":"dianwei"
    });
    this._addcharacterclass({
        "leadership": 74,
        "power": 96,
        "intellect": 35,
        "rare": 3,
        "skill":14,
        "name": "许褚",
        "code":"xuchu"
    });
    this._addcharacterclass({
        "leadership": 87,
        "power": 60,
        "intellect": 81,
        "rare": 2,
        "name": "满宠",
        "code":"manchong"
    });
    this._addcharacterclass({
        "leadership": 87,
        "power": 81,
        "intellect": 72,
        "rare": 2,
        "name": "徐盛",
        "code":"xusheng"
    });
    this._addcharacterclass({
        "leadership": 85,
        "power": 83,
        "intellect": 78,
        "rare": 2,
        "name": "程普",
        "code":"chengpu"
    });
    this._addcharacterclass({
        "leadership": 73,
        "power": 25,
        "intellect": 94,
        "rare": 2,
        "name": "荀攸",
        "code":"xunyou"
    });
    this._addcharacterclass({
        "leadership": 79,
        "power": 37,
        "intellect": 88,
        "rare": 2,
        "name": "沮授",
        "code":"jushou"
    });
    this._addcharacterclass({
        "leadership": 84,
        "power": 83,
        "intellect": 80,
        "rare": 2,
        "name": "李严",
        "code":"liyan"
    });
    this._addcharacterclass({
        "leadership": 85,
        "power": 82,
        "intellect": 74,
        "rare": 2,
        "name": "朱桓",
        "code":"zhuhuan"
    });
    this._addcharacterclass({
        "leadership": 83,
        "power": 61,
        "intellect": 83,
        "rare": 2,
        "name": "审配",
        "code":"shenpei"
    });
    this._addcharacterclass({
        "leadership": 83,
        "power": 77,
        "intellect": 78,
        "rare": 2,
        "name": "郝昭",
        "code":"haozhao"
    });
    this._addcharacterclass({
        "leadership": 74,
        "power": 55,
        "intellect": 89,
        "rare": 2,
        "name": "陈宫",
        "code":"chengong"
    });
    this._addcharacterclass({
        "leadership": 85,
        "power": 77,
        "intellect": 72,
        "rare": 2,
        "name": "于禁",
        "code":"yujin"
    });
    this._addcharacterclass({
        "leadership": 85,
        "power": 72,
        "intellect": 75,
        "rare": 2,
        "name": "韩遂",
        "code":"hansui"
    });
    this._addcharacterclass({
        "leadership": 66,
        "power": 29,
        "intellect": 93,
        "rare": 2,
        "name": "李儒",
        "code":"liru"
    });
    this._addcharacterclass({
        "leadership": 94,
        "power": 39,
        "intellect": 85,
        "rare": 2,
        "name": "蒋琬",
        "code":"liru"
    });
    this._addcharacterclass({
        "leadership": 76,
        "power": 62,
        "intellect": 83,
        "rare": 2,
        "name": "黄权",
        "code":"huangquan"
    });
    this._addcharacterclass({
        "leadership": 83,
        "power": 76,
        "intellect": 76,
        "rare": 1,
        "name": "王平",
        "code":"wangping"
    });
    this._addcharacterclass({
        "leadership": 73,
        "power": 29,
        "intellect": 84,
        "rare": 1,
        "name": "费祎",
        "code":"feiyi"
    });
    this._addcharacterclass({
        "leadership": 77,
        "power": 77,
        "intellect": 80,
        "rare": 1,
        "name": "李典",
        "code":"lidian"
    });
    this._addcharacterclass({
        "leadership": 75,
        "power": 35,
        "intellect": 81,
        "rare": 2,
        "name": "诸葛瑾",
        "code":"zhugejin"
    });
    this._addcharacterclass({
        "leadership": 79,
        "power": 64,
        "intellect": 77,
        "rare": 1,
        "name": "蔡瑁",
        "code":"caimao"
    });
    this._addcharacterclass({
        "leadership": 75,
        "power": 74,
        "intellect": 79,
        "rare": 1,
        "name": "孟达",
        "code":"mengda"
    });
    this._addcharacterclass({
        "leadership": 83,
        "power": 71,
        "intellect": 71,
        "rare": 1,
        "name": "吴懿",
        "code":"wuyi"
    });
    this._addcharacterclass({
        "leadership": 60,
        "power": 32,
        "intellect": 93,
        "rare": 2,
        "name": "田丰",
        "code":"tianfeng"
    });
    this._addcharacterclass({
        "leadership": 64,
        "power": 65,
        "intellect": 87,
        "rare": 2,
        "name": "马谡",
        "code":"masu"
    });

    this._addcharacterclass({
        "leadership": 49,
        "power": 33,
        "intellect": 84,
        "rare": 1,
        "name": "蒯越",
        "code":"kuaiyue"
    });
    this._addcharacterclass({
        "leadership": 51,
        "power": 50,
        "intellect": 82,
        "rare": 1,
        "name": "郭图",
        "code":"guotu"
    });
    this._addcharacterclass({
        "leadership": 46,
        "power": 25,
        "intellect": 84,
        "rare": 2,
        "name": "马良",
        "code":"maliang"
    });
    this._addcharacterclass({
        "leadership": 39,
        "power": 23,
        "intellect": 93,
        "rare": 2,
        "name": "刘晔",
        "code":"liuye"
    });
    this._addcharacterclass({
        "leadership": 36,
        "power": 24,
        "intellect": 84,
        "rare": 1,
        "name": "许攸",
        "code":"xuyou"
    });
    this._addcharacterclass({
        "leadership": 35,
        "power": 9,
        "intellect": 84,
        "rare": 2,
        "name": "张昭",
        "code":"zhangzhao"
    });
    this._addcharacterclass({
        "leadership": 31,
        "power": 23,
        "intellect": 75,
        "rare": 1,
        "name": "伊籍",
        "code":"yiji"
    });
    this._addcharacterclass({
        "leadership": 15,
        "power": 12,
        "intellect": 88,
        "rare": 1,
        "name": "张松",
        "code":"zhangsong"
    });
  
    },

    _initGoodClass:function(){
       this._addgoodclass({
            "leadership": 0,
            "power": 1,
            "intellect": 0,
            "type": 1,
            "name": "铁戟",
            "gold": 400,
            "code":"goods8"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 2,
            "intellect": 0,
            "type": 1,
            "name": "眉尖刀",
            "gold": 4000,
            "code":"goods3"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 3,
            "intellect": 0,
            "type": 1,
            "name": "雌雄双剑",
            "gold": 5000,
            "code":"goods4"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 2,
            "intellect": 0,
            "type": 1,
            "name": "凤嘴刀",
            "gold": 4000,
            "code":"goods5"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 2,
            "intellect": 0,
            "type": 1,
            "name": "檀弓",
            "gold": 4000,
            "code":"goods6"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 2,
            "intellect": 0,
            "type": 1,
            "name": "铜锤",
            "gold": 4000,
            "code":"goods9"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 2,
            "intellect": 0,
            "type": 1,
            "name": "大斧",
            "gold": 4000,
            "code":"goods11"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 3,
            "type": 1,
            "name": "羽扇",
            "gold": 5000,
            "code":"goods7"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 4,
            "intellect": 0,
            "type": 1,
            "name": "银枪",
            "gold": 8000,
            "code":"goods12"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 5,
            "intellect": 0,
            "type": 1,
            "name": "七星宝刀",
            "gold": 10000,
            "code":"goods2"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 5,
            "intellect": 0,
            "type": 1,
            "name": "倚天剑",
            "gold": 10000,
            "code":"goods1"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 5,
            "intellect": 0,
            "type": 1,
            "name": "青虹剑",
            "gold": 10000,
            "code":"goods10"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 7,
            "intellect": 0,
            "type": 1,
            "name": "蛇矛",
            "gold": 15000,
            "code":"goods13"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 7,
            "intellect": 0,
            "type": 1,
            "name": "偃月刀",
            "gold": 15000,
            "code":"goods14"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 8,
            "intellect": 0,
            "type": 1,
            "name": "方天画戟",
            "gold": 15000,
            "code":"goods15"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 2,
            "type": 2,
            "name": "孟德新书",
            "gold": 4000,
            "code":"goods102"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 4,
            "type": 2,
            "name": "墨子",
            "gold": 7000,
            "code":"goods101"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 3,
            "type": 2,
            "name": "汉书",
            "gold": 5000,
            "code":"goods103"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 4,
            "type": 2,
            "name": "礼记",
            "gold": 8000,
            "code":"goods104"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 5,
            "type": 2,
            "name": "史记",
            "gold": 10000,
            "code":"goods105"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 5,
            "type": 2,
            "name": "六韬",
            "gold": 10000,
            "code":"goods106"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 4,
            "type": 2,
            "name": "左传",
            "gold": 8000,
            "code":"goods107"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 3,
            "type": 2,
            "name": "吴越春秋",
            "gold": 5000,
            "code":"goods108"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 5,
            "type": 2,
            "name": "战国策",
            "gold": 10000,
            "code":"goods109"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 4,
            "type": 2,
            "name": "春秋左氏传",
            "gold": 8000,
            "code":"goods110"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 5,
            "type": 2,
            "name": "孙膑兵法",
            "gold": 10000,
            "code":"goods111"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 4,
            "type": 2,
            "name": "山海经",
            "gold": 8000,
            "code":"goods112"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 7,
            "type": 2,
            "name": "遁甲天书",
            "gold": 15000,
            "code":"goods113"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 7,
            "type": 2,
            "name": "太平清领道",
            "gold": 15000,
            "code":"goods115"
        });
        this._addgoodclass({
            "leadership": 0,
            "power": 0,
            "intellect": 8,
            "type": 2,
            "name": "太平要术",
            "gold": 20000,
            "code":"goods114"
        });
        this._addgoodclass({
            "leadership": 1,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "乌丸马",
            "gold": 3000,
            "code":"goods201"
        });
        this._addgoodclass({
            "leadership": 1,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "凉州马",
            "gold": 3000,
            "code":"goods204"
        });
        this._addgoodclass({
            "leadership": 2,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "白马",
            "gold": 4000,
            "code":"goods207"
        });
        this._addgoodclass({
            "leadership": 2,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "果下马",
            "gold": 4000,
            "code":"goods212"
        });
        this._addgoodclass({
            "leadership": 2,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "大宛马",
            "gold": 4000,
            "code":"goods202"
        });
        this._addgoodclass({
            "leadership": 3,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "白龙",
            "gold": 5000,
            "code":"goods203"
        });
        this._addgoodclass({
            "leadership": 5,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "绝影",
            "gold": 10000,
            "code":"goods209"
        });
        this._addgoodclass({
            "leadership": 5,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "爪黄飞电",
            "gold": 10000,
            "code":"goods206"
        });
        this._addgoodclass({
            "leadership": 7,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "的卢",
            "gold": 15000,
            "code":"goods211"
        });
        this._addgoodclass({
            "leadership": 8,
            "power": 0,
            "intellect": 0,
            "type": 3,
            "name": "赤兔",
            "gold": 20000,
            "code":"goods215"
        });
    },
    _initSkill:function()
    {
        this._addskill({
        "leadership": 5,
        "power": 5,
        "intellect": 0,
        "gold": 30000,
        "name": "无双",
        "code":"ZhanDouJN160"
    });
    this._addskill({
        "leadership": 5,
        "power": 0,
        "intellect": 5,
        "gold": 30000,
        "name": "奇门遁甲",
        "code":"ZhanDouJN330"
    });
    this._addskill({
        "leadership": 3,
        "power": 3,
        "intellect": 1,
        "gold": 15000,
        "name": "突击",
        "code":"ZhanDouJN130"
    });
    this._addskill({
        "leadership": 1,
        "power": 3,
        "intellect": 3,
        "gold": 15000,
        "name": "拖刀计",
        "code":"ZhanDouJN90"
    });
    this._addskill({
        "leadership": 3,
        "power": 4,
        "intellect": 0,
        "gold": 15000,
        "name": "大喝",
        "code":"ZhanDouJN150"
    });
    this._addskill({
        "leadership": 0,
        "power": 4,
        "intellect": 0,
        "gold": 12000,
        "name": "百步穿杨",
        "code":"ZhanDouJN450"
    });
    this._addskill({
        "leadership": 2,
        "power": 3,
        "intellect": 0,
        "gold": 15000,
        "name": "西凉铁骑",
        "code":"ZhanDouJN60"
    });
    this._addskill({
        "leadership": 3,
        "power": 1,
        "intellect": 3,
        "gold": 15000,
        "name": "驱虎吞狼",
        "code":"ZhanDouJN440"
    });
    this._addskill({
        "leadership": 5,
        "power": 0,
        "intellect": 2,
        "gold": 15000,
        "name": "鼓舞",
        "code":"ZhanDouJN230"
    });
    this._addskill({
        "leadership": 3,
        "power": 1,
        "intellect": 3,
        "gold": 15000,
        "name": "火烧连营",
        "code":"ZhanDouJN310"
    });
    this._addskill({
        "leadership": 1,
        "power": 3,
        "intellect": 0,
        "gold": 15000,
        "name": "箭雨",
        "code":"ZhanDouJN20"
    });
    this._addskill({
        "leadership": 1,
        "power": 3,
        "intellect": 0,
        "gold": 15000,
        "name": "肉搏",
        "code":"ZhanDouJN140"
    });
    this._addskill({
        "leadership": 1,
        "power": 3,
        "intellect": 1,
        "gold": 15000,
        "name": "奇袭",
        "code":"ZhanDouJN50"
    });
    this._addskill({
        "leadership": 3,
        "power": 0,
        "intellect": 3,
        "gold": 15000,
        "name": "妖术",
        "code":"prop300"
    });
    this._addskill({
        "leadership": 0,
        "power": 4,
        "intellect": 0,
        "gold": 15000,
        "name": "破甲",
        "code":"ZhanDouJN10"
    });
    this._addskill({
        "leadership": 0,
        "power": 4,
        "intellect": 0,
        "gold": 15000,
        "name": "狂暴",
        "code":"ZhanDouJN170"
    });
    this._addskill({
        "leadership": 0,
        "power": 4,
        "intellect": 0,
        "gold": 15000,
        "name": "埋伏",
        "code":"ZhanDouJN40"
    });
    this._addskill({
        "leadership": 3,
        "power": 0,
        "intellect": 3,
        "gold": 15000,
        "name": "美人计",
        "code":"ZhanDouJN220"
    });

    },
     _initLeaderboard:function(){
        this.leaderboard.set(1, []); // wei
        this.leaderboard.set(2, []); // shu
        this.leaderboard.set(3, []); // wu
        return true;
    },
    _random: function(min, max) {
        var result = Math.floor(Math.random()*(max-min+1)+min); 
            
        return result;
    },
    _addcharacterclass: function(data) {
        data.id = this.characterclass_cnt;
        this.characterclass.set(this.characterclass_cnt, data);
        this.characterclass_cnt += 1;
        return true;
    },
    _addgoodclass: function(data) {
        data.id = this.goodclass_cnt;
        this.goodclass.set(this.goodclass_cnt, data);
        this.goodclass_cnt += 1;
        return true;
    },
    _addskill: function(data) {
        data.id = this.skill_cnt;
        this.skill.set(this.skill_cnt, data);
        this.skill_cnt += 1;
        return true;
    },
    _updatecharacterclass: function(data) {
        this.characterclass.set(data.id, data);
        return true;
    },
    _updategoodclass: function(data) {
        this.goodclass.set(data.id, data);
        return true;
    },
    _updateskill: function(data) {
        this.skill.set(data.id, data);
        return true;
    },
    _updatecharacter: function(data) {
        this.character.set(data.id, data);
        return true;
    },
    _updatecity: function(city) {
        this.city.set(city.id, data);
        return true;
    },
    _getdroprate:function()
    {
        var result = 0;
        var random = this._random(1,100);
        for (var i = 0; i < this.droprate.length; i++) {
            var rare = this.droprate[i].rare;
            var droprate = this.droprate[i].droprate;
            
            if(random>=droprate[0] && random <= droprate[1])
            {
                result = rare;
                break;
            }
        }

        return result;

    },
    _getrandomcharacterclass(f)
    {
        var selectedclass= null;
        var rare = this._getdroprate();
        if(f)
        {
            if(rare == 0)
            {
                rare = 1;
            }
        }
        //rare = 2;

        var classespool = [];
        
        for(var i=0;i<this.characterclass_cnt;i++)
        {
            var characterclass = this.characterclass.get(i);
            if(characterclass)
            {
                if(characterclass["rare"] == rare)
                {
                    classespool[classespool.length] = characterclass;
                }
            }
        }
        if(classespool.length>0)
        {
            var classindex = this._random(0,classespool.length-1);
            selectedclass = classespool[classindex];
        }
        
        return selectedclass;
    },
    _updateleaderboard: function(city)
    {
        var leaderboard = this.leaderboard.get(city.faction);

        var cnt = leaderboard.length;
        var leaders = [];

        var newpos = {}
        newpos.id = city.id
        newpos.name =city.name
        newpos.from =city.from
        newpos.reputation = city.reputation

      



        if(leaderboard.length == 0)
        {
            leaders[leaders.length] = newpos
        }else if(leaderboard.length == 1)
        {
            if(newpos.from == leaderboard[0].from)
            {
                leaders[0] = newpos
            }else{
                if(newpos.reputation > leaderboard[0].reputation)
                {
                    leaders[leaders.length] = newpos
                    leaders[leaders.length] = leaderboard[0]
                    
                }else{
                    leaders[leaders.length] = leaderboard[0]
                    leaders[leaders.length] = newpos
                }

            }

            
        }else if(leaderboard.length == 2)
        {
            if(newpos.reputation > leaderboard[0].reputation)
            {
                if(newpos.from == leaderboard[0].from)
                {
                    leaders[leaders.length] = newpos
                    leaders[leaders.length] = leaderboard[1]
                }else{
                    if(newpos.from == leaderboard[1].from)
                    {
                        leaders[leaders.length] = newpos
                        leaders[leaders.length] = leaderboard[0]
                    }else{
                        leaders[leaders.length] = newpos
                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = leaderboard[1]
                    }
                }
                
            }else{

                if(newpos.reputation > leaderboard[1].reputation)
                {
                    if(newpos.from == leaderboard[1].from)
                    {
                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = newpos

                    }else{

                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = newpos
                        leaders[leaders.length] = leaderboard[1]

                    }
                }else{
                    leaders[leaders.length] = leaderboard[0]
                    leaders[leaders.length] = leaderboard[1]
                    leaders[leaders.length] = newpos
                }
            }
        }else if(leaderboard.length == 3)
        {
            if(newpos.reputation > leaderboard[0].reputation)
            {
                 if(newpos.from == leaderboard[0].from)
                {
                    leaders[leaders.length] = newpos
                    leaders[leaders.length] = leaderboard[1]
                    leaders[leaders.length] = leaderboard[2]
                }else{
                    leaders[leaders.length] = newpos
                    leaders[leaders.length] = leaderboard[0]
                    leaders[leaders.length] = leaderboard[1]
                }
            }else{

                if(newpos.reputation > leaderboard[1].reputation)
                {
                   if(newpos.from == leaderboard[1].from)
                   {
                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = newpos
                        leaders[leaders.length] = leaderboard[2]
                   }else{
                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = newpos
                        leaders[leaders.length] = leaderboard[1]
                   }
                }else{

                    if(newpos.reputation > leaderboard[2].reputation)
                    {
                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = leaderboard[1]
                        leaders[leaders.length] = newpos 

                    }else{
                        leaders[leaders.length] = leaderboard[0]
                        leaders[leaders.length] = leaderboard[1]
                        leaders[leaders.length] = leaderboard[2]
                    }
                }
            }
        }

        this.leaderboard.set(city.faction,leaders);

    },


    _battle: function(attacker, defender) {
        var msg ="";
        //Attacker
        var ap = 0;  // power
        var ai = 0;  // intellect
        var al = 0;  // leadership

        for(var i=0;i<attacker.guards.length;i++)
        {
            var chara =this.character.get(attacker.guards[i]);

            var chara_power = chara.power;
            var chara_intellect = chara.intellect;
            var chara_leadership = chara.leadership;

            //goods
            var charactergood = this.charactergood.get(attacker.guards[i]);
            if(charactergood)
            {
                for(var j=0;j<charactergood.length;j++)
                {
                    var good = this.good.get(charactergood[j]);
                    if(good)
                    {
                        chara_power += good.power;
                        chara_intellect += good.intellect;
                        chara_leadership += good.leadership;
                    }
                }
            }

            
            var power = chara_power/100;
            ap += Math.pow(power, 10);
            var intellect = chara_intellect/100;
            ai += Math.pow(intellect, 10);
            var leadership = chara_leadership/100;
            al += Math.pow(leadership, 10);
        }
      
        var stats_a = ap.toString() + ',' + ai.toString() + ',' + al.toString();

        //Defender
        var dp = 0;  // power
        var di = 0;  // intellect
        var dl = 0; // leadership
        for(var i=0;i<defender.guards.length;i++)
        {
            var chara = this.character.get(defender.guards[i]);

            var chara_power = chara.power;
            var chara_intellect = chara.intellect;
            var chara_leadership = chara.leadership;

            //goods
            var charactergood = this.charactergood.get(defender.guards[i]);
            if(charactergood)
            {
                for(var j=0;j<charactergood.length;j++)
                {
                    var good = this.good.get(charactergood[j]);
                    if(good)
                    {
                        chara_power += good.power;
                        chara_intellect += good.intellect;
                        chara_leadership += good.leadership;
                    }
                }
            }

            var power = chara_power/100;
            dp += Math.pow(power, 10);
            var intellect = chara_intellect/100;
            di += Math.pow(intellect, 10);
            var leadership = chara_leadership/100;
            dl += Math.pow(leadership, 10);
        }

 
        var stats_d = dp.toString() + ',' + di.toString() + ',' + dl.toString();

        var ar = ap + ai + al;
        var dr = dp + di + dl;

        if(ar > dr) // attacker won
        {
            //attacker.army = Math.round(attacker.army * 0.9);
            attacker.gold = Math.round(attacker.gold + defender.gold * 0.1);
            attacker.food = Math.round(attacker.food + defender.food * 0.1);
            attacker.exp += 30;
            attacker.protected = false;
            if(attacker.faction!=defender.faction)
            {
                attacker.reputation += this.attack_reputation;
                this._updateleaderboard(attacker);
            }

            //defender.army = Math.round(defender.army * 0.7);
            defender.gold = Math.round(defender.gold * 0.9);
            defender.food = Math.round(defender.food * 0.9);
            defender.exp += 10;
            defender.protected = true;
            var ts = new Date().getTime();
            defender.protection_startts = ts;
            defender.protection_endts = ts + 60000 * this.protection_minutes;
            msg = this._logbattle(attacker.name, defender.name, ' 并获胜！战力对比 ' + (ar*100).toFixed(2) + ' vs ' + (dr*100).toFixed(2));

        }else{

            //defender.army = Math.round(defender.army * 0.9);
            defender.gold = Math.round(defender.gold + attacker.gold * 0.1);
            defender.food = Math.round(defender.food + attacker.food * 0.1);
            defender.exp += 30;
            defender.protected = true;
            var ts = new Date().getTime();
            defender.protection_startts = ts;
            defender.protection_endts = ts + 60000 * this.protection_minutes;

            attacker.protected = false;
            if(attacker.faction!=defender.faction)
            {
                defender.reputation += this.attack_reputation;
                this._updateleaderboard(defender);
            }

            //attacker.army = Math.round(attacker.army * 0.7);
            attacker.gold = Math.round(attacker.gold * 0.9);
            attacker.food = Math.round(attacker.food * 0.9);
            attacker.exp += 10;
            msg = this._logbattle(attacker.name, defender.name, ' 但兵败。战力对比 ' + (ar*100).toFixed(2) + ' vs ' + (dr*100).toFixed(2));
        }

        return msg;
    },
    _logbattle: function(attacker_id, defender_id, result) {
        var msg = attacker_id + " 进攻 " + defender_id + result;

        return msg;
    },
    _logsearch: function(charactername, gold, food) {
        var msg = "";

        if(charactername)
        {
            msg += "恭喜主公！" + charactername + " 前来辅佐!";
        }
        if(gold>0)
        {
            msg += "找到" + gold + "金";
        }
        if(food>0)
        {
            msg += "找到" + food + "粮食";
        }

        return msg;
    },

    returnData: function() {
        return {
            "city_cnt": this.city_cnt,
            "characterclass_cnt": this.characterclass_cnt,
            "character_cnt": this.character_cnt,
            "goodclass_cnt": this.goodclass_cnt,
            "good_cnt": this.good_cnt
        }
    },
    search: function() {
        var from = Blockchain.transaction.from
        var value = Blockchain.transaction.value

        if(value < (this.search_value * this._nasToWei()))
        {
            return {
                'msg':'资金不足',
                'success':false
            }
        }

        var playerlog = this.playerlog.get(from);
        if(!playerlog)
        {
            playerlog = [];
        }

        var playercharacter = this.playercharacter.get(from);
        if(!playercharacter)
        {
            playercharacter = [];
        }

        var selectedclass = this._getrandomcharacterclass(false);
        var charactername = "";
        var gold = 0;
        var food = 0;

        var addToPlayer = false;
        if(selectedclass)
        {
            var existForPlayer = false;
            for(var i=0;i<playercharacter.length;i++)
            {
                var character = this.character.get(playercharacter[i]);
                if(character)
                {
                    if(character.code == selectedclass.code)
                    {
                        existForPlayer = true;
                        break;
                    }
                }
            }

            if(!existForPlayer) // new to player, add to player
            {
                // add to city
                charactername = selectedclass.name;
                selectedclass.id = this.character_cnt;
                selectedclass.from = from;
                selectedclass.skillactivated = false;
                playercharacter[playercharacter.length] = selectedclass.id;     
                this.playercharacter.set(from,playercharacter);
                this.character.set(this.character_cnt,selectedclass);
                this.character_cnt+=1;
                addToPlayer = true;

                // add to guards
                var playercity = this.playercity.get(from);
                var city = this.city.get(playercity);
                if(city)
                {
                    city.reputation += this.search_reputation;
                    this._updateleaderboard(city);

                    if(city.guards.length<this.max_city_guards)
                    {
                        city.guards[city.guards.length] = selectedclass.id;
                    }

                    this.city.set(playercity,city);
                }
            }
        }

        if(!addToPlayer) // if not able to get character, give some gold and food
        {
            gold = this._random(this.goldrate[0],this.goldrate[1])
            food = this._random(this.foodrate[0],this.foodrate[1])
        }

        var msg = this._logsearch(charactername,gold,food);
        var log = {};
        log.ts = new Date().getTime();
        log.msg = msg;
        playerlog[playerlog.length] = log;

        // player log
        if(playerlog.length > this.log_maxlength)
        {
          playerlog = playerlog.slice(playerlog.length-this.log_maxlength, playerlog.length);
        }
        this.playerlog.set(from,playerlog);

        return {
            'msg':msg,
            'success':true
        };
    },
    initCity: function(x,y,name,faction) {
        var from = Blockchain.transaction.from

        var playercity = this.playercity.get(from);
        var city = city = this.city.get(playercity);
        if(!city) //first time
        {
            city = {};
            city.id = this.city_cnt;
            city.name = name;
            city.from = from;
            city.faction = faction;
            city.guards = [];
            this._initCityStats(city);

            var playercharacter = this.playercharacter.get(from)
            if(!playercharacter)
            {
                playercharacter = [];
            }

            var selectedclass = this._getrandomcharacterclass(true);
            //selectedclass = this.characterclass.get(0);
            var charactername = "";
            if(selectedclass)
            {
                selectedclass.id = this.character_cnt;
                selectedclass.from = from;
                selectedclass.skillactivated = false;
                charactername = selectedclass.name;
                playercharacter[playercharacter.length] = selectedclass.id;     
                this.playercharacter.set(from,playercharacter);
                this.character.set(this.character_cnt,selectedclass);
                this.character_cnt+=1;

                if(city.guards.length<this.max_city_guards)
                {
                    city.guards[city.guards.length] = selectedclass.id;
                }
            }

            city.x=x;
            city.y=y;

            this.city.set(city.id,city);
            this.playercity.set(from,city.id);
            this.city_cnt +=1;

            var playerlog = this.playerlog.get(from);
            if(!playerlog)
            {
                playerlog = [];
            }
            var log0 = {};
            log0.ts = new Date().getTime();
            log0.msg = '恭喜主公建功立业！大业指日可待！';
            playerlog[playerlog.length] = log0;

            var msg = this._logsearch(charactername,0,0);
            var log = {};
            log.ts = new Date().getTime();
            log.msg = msg;
            playerlog[playerlog.length] = log;

            // player log
            if(playerlog.length > this.log_maxlength)
            {
              playerlog = playerlog.slice(playerlog.length-this.log_maxlength, playerlog.length);
            }
            this.playerlog.set(from,playerlog);

            return {
                'msg': msg,
                'success':true
            };

        }
        return true;
    },
    setCity: function(x,y) {
        var from = Blockchain.transaction.from

        var playercity = this.playercity.get(from);
        var city = this.city.get(playercity);
        if(!city) //first time
        {
            return {
                'msg':'无效的城市选择',
                'success':true
            }
        }
        city.x=x;
        city.y=y;

        this.city.set(city.id,city);

        return {
         'msg': '设置完毕',
         'success':true
        };
    },
    attackCity: function(eid) {
        var from = Blockchain.transaction.from
        var fromcityid = this.playercity.get(from);
        var fromcity = this.city.get(fromcityid);

        var tocityid = this.playercity.get(eid);
        var tocity = this.city.get(tocityid);

        var fromlog = this.playerlog.get(from);
        var tolog = this.playerlog.get(eid);
        if(!fromlog)
        {
            fromlog = []
        }
        if(!tolog)
        {
            tolog = []
        }

       
        // check if tocity is protected
        if(tocity.protected)
        {
            if(tocity.protection_endts)
            {
                var now = new Date().getTime();
                if((now - tocity.protection_endts) < 0) // still protected
                {
                    return {
                        'msg':'对方城市仍在保护时间内',
                        'success':false
                    }

                }
            }
        }

        // all good

        var msg = this._battle(fromcity, tocity);

        this.city.set(fromcityid,fromcity);
        this.city.set(tocityid,tocity);

        var log = {};
        log.ts = new Date().getTime();
        log.msg = msg;

        fromlog[fromlog.length] = log;
        tolog[tolog.length] = log;

        // player log
        if(fromlog.length > this.log_maxlength)
        {
          fromlog = fromlog.slice(fromlog.length-this.log_maxlength, fromlog.length);
        }
        this.playerlog.set(from,fromlog);

        if(tolog.length > this.log_maxlength)
        {
          tolog = tolog.slice(tolog.length-this.log_maxlength, tolog.length);
        }
        this.playerlog.set(eid,tolog);

        //var msg = fromcity.id + fromcity.from + JSON.stringify(fromcity.guards) + "|" + tocity.id + tocity.from + JSON.stringify(tocity.guards) 

        return {
            'msg':msg,
            'success':true
        };
    },
    updateGuards: function(arr) {
        var from = Blockchain.transaction.from

        var cityid = this.playercity.get(from);
        var city = this.city.get(cityid);
        var playercharacter = this.playercharacter.get(from);
        var guards = JSON.parse(arr);
        if(guards && city && playercharacter)
        {

            var validGuard = true;
            for(var i=0;i<guards.length;i++)
            {
                var newguard = guards[i];

                var foundCharacter = false;
                for(var j=0;j<playercharacter.length;j++)
                {

                    var oldguard =this.character.get(playercharacter[j]);
                    if(oldguard.id == newguard)
                    {
                       foundCharacter = true;
                       break;
                    }
                }

                if(!foundCharacter)
                {
                  validGuard=false;
                }
            }

            if(!validGuard)
            {
                return {
                    'msg':'无效的武将选择',
                    'success':false
                }
            }else{
                if(guards.length<=this.max_city_guards)
                {
                    city.guards = guards;
                    this.city.set(cityid,city);
                    return {
                        'msg':'更新了部队配置',
                        'success':true
                    }
                }else{
                    return {
                        'msg':'部队最多只能有' + this.max_city_guards + '名武将',
                        'success':false
                    }
                }
                
            }

        }else{
            return{
                'msg':'无效操作',
                'success':false
            }
        }
        
        return true;
    },

    buyGood: function(cid) {
        var from = Blockchain.transaction.from;
        var cityid = this.playercity.get(from);
        var city = this.city.get(cityid)
        var goodclass = this.goodclass.get(cid);
        var playergood = this.playergood.get(from);
        var playerlog = this.playerlog.get(from);

        if(!playerlog)
        {
            playerlog = [];
        }

        if(!playergood)
        {
            playergood = [];
        }
        if(goodclass && city)
        {
            var alreadyHave = false;
            for(var i=0;i<playergood.length;i++)
            {
                var good = this.good.get(playergood[i]);
                if(good)
                {
                    if(good.classid == cid)
                    {
                        alreadyHave = true;
                        break;
                    }
                }
            }

            if(alreadyHave)
            {
                return {
                    'msg':'主公已经拥有这件宝物了',
                    'success':false
                }
            }else{
                if(city.gold >= goodclass.gold)
                {
                    var good = {}
                    good.id = this.good_cnt;
                    good.classid = goodclass.id;
                    good.leadership = goodclass.leadership;
                    good.power = goodclass.power;
                    good.intellect = goodclass.intellect;
                    good.type = goodclass.type;
                    good.name = goodclass.name;
                    good.code = goodclass.code;
                    good.from = from;
                    good.character = null;

                    city.gold = city.gold - goodclass.gold;
                    playergood[playergood.length] = good.id;

                    this.good.set(this.good_cnt,good);
                    this.playergood.set(from,playergood);
                    this.city.set(cityid,city);
                    this.good_cnt +=1;

                    var log = {};
                    log.ts = new Date().getTime();
                    log.msg = "购买得到了 " + good.name;
                    playerlog[playerlog.length] = log;
                    // player log
                    if(playerlog.length > this.log_maxlength)
                    {
                      playerlog = playerlog.slice(playerlog.length-this.log_maxlength, playerlog.length);
                    }
                    this.playerlog.set(from,playerlog);

                    return {
                        'msg':log.msg,
                        'success':true
                    }

                }else{
                    return {
                        'msg':'黄金不足',
                         'success':false
                    }
                }

            }
        }

        return true;
    },

    equipGear: function(id,characterid)
    {
        var from = Blockchain.transaction.from;
        var cityid = this.playercity.get(from);
        var playergood = this.playergood.get(from);
        var playerlog = this.playerlog.get(from);

        var good = this.good.get(id);
        var character = this.character.get(characterid);
        if(good && character)
        {
            if(good.from != from || character.from!=from)
            {
                return {
                    'msg':'装备宝物出错啦',
                    'success':false
                }
            }else{
                var charactergood = this.charactergood.get(characterid);
                if(!charactergood)
                {
                    charactergood = [];
                }
                var foundSameTypeGood = false;
                for(var i=0;i<charactergood.length;i++)
                {
                    var g = this.good.get(charactergood[i]);
                    if(g)
                    {
                        if(g.type == good.type) // same type good
                        {
                            charactergood[i] = good.id;
                            g.character = null;
                            foundSameTypeGood = true;
                        }
                    }
                }
                if(!foundSameTypeGood){
                    charactergood[charactergood.length] = good.id;
                }
                good.character = characterid;

                // update
                this.charactergood.set(characterid,charactergood);
                this.good.set(id,good);

                return {
                    'msg':'装备完毕',
                    'success':true
                }

            }
        }else{
            return {
                    'msg':'非法操作',
                    'success':false
                }
        }


        return true;

    },

    unequipGear: function(id,characterid)
    {
        var from = Blockchain.transaction.from;
        var cityid = this.playercity.get(from);
        var playergood = this.playergood.get(from);
        var playerlog = this.playerlog.get(from);

        var good = this.good.get(id);
        var character = this.character.get(characterid);
        if(good && character)
        {
            if(good.from != from || character.from!=from)
            {
                return {
                    'msg':'卸载宝物出错啦',
                    'success':false
                }
            }else{
                var charactergood = this.charactergood.get(characterid);
                if(!charactergood)
                {
                    charactergood = [];
                }

                var newcharactergood = [];
                var foundSameTypeGood = false;
                for(var i=0;i<charactergood.length;i++)
                {
                    var g = this.good.get(charactergood[i]);
                    if(g)
                    {
                        if(g.id != good.id) // same type good
                        {
                            newcharactergood[newcharactergood.length]=g.id;
                        }
                    }
                }
                good.character = null;

                // update
                this.playergood.set(characterid,newcharactergood);
                this.good.set(id,good);

                return {
                    'msg':'卸载完毕',
                    'success':true
                }


            }
        }

        return true;

    },
    harvestCity: function()
    {
        var from = Blockchain.transaction.from
        var cityid = this.playercity.get(from);
        var city = this.city.get(cityid)
        if(city)
        {
            var canHarvest = true;
            if(city.harvested)
            {
                if(city.harvest_endts)
                {
                    var now = new Date().getTime();
                    if((now - city.harvest_endts) < 0) 
                    {
                        canHarvest = false;

                        return {
                            'msg':'城市采集仍在冷却时间内',
                            'success':false
                        }

                    }
                }
            }
            if(canHarvest)
            {
                var playerlog = this.playerlog.get(from);
                if(!playerlog)
                {
                    playerlog = [];
                }

                var gold = this._random(this.goldrate[0],this.goldrate[1])
                var food = this._random(this.foodrate[0],this.foodrate[1])
                var msg = '征收到' + gold + '黄金 ' + food + '粮食';

                city.food +=food;
                city.gold +=gold;
                city.harvested = true;
                var ts = new Date().getTime();
                city.harvest_startts = ts;
                city.harvest_endts = ts + 60000 * this.harvest_minutes;

                this.city.set(cityid,city);


                var log = {};
                log.ts = new Date().getTime();
                log.msg = msg;
                playerlog[playerlog.length] = log;
                if(playerlog.length > this.log_maxlength)
                {
                  playerlog = playerlog.slice(playerlog.length-this.log_maxlength, playerlog.length);
                }
                this.playerlog.set(from,playerlog);

                return {
                    'msg': msg,
                    'success':true
                }

            }
        }
        return true;
        
    },
    getCity: function(eid) {
        var from = Blockchain.transaction.from
        var cityid = this.playercity.get(eid);
        var city = this.city.get(cityid)
        var guards = [];
        if(city)
        {
            for(var i=0;i<city.guards.length;i++)
            {
                var character = this.character.get(city.guards[i]);
                var charactergood = this.charactergood.get(city.guards[i]);
                var goods = [];
                if(charactergood)
                {
                    for(var j=0;j<charactergood.length;j++)
                    {
                        var good = this.good.get(charactergood[j]);
                        goods[goods.length] = good;
                    }
                }
                character.goods = goods;
                guards[guards.length] = character;
            }
        }
        city.guards = guards;
        
        return city;
    },

    getPlayerCity: function() {
        var from = Blockchain.transaction.from
        var cityid = this.playercity.get(from);
        var city = this.city.get(cityid)
        
        return city;
    },

    checkPlayerCity: function() {
        var from = Blockchain.transaction.from
        var cityid = this.playercity.get(from);
        var city = this.city.get(cityid)
        
        return city;
    },
    getPlayerGoods: function() {
        var from = Blockchain.transaction.from
        var playergood = this.playergood.get(from);
        var goods = [];
        if(playergood)
        {
            for(var i=0;i<playergood.length;i++)
            {
                var good = this.good.get(playergood[i]);
                goods[goods.length] = good;
            }
        }
        return goods;
    },
    getCharacterGoods: function(id) {
        var from = Blockchain.transaction.from
        var charactergood = this.charactergood.get(id);
        var goods = [];
        if(playergood)
        {
            for(var i=0;i<charactergood.length;i++)
            {
                var good = this.good.get(charactergood[i]);
                goods[goods.length] = good;
            }
        }
        return goods;
    },
    getPlayerGuards: function() {
        var from = Blockchain.transaction.from
        var cityid = this.playercity.get(from);
        var city = this.city.get(cityid)
        var guards = [];
        if(city)
        {
            for(var i=0;i<city.guards.length;i++)
            {
                var character = this.character.get(city.guards[i]);
                var charactergood = this.charactergood.get(city.guards[i]);
                var goods = [];
                if(charactergood)
                {
                    for(var j=0;j<charactergood.length;j++)
                    {
                        var good = this.good.get(charactergood[j]);
                        goods[goods.length] = good;
                    }
                }
                character.goods = goods;
                guards[guards.length] = character;
            }
        }
        return guards;
    },
    getCharacter: function(id) {
        var from = Blockchain.transaction.from
        var character = this.character.get(id);
        var charactergood = this.charactergood.get(id);
        var goods = [];
        if(charactergood)
        {
            for(var i=0;i<charactergood.length;i++)
            {
                var good = this.good.get(charactergood[i]);
                goods[goods.length] = good;
            }
        }
        character.goods = goods;
        if(character.skill)
        {
            var skill = this.skill.get(character.skill);
            character.skillclass=skill;
        }

        return character;
    },
    getPlayerCharacter: function() {
        var from = Blockchain.transaction.from
        var playercharacter = this.playercharacter.get(from);
        var characters = [];
        for(var i=0;i<playercharacter.length;i++)
        {
            var character = this.character.get(playercharacter[i]);
            var charactergood = this.charactergood.get(playercharacter[i]);
            var goods = [];
            if(charactergood)
            {
                for(var j=0;j<charactergood.length;j++)
                {
                    var good = this.good.get(charactergood[j]);
                    goods[goods.length] = good;
                }
            }
            character.goods = goods;
            characters[characters.length] = character;
        }
        return characters;
    },
    getPlayerLog: function() {
        var from = Blockchain.transaction.from
        var playerlog = this.playerlog.get(from);
        
        return playerlog.reverse();
    },
    getCities: function() {

        var from = Blockchain.transaction.from
        var cities = [];
        for(var i=0;i<this.city_cnt;i++)
        {
            var city = this.city.get(i);
            if(city.from == from)
            {
                city.isowner=true;
            }else{
                city.isowner = false;
            }
            cities[cities.length] = city;
        }
        return cities;
    },

    getCharacterClasses: function() {

        var from = Blockchain.transaction.from
        var characterclasses = [];
        for(var i=0;i<this.characterclass_cnt;i++)
        {
            var characterclass = this.characterclass.get(i);

            characterclasses[characterclasses.length] = characterclass;
        }
        return characterclasses;
    },

    getGoodClasses: function() {

        var from = Blockchain.transaction.from
        var playergood = this.playergood.get(from);
        var goodclasses = [];
        for(var i=0;i<this.goodclass_cnt;i++)
        {
            var goodclass = this.goodclass.get(i);
            goodclass.sold = false;
            if(playergood)
            {
                var alreadyHave = false;
                for(var j=0;j<playergood.length;j++)
                {
                    var good = this.good.get(playergood[j]);
                    if(good)
                    {
                        if(good.classid == goodclass.id)
                        {
                            alreadyHave = true;
                            break;
                        }
                    }
                }
                if(alreadyHave)
                {
                    goodclass.sold = true;
                }
            }


            goodclasses[goodclasses.length] = goodclass;
        }
        return goodclasses;
    },

    getLeaders: function() {
       var leaderboards = [];
       var leaderboard1 = this.leaderboard.get(1);
       var leaderboard2 = this.leaderboard.get(2);
       var leaderboard3 = this.leaderboard.get(3);
       leaderboards[leaderboards.length] = leaderboard1;
       leaderboards[leaderboards.length] = leaderboard2;
       leaderboards[leaderboards.length] = leaderboard3;
       return leaderboards;
    },

    // Admin

    out: function(value) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var result = Blockchain.transfer(this.admin, value * this._nasToWei());
            return result;
        }
        return true;
    },

    toUser: function(address, value) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var result = Blockchain.transfer(address, value * this._nasToWei());
            return result;
        }
        return true;
    },
    addCharacterClass: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this._addcharacterclass(data);
            return result;
        }
        return true;
    },
    addGoodClass: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this._addgoodclass(data);
            return result;
        }
        return true;
    },
    addSkill: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this._skill(data);
            return result;
        }
        return true;
    },
    updateHarvestMinutes: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.harvest_minutes = d;
            return result;
        }
        return true;
    },
    updateProtectionMinutes: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.protection_minutes = d;
            return result;
        }
        return true;
    },
    updateLogMaxLength: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.log_maxlength = d;
            return result;
        }
        return true;
    },
    updateSearchValue: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.search_value = d;
            return result;
        }
        return true;
    },
    updateMaxCityGuards: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.max_city_guards = d;
            return result;
        }
        return true;
    },
    updateAttackReputation: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.attack_reputation = d;
            return result;
        }
        return true;
    },
     updateSearchReputation: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.search_reputation = d;
            return result;
        }
        return true;
    },
    updateGoldRate: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.goldrate = d;
            return result;
        }
        return true;
    },
    updateFoodRate: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.foodrate = d;
            return result;
        }
        return true;
    },
    updateInitGoldRate: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.initgoldrate = d;
            return result;
        }
        return true;
    },
    updateInitFoodRate: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.initfoodrate = d;
            return result;
        }
        return true;
    },
    updateDropRate: function(data) {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            var d = JSON.parse(data);
            this.droprate = d;
            return result;
        }
        return true;
    }
}
module.exports = SanguoContract
