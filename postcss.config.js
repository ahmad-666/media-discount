//const cssnano = require('cssnano') ; 
const autoprefixer = require('autoprefixer') ; 
//const purgecss = require('@fullhuman/postcss-purgecss') ; //this plugin is having some conflict with 'mini-css-extract-plugin'
module.exports = {
	plugins: [
		// cssnano({
		// 	preset: 'default' //for minify .css files	
		// }), 
		// purgecss({
		// 	content: ['./*.html','./src/*.html','./src/js/*.js'] ,
		// 	fontFace: true ,
		// 	keyframes: true 
		// }),
		autoprefixer
	]
}