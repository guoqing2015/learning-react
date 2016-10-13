 var port = process.env.PORT || 3000;

var lessons = [
  "02 - React Fundamentals - Hello World - First Component",
  "03 - React Fundamentals - The Render Method",
  "04 - React Fundamentals - Introduction to Properties",
  "05 - React Fundamentals - State Basics",
  "06 - React Fundamentals - Owner Ownee Relationship",
  "07 - React Fundamentals - Using Refs to Access Components",
  "08 - React Fundamentals - Accessing Child Properties",
  "09 - React Fundamentals - Component Lifecycle - Mounting Basics",
  "10 - React Fundamentals - Component Lifecycle - Mounting Usage",
  "11 - React Fundamentals - Component Lifecycle - Updating",
  "12 - React Mixins",
  "13 - React Fundamentals - Composable Components",
  "14 - React Fundamentals - Dynamically Generated Components"


  // "07-child-properties",
   // "04 Properties"
]

var entry = {}
lessons.forEach(function(lesson){
  var lessonKey = lesson.replace(/ /g, '%20');
  entry[lessonKey] = './lessons/' + lesson + '/main.js'
})

module.exports = {
  entry: entry,
  output: {
    path: './lessons/',
    filename: "[name]/index.js",
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: './lessons/',
    port: port
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};



// module.exports = {
//   entry: {
//     "07-child-properties": './lessons/07-child-properties/main.js',
//     "04%20Properties": './lessons/04 Properties/main.js',

//   },
//   output: {
//     path: './lessons/',
//     filename: "[name]/index.js",
//     publicPath: '/'
//   },
//   devServer: {
//     inline: true,
//     contentBase: './lessons/',
//     port: port
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel',
//         query: {
//           presets: ['es2015', 'react']
//         }
//       }
//     ]
//   }
// };
