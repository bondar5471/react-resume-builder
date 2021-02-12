const stackSelector = category => {
  switch (category) {
    case 'Programming Languages':
      return [
        'Ruby',
        'PHP',
        'JS',
        'GO',
        'TypeScript',
        'C',
        'C++',
        'C#',
        'Java',
        'Kotlin',
        'Dart',
        'Python',
        'Swift',
        'R',
        'Scala',
        'Rust',
        'Perl',
      ];
    case 'Ruby':
      return ['Ruby on Rails', 'Sinatra', 'Hanami'];
    case 'JavaScript':
      return [
        'jQuery',
        'jQuery UI',
        'VueJS',
        'React',
        'Angular',
        'EmberJS',
        'NodeJS',
        'BackboneJS',
      ];
    case 'PHP':
      return ['Laravel', 'Symfony', 'Yii', 'Phalcon', 'Zend Framework', 'CakePHP', 'CodeIgnite'];
    case 'Testing Tools':
      return ['MiniTest', 'RSpec', 'Jest', 'Capybara', 'Cucumber', 'WebMock', 'Faker', 'Test-unit'];
    case 'Databases':
      return [
        'MySQL',
        'PostgreSQL',
        'Oracle',
        'MongoDB',
        'Redis',
        'SQLite',
        'Cassandra',
        'MariaDB',
        'Amazon DynamoDB',
        'Amazon Aurora',
      ];
    case 'Responsive design':
      return [
        'HTML5',
        'CSS',
        'Twitter Bootstrap',
        'Semantic UI',
        'Material UI',
        'Bulma',
        'Cascade',
        'Gumby',
        'Siimple',
        'Skeleton',
        'Foundation',
      ];
    case 'CSS':
      return ['LESS', 'SASS'];
    case 'Version Control Systems':
      return ['GitHub', 'GitLab', 'AWS CodeCommit', 'Mercurial', 'Apache Subversion'];
    case 'Virtualization':
      return ['Docker'];
    case 'Cloud Platforms':
      return [
        'AWS',
        'Google Cloud Platform',
        'Microsoft Azure',
        'DigitalOcean',
        'IBM Bluemix',
        'Heroku',
      ];
    case 'Tools':
      return ['GitLab CI', 'TravisCI', 'Jenkins', 'Circle CI'];
    default:
      return [];
  }
};

export { stackSelector };
