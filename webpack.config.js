//Enviroment
//process.env.NODE_ENV = 'production';
const enviroment = process.env.NODE_ENV || "developer";
console.log('ENVIROMENT ' + enviroment); 

//Modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const extractSass = new ExtractTextPlugin({
						filename: "[name].css",
						disable: enviroment === 'development'
					});
	

// Common rules
const rules = [{
		test: /\.(js|jsx)$/,
		exclude: /(node_modules|bower_components)/,
		enforce: 'pre',
		use:[{
			loader: 'babel-loader',
			options:{
				presets: ['env']
			}
		}]
	},{
		test: /\.json$/,
		use: 'json-loader'
	}];

// Plugins
const plugins = [
	new webpack.LoaderOptionsPlugin({
		test: /\.(js|jsx)$/, 
		options: {
			jshint: {
				camelcase: true, 
				emitErrors: true,
				failOnHint: true,
			}
		}
	})
];

//Server
const devServer = {
   	contentBase: path.join(__dirname, '/'), 
  	compress: true,
  	port: 3100,
  	//stats: 'errors-only',
  	open: true,
  	hot: true,
  	inline: true,
  	openPage: '', 
  	allowedHosts:[ "dev.miraitag.com"]
};

if( enviroment == 'production'){
	rules.push({
		test: /\.(scss|sass)$/,
		use: extractSass.extract({
			use: ['css-loader', 'sass-loader'],
			fallback: 'style-loader'
		})
	});

	plugins.push( extractSass );
	
}else{
	rules.push({
		test: /\.(scss|sass)$/,
		use: [
		'style-loader', 
		{
			loader: 'css-loader',
			options: {
				//minimize: true
			}
		},
		'sass-loader', 'postcss-loader']
	});
}


module.exports = {
	entry:{
		app: __dirname + '/app.js',
	},
	output:{
		filename: 'bundle.[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	module:{
		rules,
	},
	plugins,
	devServer
};