import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {

      path: '/dashboard',
      component: () => import('@/views/main/Index'),
      children: [
        // Dashboard
        ,{
          name: 'لوحة التحكم',
          path: '/Dashboard',
          component: () => import('@/views/main/Dashboard'),
          //component: () => import('@/views/Pages/Ideas/Ideas'),
        },
        {
          name: 'لوحة التحكم',
          path: '/StaticalChart',
          component: () => import('@/views/main/StaticalChart'),
        },
        {
          name: 'عرض تفاصيل التهديد',
          path: 'pages/APT/DisplayAPT',
          component: () => import('@/views/Pages/APT/PageDisplayAptDetails'),
        },
        {
          name: ' مجموعات التهديد ',
          path: 'pages/APT/SearchAPT',
          component: () => import('@/views/Pages/APT/PageDisplayAllApts'),
        },
        {
          name: 'تنبيه جديد',
          path: 'pages/Incidents/AddNotification',
          component: () => import('@/views/Pages/Incidents/PageAddNotification'),
        },
        {
          name: 'التفاصيل',
          path: 'pages/Incidents/DisplaySingleNotification',
          component: () => import('@/views/Pages/Incidents/PageDisplaySingleNotification'),
        },
        {
          name: 'سير العمل القسم',
          path: 'pages/Tasks/DepartmentTasks',
          component: () => import('@/views/Pages/Tasks/DepartmentTasks'),
        },
        {
          name: ' سجل الحادثة ',
          path: 'pages/Incidents/ViewIncidentComments',
          component: () => import('@/views/Pages/Incidents/ViewIncidentComments'),
        },
        {
          name: 'التنبيهات',
          path: 'pages/Incidents/DisplayIncidents',
          component: () => import('@/views/Pages/Incidents/PageDisplayNotifications'),
        },
        {
          name: 'تعديل تنبيه',
          path: 'pages/Incidents/PageEditNotification',
          component: () => import('@/views/Pages/Incidents/PageEditNotification'),
        },
        {
          name: 'الحوادث الأمنية',
          path: '/dashboard/pages/Incidents/DisplayIsIncidents',
          component: () => import('@/views/Pages/Incidents/PageDisplayIsIncident'),
        },
        {
          name: 'إدارة الصلاحيات',
          path: '/dashboard/pages/ManageRoles',
          component: () => import('@/views/Pages/Constants/Roles/PageManageRoles'),
        },
        {
          name: 'إضافة مجموعة ',
          path: 'pages/APT/AddApt',
          component: () => import('@/views/Pages/APT/PageAddApt'),
        },        
        {
          name: 'متابعة سير العمل',
          path: 'pages/tasks/AllTasksPage',
          component: () => import('@/views/Pages/Tasks/AllTasksManagment'),
        },
        {
          name: 'الوارد',
          path: 'pages/tasks/EmployeeTask',
          component: () => import('@/views/Pages/Tasks/InboxTask'),
        },
        {
          name: 'إغلاق النشاط',
          path: 'pages/tasks/closeTask',
          component: () => import('@/views/Pages/Tasks/CloseTaskReport'),
        },
        {
          name: 'إغلاق حادثة',
          path: 'pages/incidents/closeIncident',
          component: () => import('@/views/Pages/Incidents/CloseIncidentReport'),
        },
        {
          name: 'مجموعات المطورين',
          path: 'pages/APT/Display',
          component: () => import('@/views/Pages/APT/PageDisplayAptDetails'),
        },
        {
          name: 'المؤسسات',
          path: 'pages/Constants/Sectors',
          component: () => import('@/views/Pages/Constants/Sectors/PageManageSectors'),
        },
        {
          name: 'المهام',
          path: 'pages/tasks/manageTasks',
          component: () => import('@/views/Pages/Tasks/ManageOwnedTasks'),
        },

        {
          name: 'إضافة مهمة',
          props : true,
          path: 'pages/tasks/AddNewTask',
          component: () => import('@/views/Pages/Tasks/AddNewTask'),
        },
        {
          name: 'تعديل مهمة',
          props : true,
          path: 'pages/tasks/EditNewTask',
          component: () => import('@/views/Pages/Tasks/EditNewTask'),
        },
        {
          name: 'إسناد مهمة',
          props : true,
          path: 'pages/tasks/AddNewSubTask',
          component: () => import('@/views/Pages/Tasks/AddNewSubTask'),
        },
        {
          name: 'تفاصيل المهام',
          path: 'pages/tasks/TaskDetails',
          component: () => import('@/views/Pages/Tasks/DisplayTaskDetails'),
          props: true
        },
        {
          name: 'تقرير الإغلاق',
          path: 'pages/tasks/viewCloseReport',
          component: () => import('@/views/Pages/Tasks/ViewCloseReport'),
          props: true
        },
        {
          name: 'تقرير إغلاق حادثة',
          path: 'pages/incidents/viewCloseReport',
          component: () => import('@/views/Pages/Incidents/ViewCloseReport'),
          props: true
        },
        {
          name: 'الحالة',
          path: 'pages/Constants/Status',
          component: () => import('@/views/Pages/Constants/Status/PageManageType'),
        },
        {
          name: 'الأقسام',
          path: '/dashboard/pages/ManageDepartments',
          component: () => import('@/views/Pages/Constants/Departments/PageManageDepartments'),
        },
        {
          name: 'نظام التعرفة ',
          path: 'pages/RequsetId/viewMain',
          component: () => import('@/views/Pages/IP_Request/viewMain'),
        },
        {
          name: 'المعبيلة',
          path: 'pages/RequsetId/RequestId',
          component: () => import('@/views/Pages/IP_Request/RequestId'),
        },
        {
          name: 'soc',
          path: 'pages/RequsetId/Soc',
          component: () => import('@/views/Pages/IP_Request/Soc'),
        },
        {
          name: 'عرض العناوين',
          path: 'pages/RequsetId/DisplayAddress',
          component: () => import('@/views/Pages/IP_Request/DisplayAddress'),
        },
        {
          name: 'عرض التعرفة',
          path: 'pages/RequsetId/DisplayId',
          component: () => import('@/views/Pages/IP_Request/DisplayId'),
        },
        {
          name: 'اخطارات',
          path: 'pages/RequsetId/Notification',
          component: () => import('@/views/Pages/IP_Request/Notification'),
        },
        {
          name: ' الأفكار الابداعية',
          path: '/dashboard/pages/Ideas',
          component: () => import('@/views/Pages/Ideas/Ideas'),
        },
        {
          name: 'NotFoundPage',
          path: 'pages/notFound',
          component: () => import('@/views/components/NotFoundPage'),
        },
        {
          name: 'إعادة تعيين كلمة المرور',
          path: '/dashboard/Pages/ResetPassword',
          component: () => import('@/views/Pages/Constants/Departments/pageResetPassword'),
        },
        {
          name: 'إدارة تغيير كلمات المرور',
          path: '/dashboard/Pages/AdminResetPassword',
          component: () => import('@/views/Pages/Constants/Departments/pageAdminResetPassword'),
        },
        {
          name: 'الاعدادات',
          path: '/dashboard/pages/settings',
          component: () => import('@/views/Pages/settings'),
        },
        {
          name: 'تسجيل الخروج',
          path: '/dashboard/pages/Logout',
          component: () => import('@/views/Pages/Login/Logout'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/main/Main'),
    },
  ],
})
