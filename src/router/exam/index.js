let router = [
  {
    path: '/index/exam/index',
    name: 'exam',
    component: () =>
      import ('@/pages/exam/index')
  },
    {
        path: '/index/exam/addExam',
        name: 'addExam',
        component: () =>
            import ('@/pages/exam/addExam')
    },
    {
        path: '/index/exam/exam_config',
        name: 'exam_config',
        component: () =>
            import ('@/pages/exam/exam_config')
    }
];
export default router;
