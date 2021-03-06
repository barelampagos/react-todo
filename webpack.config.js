var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

// Will be 'production' on heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
	envFile(
		path.join(__dirname, 'config/' + process.env.NODE_ENV.trim() + '.env')
	);
} catch (e) {}

module.exports = {
	// Entry point of application
	entry: [
		'script!jquery/dist/jquery.min.js',
		'script!foundation-sites/dist/foundation.min.js',
		'./app/app.jsx'
	],
	externals: {
		// Set of KV pairs: Module, Variable name
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				API_KEY: JSON.stringify(process.env.API_KEY),
				AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
				DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
				STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET)
			}
		})
	],
	output: {
		// Output of bundled file
		path: __dirname, // Node gives us current dir with __dirname
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		modulesDirectories: ['node_modules', './app/components', './app/api'],
		alias: {
			app: 'app',
			applicationStyles: 'app/styles/app.scss',
			actions: 'app/actions/actions.jsx',
			reducers: 'app/reducers/reducers.jsx',
			configureStore: 'app/store/configureStore.jsx'
		},
		// List of file extensions we should be able to process
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				// Initializes loader to parse babel
				loader: 'babel-loader',
				query: {
					// Take files to parse through react, then run through es2015
					presets: ['react', 'es2015']
				},
				// Regex to specify which files to get
				test: /\.jsx?$/,
				// Specify which folders to exclude
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	},
	devtool:
		// Only make source maps locally
		process.env.NODE_ENV == 'production' ? undefined : 'inline-source-map'
};
