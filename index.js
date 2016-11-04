/**
 * @author Juan Pablo <juanpablocs21@gmail.com
 * @date 03/11/16.
 */
// HtmlWebpackPluginReturn.js

var fs = require('fs');

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

            var from = self.options.output + op.filename;
            var to  = op.template.split('!');

            fs.rename(from, to[1], function(err){
                if(err)
                    callback(err);
                else
                    callback(null);
            });
            // callback(null);
        });
    });
};

module.exports = HtmlWebpackPluginReturn;