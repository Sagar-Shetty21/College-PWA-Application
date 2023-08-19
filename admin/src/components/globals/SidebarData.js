import React from 'react';


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <i class="fa fa-home" aria-hidden="true"/>,
    iconClosed: <i class="fa-solid fa-sort-down" />,
    iconOpened: <i class="fa-solid fa-sort-up" />
  },
  {
    title: 'Post',
    path: '',
    icon: <i class="fa-solid fa-envelope"/>,
    iconClosed: <i class="fa-solid fa-sort-down" />,
    iconOpened: <i class="fa-solid fa-sort-up"/>,
    subNav: [
      {
        title: 'All Posts',
        path: '/post/all_posts',
        icon: <i class="fa-solid fa-clone"/>,
        cName: 'sub-nav'
      },
      {
        title: 'New Post',
        path: '/post/new_post',
        icon: <i class="fa-solid fa-square-plus"/>,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Manage Staffs',
    path: '',
    icon: <i class="fa-solid fa-person-chalkboard"/>,
    iconClosed: <i class="fa-solid fa-sort-down" />,
    iconOpened: <i class="fa-solid fa-sort-up"/>,
    subNav: [
      {
        title: 'Add staff',
        path: '/addstaff',
        icon: <i class="fa-solid fa-user-plus"/>,
        cName: 'sub-nav'
      },
      {
        title: 'Remove staff',
        path: '/removestaff',
        icon: <i class="fa-solid fa-user-minus"/>,
        cName: 'sub-nav'
      },
      /* {
        title: 'Edit staff',
        path: '/editstaff',
        icon: <i class="fa-solid fa-user-pen"/>
      } */
    ]
  },
  {
    title: 'Manage Students',
    path: '',
    icon: <i class="fa-solid fa-graduation-cap"/>,
    iconClosed: <i class="fa-solid fa-sort-down" />,
    iconOpened: <i class="fa-solid fa-sort-up"/>,
    subNav: [
      {
        title: 'Add student',
        path: '/addstudent',
        icon: <i class="fa-solid fa-user-plus"/>,
        cName: 'sub-nav'
      },
      {
        title: 'Remove student',
        path: '/removestudent',
        icon: <i class="fa-solid fa-user-minus"/>,
        cName: 'sub-nav'
      },
      /* {
        title: 'Edit student',
        path: '/editstudent',
        icon: <i class="fa-solid fa-user-pen"/>
      } */
    ]
  },
  {
    title: 'Queries',
    path: '',
    icon: <i class="fa-solid fa-clipboard-question"/>,
    iconClosed: <i class="fa-solid fa-sort-down" />,
    iconOpened: <i class="fa-solid fa-sort-up"/>,
    subNav: [
      {
        title: 'Active Queries',
        path: '/activequeries',
        icon: <i class="fa-brands fa-creative-commons-share"/>,
        cName: 'sub-nav'
      },
      {
        title: 'Resolved Queries',
        path: '/resolvedqueries',
        icon: <i class="fa-sharp fa-solid fa-circle-check"/>,
        cName: 'sub-nav'
      }
    ]
  }
];