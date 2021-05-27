

let STATUS = {
    NOTIFICATION : {
        OPEN_NOTIFICATION: 10,
        CLOSED_NOTIFICATION: 12,
        IGNORED_NOTIFICATION: 11,
        CLOSED_INCIDENT: 9,
        INCIDENT: 8,
        EDIT_INCIDENT : 16
    }
    ,
    TASK : {
        OPEN: 5,
        IN_PROGRESS: 3,
        CLOSED: 4,
    },
}
let ENTITY_TYPE =  {
    TASK :  1,
    INCIDENT : 2 ,
    COMMENT : 4
}

export { STATUS , ENTITY_TYPE }; 