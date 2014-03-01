package org.progress.fm.logic;

public class DbFields {

    public class APARTAMENTS {

        public final static String ID = "id";
        public final static String APPROVED = "IsApproved";
        public final static String DELETED = "deleted";
        public final static String ROOMS = "rooms";
    }

    public class WORKERS {

        public final static String ID = "id";
        public final static String EMAIL = "email";
    }

    public class APARTAMENTS_PHOTO {

        public final static String APARTAMENTS_ID = "ApartamentsId";
    }

    public class CALLS {

        public final static String ID = "id";
        public final static String DATE = "date";
        public final static String APARTAMENTSID = "apartamentId";
    }

    public class NEWS {

        public final static String ID = "id";
        public final static String LASTMODIFY = "lastModify";
        public final static String DELETED = "deleted";
    }

    public class ANNOUNCEMENTSCALLS {

        public final static String ID = "id";
        public final static String DATE = "creationDate";
        public final static String ANNOUNCEMENTSID = "announcementsId";
    }

    public class ANNOUNCEMENTS {

        public final static String ID = "id";
        public final static String STREETS = "street";
        public final static String HOUSENUMBER = "houseNumber";
        public final static String ROOMS = "rooms";
        public final static String FLOOR = "floor";
        public final static String FLOORS = "floors";
        public final static String PHONE = "phone";
        public final static String DESCRIPTION = "description";
        public final static String IDWORKER = "idWorker";
        public final static String CREATIONDATE = "creationDate";
        public final static String DELETED = "deleted";
    }

    public class ANNOUNCEMENTSRENT {

        public final static String ID = "id";
        public final static String STREETS = "street";
        public final static String HOUSENUMBER = "houseNumber";
        public final static String ROOMS = "rooms";
        public final static String FLOOR = "floor";
        public final static String FLOORS = "floors";
        public final static String PHONE = "phone";
        public final static String DESCRIPTION = "description";
        public final static String IDWORKER = "idWorker";
        public final static String CREATIONDATE = "creationDate";
        public final static String DELETED = "deleted";
    }

    public class ANNOUNCEMENTSRENTCALLS {

        public final static String ID = "id";
        public final static String DATE = "creationDate";
        public final static String ANNOUNCEMENTSID = "announcementsRentId";
    }

    public class PLANNER {

        public final static String ID = "id";
        public final static String TASKTYPE = "taskType";
        public final static String CREATIONDATE = "creationDate";
        public final static String TASKDATE = "taskDate";
        public final static String IDWORKER = "idWorker";
        public final static String DELETED = "deleted";
    }
    
    public class CUSTOMERSRENT {
        public final static String DELETED = "deleted";
        public final static String ASSIGNED = "assigned";
        public final static String IDWORKER = "idWorker";
        public final static String CREATIONDATE = "creationDate";
        public final static String STATUS = "status";
    }
    
    public class HELPDESK {
        public final static String DELETED = "deleted";
    }
}
