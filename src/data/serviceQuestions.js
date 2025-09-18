export const serviceQuestions = {
  'Web Development': [
    { 
      id: 'type', 
      label: 'What kind of web development services?', 
      options: ['Building a website from scratch', 'Updating an existing website', 'Other']
    },
    {
      id: 'designs',
      type: 'radio',
      label: 'Do you already have designs?',
      options: ['No, I need custom design', 'No, but I\'m fine with using templates', 'Yes', 'Other']
    },
    {
      id: 'platform',
      type: 'checkbox',
      label: 'What platform are you using?',
      options: ['Custom solution', 'WordPress', 'Squarespace', 'Weebly', 'Drupal', 'I\'m not sure', 'Other']
    },
    {
      id: 'additional_help',
      type: 'checkbox',
      label: 'Is there anything else you need help with?',
      options: ['Hosting the site', 'Domain', 'Payment processor', 'Database development', 'I\'m not sure', 'Other']
    },
    {
      id: 'project_scope',
      type: 'radio',
      label: 'What is the scope of this project?',
      options: ['One time need', 'Ongoing', 'Other']
    },
    {
      id: 'timeline',
      type: 'radio',
      label: 'When do you need this project completed by?',
      options: ['This week', 'Within the next two weeks', 'Within the next month', 'Within the next two months', 'Other']
    }
  ],
   'Mobile Application Development': [
    {
      id: 'platform',
      type: 'checkbox',
      label: 'What platform do you need development for?',
      options: ['iOS', 'Android', 'Windows Mobile', 'Web application', 'Other']
    },
    {

    
      id: 'development_stage',
      type: 'radio',
      label: 'What stage of development are you in?',
      options: [
        'I\'m starting from scratch',
        'I have designs',
        'I have a prototype',
        'I have an app that needs debugging',
        'Other'
      ]
    },
    {
      id: 'project_scope',
      type: 'radio',
      label: 'What is the scope of this project?',
      options: ['One time need', 'Ongoing', 'Other']
    },

     {
      id: 'timeline',
      type: 'radio',
      label: 'When do you need this project completed by?',
      options: ['This week', 'Within the next two weeks', 'Within the next month', 'Within the next two months', 'Other']
    }
  ],

  'Custom Software Development': [
    {
      id: 'software_type',
      type: 'checkbox',
      label: 'What kind of custom software development?',
      options: ['Desktop / web application', 'iOS', 'Android', 'Other']
    },
    {
      id: 'project_type',
      type: 'checkbox',
      label: 'What type of project?',
      options: [
        'Social application',
        'Business application', 
        'Mobile commerce application',
        'Utility application',
        'Game',
        'Plug-in',
        'Other'
      ]
    },
    {
      id: 'development_stage',
      type: 'radio',
      label: 'What stage of development are you in?',
      options: [
        'I\'m starting from scratch',
        'I have designs',
        'I have a prototype',
        'I have an app that needs debugging',
        'Other'
      ]
    },
    {
      id: 'project_scope',
      type: 'radio',
      label: 'What is the scope of this project?',
      options: ['One time project', 'On-going', 'Other']
    },
    {
      id: 'timeline',
      type: 'radio',
      label: 'When do you need this completed by?',
      options: [
        'This week',
        'Within the next two weeks',
        'Within the next month',
        'Within the next two months',
        'Other'
      ]
    }
    ],
    'Application Development': [
  {
    id: 'application_type',
    type: 'checkbox',
    label: 'What kind of application development services?',
    options: ['Desktop / web application', 'iOS', 'Android', 'Other']
  },
  {
    id: 'project_type',
    type: 'radio',
    label: 'What type of project?',
    options: [
      'Social application',
      'Business application', 
      'Mobile commerce application',
      'Utility application',
      'Game',
      'Plug-in',
      'Other'
    ]
  },
  {
    id: 'development_stage',
    type: 'radio',
    label: 'What stage of development are you in?',
    options: [
      'I\'m starting from scratch',
      'I have designs',
      'I have a prototype',
      'I have an app that needs debugging',
      'Other'
    ]
  },
  {
    id: 'project_scope',
    type: 'radio',
    label: 'What is the scope of this project?',
    options: ['One time project', 'On-going', 'Other']
  },
  {
    id: 'timeline',
    type: 'radio',
    label: 'When do you need this completed by?',
    options: [
      'This week',
      'Within the next two weeks',
      'Within the next month',
      'Within the next two months',
      'Other'
    ]
  }
],
'Cloud Management': [
  {
    id: 'management_type',
    type: 'checkbox',
    label: 'What type of cloud management?',
    options: [
      'Access to team users',
      'Performance monitoring',
      'Security / compliance auditing and management',
      'Disaster recovery and contingency plans',
      'I\'m not sure',
      'Other'
    ]
  },
  {
    id: 'cloud_service',
    type: 'checkbox',
    label: 'What cloud management service are you using?',
    options: ['VMware', 'Red Hat', 'Amazon Web Services', 'Microsoft WMM', 'Other']
  },
  {
    id: 'business_size',
    type: 'radio',
    label: 'If this is for a business, what is the size of your business?',
    options: [
      'Individual',
      '< 10 employees',
      '10 - 50 employees',
      '50 - 200 employees',
      '200 - 500 employees',
      '500+ employees'
    ]
  },
  {
    id: 'project_scope',
    type: 'radio',
    label: 'What is the scope of this project?',
    options: ['One time project', 'On-going', 'Other']
  },
  {
    id: 'timeline',
    type: 'radio',
    label: 'When do you need this completed by?',
    options: [
      'This week',
      'Within the next two weeks',
      'Within the next month',
      'Within the next two months',
      'Other'
    ]
  }
]
}