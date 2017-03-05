// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage'])

.run(function($ionicPlatform, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  if (!$localStorage.customSets) {
    $localStorage.customSets = []
  }

  if ($localStorage.courses) return

  $localStorage.courses = [
    {
      name: 'Bachelor of Science in Accountancy',
      acronym: 'BSA',
      logo: '',
      subjects: [
        {
          name: 'Accounting Terminologies',
          questions: [
            {
              question: 'A person who trained to prepare and maintain financial records.',
              answer: 'Accountant'
            },
            {
              question: 'A chronological record of business transactions.',
              answer: 'Journal'
            },
            {
              question: 'Total assets minus total liabilities. Is seldom the true value of a company',
              answer: 'Net worth'
            },
            {
              question: 'It shows the amount of money owed for goods or services received.',
              answer: 'Invoice'
            },
            {
              question: 'A quantitative summary of a company\'s financial condition at a specific point in time, including assets, liabilities and net worth.',
              answer: 'Balance Sheet'
            },
            {
              question: 'Any item of economic value owned by an individual or corporation, especially that which could be converted to cash. Examples are cash, securities, accounts receivable, inventory, office equipment, real estate, a car, and other property',
              answer: 'Asset'
            },
            {
              question: 'An obligation that legally binds a company to settle a debt. When one is liable for a debt, they are responsible for paying the debt.',
              answer: 'Liability'
            },
            {
              question: 'The total amount of money received by the company for goods sold or services provided during a certain time period.',
              answer: 'Revenue'
            },
            {
              question: 'Any cost of doing business resulting from revenue-generating activities.',
              answer: 'Expenses'
            }
          ]
        },
        {
          name: 'Taxation',
          questions: [
            {
              question: 'In some cases, assessment year and previous year can be same financial year.',
              answer: 'a',
              choices: {
                a: 'true',
                b: 'false'
              }
            },
            {
              question: 'Body of individual should consist of',
              answer: 'a',
              choices: {
                a: '3%',
                b: '5%',
                c: '2.5%'
              }
            },
            {
              question: 'Income tax is rounded off to',
              answer: 'a',
              choices: {
                a: 'Nearest ten rupees',
                b: 'Nearest one rupee',
                c: 'No rounding off of tax is done'
              }
            },
            {
              question: 'Residential status to be determined for',
              answer: 'a',
              choices: {
                a: 'Previous year',
                b: 'Assessment year',
                c: 'Accounting year'
              }
            },
            {
              question: 'Incomes which accrue or arise outside India but are received directly into India are taxable in case of',
              answer: 'd',
              choices: {
                a: 'Resident only',
                b: 'Both ordinarily resident and NOR',
                c: 'Non-resident',
                d: 'All the assesses'
              }
            },
            {
              question: 'Income deemed to accrue or arise in India is taxable in case of',
              answer: 'd',
              choices: {
                a: 'Resident only',
                b: 'Both ordinarily resident and NOR',
                c: 'Non-resident',
                d: 'All the assesses'
              }
            },
            {
              question: 'Income which accrue outside India from a business controlled from India is taxable in case of',
              answer: 'c',
              choices: {
                a: 'Resident only',
                b: 'Not ordinarily resident only',
                c: 'Both ordinarily resident and NOR',
                d: 'Non-resident'
              }
            },
            {
              question: 'Income which accrue or arise outside India and also received outside India taxable in case of',
              answer: 'a',
              choices: {
                a: 'Resident only',
                b: 'Not ordinarily resident',
                c: 'Both ordinarily resident and NOR',
                d: 'None of the above'
              }
            },
            {
              question: 'Agricultural income is exempt provided the',
              answer: 'a',
              choices: {
                a: 'Land is situated in India',
                b: 'Land is situated in any rural area India',
                c: 'Land is situated whether in India or outside India'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Bachelor of Science in Elementary Education',
      acronym: 'BEED',
      logo: '',
      subjects: [
        {
          name: 'Literature',
          questions: [
            {
              question: 'The part of the  plot that develops the conflict adding problems or increasing the readers interest',
              answer: 'Rising Action'
            },
            {
              question: 'This is the turning point of the story. The conflict or struggle that the main character has with an opposing person or force',
              answer: 'Climax'
            },
            {
              question: 'The story message. The big idea what the story is primarily about',
              answer: 'Theme'
            },
            {
              question: '19-lined poem consisting of 5 tercets of aba rhyme scheme and a quatrain abaa rhyme scheme. The 1st and 3rd lines of stanza one are repeated throughout the poem',
              answer: 'Villanelle'
            },
            {
              question: 'A fictional story, in prose or verse, that features animals, mythical creatures, plants, inanimate objects or forces of nature which are given human qualities, such as verbal communication, and that illustrates or leads to a moral lesson',
              answer: 'Fable'
            },
            {
              question: ' Who wrote "Where ignorance is bliss, it is folly to be wise"?',
              answer: 'Shakespeare'
            },
            {
              question: 'In which century were Geoffrey Chaucer\'s Canterbury Tales written?',
              answer: '14th'
            },
            {
              question: 'What nationality was Robert Louis Stevenson, writer of "Treasure Island"?',
              answer: 'Scottish'
            },
            {
              question: 'How many lines do a Sonnet have?',
              answer: '14'
            },
            {
              question: 'Name the book which opens with the line "All children, except one grew up"',
              answer: 'Peter Pan'
            }
          ]
        },
        {
          name: 'Social Science',
          questions: [
            {
              question: 'In which organization is the Philippines a member to fight communist aggression?',
              answer: 'SEATO'
            },
            {
              question: 'The theory that population increases by geometrical ratio while the means of subsistence increases by arithmetical ratio is attributed to?',
              answer: 'Robert Malthus'
            },
            {
              question: 'Which part of Asia does the Arabian peninsula occupy?',
              answer: 'Southwest'
            },
            {
              question: 'To govern is to rule and the government rules by laws. Whose main duty is the enforcement of laws?',
              answer: 'Executive department'
            },
            {
              question: 'The term that refers to the class of Filipinos who were free and independent',
              answer: 'Timawa'
            },
            {
              question: 'Which economic system is based on free enterprise?',
              answer: 'Capitalism'
            },
            {
              question: 'How is the so-called colonial mentality manifested?',
              answer: 'Xenocentrism'
            },
            {
              question: 'Which is a safeguard against unfair trade practices like short-weighing?',
              answer: 'Consumer vigilance'
            },
            {
              question: 'In which continent can we find stormy Cape Horn which is known as the graveyard of ships and sailors?',
              answer: 'South America'
            },
            {
              question: 'Nebuchadnezzar was to the Babylonian Empire as Asoka was to the ______ Empire.',
              answer: 'Maurya'
            }
          ]
        }
      ]
    },
    {
      name: 'Bachelor of Science in Education',
      acronym: 'BSED',
      logo: '',
      subjects: [
        {
          name: 'Oral Communication',
          questions: [
            {
              question: 'Identifying bad thoughts and fixing them.',
              answer: 'Cognitive Restructuring'
            },
            {
              question: 'Selecting, organizing, and interpreting information to give meaning to our communication and lives',
              answer: 'Perception'
            },
            {
              question: 'The process of sending and recieving messages',
              answer: 'Communication'
            },
            {
              question: 'Analyzes and interprets, translates words into meaning, feelings and emotions, decodes',
              answer: 'Recievers'
            }
            ,{
              question: 'Create messages, determines meanings, encodes, reacts to feedback',
              answer: 'Senders'
            }
            ,{
              question: 'The process of communication in which message or information is exchanged or communicated within sender and receiver through the word of mouth.',
              answer: 'Oral communication'
            }
            ,{
              question: 'Formal written or an oral statement that contains notification or warning about a fact or an invitation to the concerned person for attending the meeting',
              answer: 'Notice'
            }
            ,{
              question: 'An item or issues prepared by the secretary and which are to be discussed or transacted in a forth coming meeting.',
              answer: 'Agenda'
            }
            ,{
              question: 'The oral expression between two or more person about the knowledge, ideas, viewpoints and emotions through oral words.',
              answer: 'Talking'
            }
            ,{
              question: 'A situation in which two or more people meet together for formal group discussion about a specific problem, issues, predetermined topic.',
              answer: 'Meeting'
            }
          ]
        },
        {
          name: 'Linguistics',
          questions: [
            {
              question: 'The study of the relationship between words and meanings',
              answer: 'Semantics'
            },
            {
              question: 'An auxiliary language, generally of a hybrid and partially developed nature, that is employed over an extensive area by people speaking',
              answer: 'Lingua France'
            },
            {
              question: 'The study and classification of speech sounds.',
              answer: 'Phonetics'
            },
            {
              question: 'The scientific study of language and its structure.',
              answer: 'Linguistics'
            },
            {
              question: 'The study of language in relation to social factors, including differences of regional, class, and occupational dialect, gender differences, and bilingualism',
              answer: 'Sociolinguistics'
            },
            {
              question: 'The branch of linguistics that deals with systems of sounds (including or excluding phonetics), especially in a particular language',
              answer: 'Phonology'
            },
            {
              question: 'The study of the forms of things, in particular',
              answer: 'Morphology'
            },
            {
              question: 'The set of rules, principles, and processes that govern the structure of sentences in a given language, specifically word order.',
              answer: 'Syntax'
            },
            {
              question: 'The branch of linguistics dealing with language in use and the contexts in which it is used, including such matters as deixis, taking turns in conversation, text organization, presupposition, and implicature',
              answer: 'Pramatics'
            },
            {
              question: 'Any of the perceptually distinct units of sound in a specified language that distinguish one word from another, for example p, b, d, and t in the English words pad, pat, bad, and bat.',
              answer: 'Phonemes'
            }
          ]
        }
      ]
    },
    {
      name: 'Senior High School',
      acronym: 'SHS',
      logo: '',
      subjects: [
        {
          name: 'Physical Science',
          questions: [
            {
              question: 'A logical interpretation based on prior knowledge and observation',
              answer: 'Inference'
            },
            {
              question: 'Anything that has mass and takes up space',
              answer: 'Matter'
            },
            {
              question: 'A measure of the amount of matter in an object',
              answer: 'Mass'
            },
            {
              question: 'The mass of air surrounding a planet',
              answer: 'Atmosphere'
            },
            {
              question: 'The average mass (in atomic mass units, u) of an atom of the element in naturally occurring samples.',
              answer: 'Atomic Mass'
            },
            {
              question: 'A substance that gives hydrogen ions (or hydronium ions) in water.',
              answer: 'Acid'
            },
            {
              question: 'The distance traveled divided by the time to travel that distance.',
              answer: 'Average Speed'
            },
            {
              question: 'The transfer of heat through mass movement.',
              answer: 'Convection'
            },
            {
              question: 'Organic compounds that contain multiple hydroxyl groups in their molecular structure. A basic component of living matter.',
              answer: 'Carbohydrates'
            },
            {
              question: 'Organic compounds that contain multiple hydroxyl groups in their molecular structure. A basic component of living matter.',
              answer: 'Carbohydrates'
            }
          ]
        },
        {
          name: 'Komunikasyon at Pananaliksik sa Wika at Kulturang Filipino',
          questions: [
            {
              question: 'Pag-aaral ng kasaysayan ng mga salita',
              answer: 'Etimolohiya'
            },
            {
              question: '"Ang wika ay masistemang balangkas ng sinasalitang tunog na pinipili at isinasaayos sa paraang arbitraryo upang magamit ng mga taong kabilang sa kultura."',
              answer: 'Henry Gleason'
            },
            {
              question: 'Bunga ng lokasyon o heograpiya.',
              answer: 'Diyalekto'
            },
            {
              question: 'Nakagawiang pamamaraan sa pagsasalita ng isang indibidwal o pangkat ng mga tao',
              answer: 'Idyolek'
            },
            {
              question: 'Tawag sa barayti ng wika na bunga ng natamong edukasyon, trabaho, grupo sosyo-ekonomiko, kaanak, kasarian at iba pa',
              answer: 'Sosyolek'
            },
            {
              question: 'Isang bahagi ng pakikipagtalastasan. Kalipunan ito ng mga simbolo,tunog, at mga kaugnay na batas upang maipahayag ang nais sabihin ng kaisipan.',
              answer: 'Wika'
            },
            {
              question: 'tumutukoy sa aktibidad ng sangkatauhan',
              answer: 'Kultura'
            },
            {
              question: 'Ang pag-aaral ng kasaysayan ng mga salita at kung paano nag-iba ang kanilang anyo at ibig sabihin sa paglipas ng panahon.',
              answer: 'Etimolohiya'
            },
            {
              question: 'Isang pagpapahayag na ang kahulugan ay hindi komposisyunal ï¿½ sa ibang salita, hindi binubuo ng tumpak na kahulugan ang mga kanya-kanyang salita na nabuo. Ito ay di-tuwirang pagbibigay kahulugan at pagpapakita ng kaisipan at kaugalian ng isang lugar.',
              answer: 'Idyoma'
            },
            {
              question: 'Paghahambing o ng dalawang tao, bagay, pangyayari, hayop, at iba pa.',
              answer: 'Simili'
            }
          ]
        }
      ]
    }
  ]
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.courses', {
    url: '/courses',
    views: {
      'menuContent': {
        templateUrl: 'templates/courses.html',
        controller: 'CoursesCtrl'
      }
    }
  })

  .state('app.createset', {
    url: '/createset',
    views: {
      'menuContent': {
        templateUrl: 'templates/create-set.html',
        controller: 'CreateSetCtrl'
      }
    }
  })

  .state('app.mysets', {
    url: '/mysets',
    views: {
      'menuContent': {
        templateUrl: 'templates/my-sets.html',
        controller: 'MySetsCtrl'
      }
    }
  })

  .state('app.editsets', {
    url: '/mysets/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/create-set.html',
        controller: 'CreateSetCtrl'
      }
    }
  })

  .state('app.subjects', {
    url: '/subjects/:courseName',
    views: {
      'menuContent': {
        templateUrl: 'templates/subjects.html',
        controller: 'SubjectsCtrl'
      }
    }
  })

  .state('app.subject', {
    url: '/subjects/:courseName/:subjectName',
    views: {
      'menuContent': {
        templateUrl: 'templates/subject.html',
        controller: 'SubjectCtrl'
      }
    }
  })

  .state('app.review', {
    url: '/review/:courseName/:subjectName',
    views: {
      'menuContent': {
        templateUrl: 'templates/review.html',
        controller: 'ReviewCtrl'
      }
    }
  })

  .state('app.quiz', {
    url: '/quiz/:courseName/:subjectName',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz.html',
        controller: 'QuizCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/courses');
});
