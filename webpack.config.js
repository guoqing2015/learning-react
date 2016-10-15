 var port = process.env.PORT || 3000;

var lessons = [
  "02 - Write a Hello World React Component",
  "03 - Display Output in React with a Component's render Method",
  "04 - Set Properties on React Components",
  "05 - Manage React Component State with setState",
  "06 - Use React Components as Children for Other Components",
  "07 - Use React ref to Get a Reference to Specific Components",
  "08 - Access Nested Data in React Components Using this.props.children",
  "09 - Understand the React Component Lifecycle Methods",
  "10 - Manage React Component State with Lifecycle Methods",
  "11 - Control React Component Updates When New Props Are Received",
  "12 - React Mixins",
  "13 - Write More Reusable React Components with Composable APIs",
  "14 - Use map to Create React Components from Arrays of Data",
  "15 - Build a JSX Live Compiler as a React Component",
  "16 - Understand JSX at a Deeper Level",
  "17 - React with-addons - ReactLink"
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
