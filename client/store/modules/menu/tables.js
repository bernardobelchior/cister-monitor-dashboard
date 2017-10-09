import lazyLoading from './lazyLoading'

export default {
  name: 'Tables',
  meta: {
    icon: 'fa-table',
    expanded: false
  },

  children: [{
      name: 'BasicTables',
      path: '/tables/basic',
      meta: {
        label: 'Basic Tables',
        link: 'tables/Basic.vue'
      },
      component: lazyLoading('tables/Basic')
    },
    {
      name: 'Most Recent Measurements',
      path: '/tables/measurements',
      meta: {
        label: 'Measurements',
        link: 'tables/Measurements.vue'
      },
      component: lazyLoading('tables/Measurements')
    }
  ]
}
