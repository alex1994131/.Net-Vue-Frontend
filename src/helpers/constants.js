const RESPONSES = {
    SUCCESS_RESPONSE: 200,
    FAILUR_RESPONSE: 2,
    CONNECTION_ISSUE: 3,
    AUTHORISED_USER: 4,
    UN_AUTHORISED_USER: 5,
    VALID_TOKEN: 6,
    INVALID_TOKEN: 7,
}
const MESSAGES = {
    ERROR : false, 
    SUCCESS : true,
    CONNECTION_ERROR : "تعذر الوصول الى الخادم",
    UNAUTHORISED_USER : "رقم المرور/اسم المستخدم غير صحيح",
    SAVING_ERROR : "حدثت مشكلة أثناء الحفظ",
    SAVING_SUCCESS : "تم الحفظ بنجاح"
}

const PERMISSION = {
    NOTIFICATIONS: {
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة تنبيه"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "استعراض التنبيهات"},
        SEARCH: { name : "SEARCH" , label : 'بحث' , desc : "بحث في التنبيهات"},
        DETAILS: { name : "DETAILS" , label : 'التفاصيل' , desc : "الولوج إلى التفاصيل"},
        COMMENTS: { name : "COMMENTS" , label : ' التعليقات' , desc : "استعراض و اضافة التعليقات"},
        IGNORE: { name : "IGNORE" , label : 'تجاهل التنبيه' , desc : "أرشفة التنبيه في قاعدة البيانات"},
        CLOSE: { name : "CLOSE" , label : 'إغلاق الحادثة' , desc : "الإنتهاء من العمل على الحادثة "},
        SIGN_AS_INCIDENT:{ name : "SIGN_AS_INCIDENT" , label : 'تغيير إلى حادث' , desc : "تغيير حالة التنبيه إلى حادثة أمنية"},
        ASSIGN_TASK:  { name : "ASSIGN_TASK" , label : 'المهام المتعلقة' , desc : "إضافة مهمة متعلقة"},
        ASSIGN_NEW_REQUEST :{ name : "ASSIGN_NEW_REQUEST" , label : 'إضافة' , desc : "إضافة طلب تعريف"},
    },
    INCIDENTS: {
        STATUS: { name : "STATUS" , label : 'إضافة' , desc : "تحويل إلى حادث"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "استعراض الحوادث"},
        SEARCH: { name : "SEARCH" , label : 'بحث' , desc : "بحث في الحوادث"},
        DETAILS: { name : "DETAILS" , label : 'التفاصيل' , desc : "الولوج إلى التفاصيل"},
        COMMENTS: { name : "COMMENTS" , label : ' التعليقات' , desc : "استعراض و اضافة التعليقات"},
        CLOSE: { name : "CLOSE" , label : 'إغلاق الحادثة' , desc : "الإنتهاء من العمل على الحادثة "},
        ASSIGN_TASK:  { name : "ASSIGN_TASK" , label : 'المهام المتعلقة' , desc : "إضافة مهمة متعلقة"},
    },
    IP_IDENTITFICATION : {
        NEW_REQUEST :{ name : "NEW_REQUEST" , label : 'إضافة' , desc : "إضافة طلب تعريف"},
        VARFIY :  { name : "VARFIY" , label : 'تعريف الطلبات' , desc : "إمكانية إعتماد تعريف الطلبات"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض طلبات التعريف"},
        SEARCH: { name : "SEARCH" , label : 'بحث' , desc : "بحث في طلبات التعريف"},
    },
    TASKS : {
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة مهمة"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض المهام"},
        SEARCH: { name : "SEARCH" , label : 'بحث' , desc : "بحث في المهام"},
        CLOSE: { name : "CLOSE" , label : 'إغلاق' , desc : "إغلاق المهمة"},
        DETAILS: { name : "DETAILS" , label : 'التفاصيل' , desc : "إستعراض تفاصيل المهام"},
        COMMENTS: { name : "COMMENTS" , label : 'التعليقات' , desc : "إستعراض وإضافة تعليقات"},
        ASSIGN_SUB_TASK:  { name : "ASSIGN_SUB_TASK" , label : 'إضافة مهمة متعلقة' , desc : "مهمة جديدة مرتبطة"},
    },
    APT : { 
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة مجموعة APT"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض مجموعات APT"},
        SEARCH: { name : "SEARCH" , label : 'بحث' , desc : "بحث في مجموعات APT"},
        COMMENTS: { name : "COMMENTS" , label : 'التعليقات' , desc : "إستعراض وإضافة تعليقات"},
        APPROVE :  { name : "APPROVE" , label : 'موافقة التغييرات' , desc : "إمكانية إعتماد التغييرات في مجموعات APT"}, 
    },
    DASHBOARD : {
        SHOW_ALL_Tasks: { name : "SHOW_ALL_Tasks" , label : 'إستعراض كل المهام' , desc : "إستعراض كل المهام"},
        view:  { name : "view" , label : 'عرض' , desc : "إستعراض لوحة التحكم"}, 
    },
    ALL_TASKS: {
        SHOW_ALL_Tasks: { name : "ALL_TASKS" , label : 'إستعراض كل المهام' , desc : "إستعراض كل المهام"},
    },
    SECTORS : {
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة قطاعات ومؤسسات"},
        MANAGE: { name : "MANAGE" , label : 'تعديل' , desc : "تعديل القطاعات والمؤسسات"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض القطاعات والمؤسسات"},
        DELETE: { name : "DELETE" , label : 'حذف' , desc : "حذف قطاعات ومؤسسات"},
    },
    USERS : {
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة مستخدم"},
        MANAGE: { name : "MANAGE" , label : 'تعديل' , desc : "تعديل المستخدمين"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض المستخدمين"},
        DELETE: { name : "DELETE" , label : 'حذف' , desc : "حذف مستخدم"},
        ACTIVATE_DEACTIVATE: { name : "ACTIVATE_DEACTIVATE" , label : 'تفعيل/ تعطيل' , desc : " تفعيل وتعطيل المستخدمين"}

    },
    INBOX : {
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض البريد الوارد"},
        CLOSE: { name : "CLOSE" , label : 'غلق' , desc : "غلق البريد"},
    },
    STATUS :{
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة حالة جديدة"},
        MANAGE: { name : "MANAGE" , label : 'تعديل' , desc : "تعديل الحالات"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض الحالات"},
        DELETE: { name : "DELETE" , label : 'حذف' , desc : "حذف الحالات"},
    },

    MANAGE_ROLES :{
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة صلاحيات"},
        VIEW: { name : "VIEW" , label : 'استعراض' , desc : "إستعراض الصلاحيات"},
        MANAGE_ALL: { name : "MANAGE_ALL" , label : 'إدارة الصلاحيات' , desc : "إدارة جميع الصلاحيات"},
        MANAGE_DEPARTMENT: { name : "MANAGE_DEPARTMENT" , label : 'إدارة صلاحيات الأقسام' , desc : "إدارة صلاحيات القسم"},
    },
    RESET_PASSWORD :{
        UPDATE: { name : "UPDATE" , label : 'تغيير' , desc : "نغيير كلمة المرور"},

    },
    ADMIN_RESET_PASSWORD :{
        ADD: { name : "ADD" , label : 'إضافة' , desc : "إضافة صلاحيات"},

    },


}

const concatunate = function(arr){
    let values = [];
    arr.forEach(ar => {
        Object.values(ar).forEach(v => values.push(v))
    })

    return values;
}
const PAGES = {
    ALL_TASKS: {name : "ALL_TASKS" , label : "متابعة سير العمل" ,icon:"mdi-shape", pers :concatunate([PERMISSION.ALL_TASKS])},
    APTS: {name : "APTS" , label : "التهديد المستمر" ,icon:"mdi-archive", pers :concatunate([PERMISSION.APT])},
    TASKS: {name : "TASKS" , label : "إدارة المهام" ,icon:"mdi-text-box-check", pers :concatunate([PERMISSION.TASKS])},
    INBOX: {name : "INBOX" , label : "الوارد" ,icon:"mdi-bell-ring", pers : concatunate([PERMISSION.INBOX])},
    DASHBOARD: {name : "DASHBOARD" , label : "لوحة التحكم" ,icon:"mdi-view-dashboard", pers :concatunate([PERMISSION.DASHBOARD])},
    MANAGE_USERS: {name : "MANAGE_USERS" , label : "إدارة المستخدمين" ,icon:"mdi-account-multiple-plus-outline", pers :concatunate( [PERMISSION.USERS])},
    NOTIFICATIONS: {name : "NOTIFICATIONS" , label : "التنبيهات" ,icon:"mdi-alert", pers : concatunate([PERMISSION.NOTIFICATIONS])},
    INCIDENTS: {name : "INCIDENTS" , label : "الحوادث الأمنية" ,icon:"mdi-shield", pers :concatunate([PERMISSION.INCIDENTS])},
    MANAGE_STATUS: {name : "MANAGE_STATUS" , label : "إدارة الحالة" ,icon:"mdi-clock",pers : concatunate([PERMISSION.STATUS])},
    MANAGE_ROLES: {name : "MANAGE_ROLES" , label : "إدارة الصلاحيات" ,icon:"mdi-account-edit",pers : concatunate([PERMISSION.MANAGE_ROLES])},
    MANAGE_SECTORS: {name : "MANAGE_SECTORS" , label : "إدارة القطاعات" ,icon:"mdi-server", pers : concatunate([PERMISSION.SECTORS])},
    IP_IDENTITFICATION: { name : "IP_IDENTITFICATION" , label : "تعريف الآي بي" ,icon:"mdi-plus-network", pers : concatunate([PERMISSION.IP_IDENTITFICATION])},
    RESET_PASSWORD: {name : "RESET_PASSWORD" , label : "تغيير كلمة المرور" ,icon:"mdi-account-key", pers :concatunate([PERMISSION.RESET_PASSWORD])},
    ADMIN_RESET_PASSWORD: {name : "ADMIN_RESET_PASSWORD" , label : "إدارة كلمات المرور" ,icon:"mdi-key", pers :concatunate([PERMISSION.ADMIN_RESET_PASSWORD])},
    //STATICALCHART :{name : "STATICALCHART" , label : "STATICALCHART" ,icon:"mdi-view-dashboard", pers :concatunate([PERMISSION.STATICALCHART])},
    
}
export { RESPONSES, MESSAGES , PAGES , PERMISSION }; 