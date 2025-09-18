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
  ]
}