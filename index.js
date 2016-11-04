/**
 * @author Juan Pablo <juanpablocs21@gmail.com
 * @date 03/11/16.
 */
// HtmlWebpackPluginReturn.js

var fs      = require('fs');
var path    = require('path');

function HtmlWebpackPluginReturn(options) {
    this.options = options;
}

HtmlWebpackPluginReturn.prototype.apply = function(compiler) {
    var self = this;
    compiler.plugin('compilation', function(compilation) {

        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            htmlPluginData.html = htmlPluginData.html.replace(/<link(|.*?)href=(.*?)\.css(|.*?)>/g, '');
            htmlPluginData.html = htmlPluginData.html.replace(/<script([^>]+)>(.*?)<\/script>/g, '');
            callback(null, htmlPluginData);
        });
        compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
            var op  = htmlPluginData.plugin.options;

            var from = path.resolve(self.options.output) + '/' + op.filename;
            var to  = op.template.split('!');
            fs.writeFile(to, htmlPluginData.html.source(), function(err){
                if(err)
                    callback(err);
                else
                    callback(null);
            });
            fs.unlink(from, function(err){
                console.log('err',err);
            });
            // callback(null);
        });
    });
};

module.exports = HtmlWebpackPluginReturn;