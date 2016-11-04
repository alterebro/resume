// ----------------------------
// CONFIG
// Markdown option list : https://github.com/chjj/marked#options-1
// HTML-PDF option list : https://github.com/marcbachmann/node-html-pdf#options
// ----------------------------
var template_folder 	= '/template';
var output_file_html 	= './index.html';
var output_file_pdf 	= './ui-developer-jorge-moreno-cv.pdf';
var input_file_md 		= './resume.md';

var markdown_options = {
	breaks : true,
	smartLists : false
}
var pdf_options = {
	format : 'A4',
	orientation : 'portrait',
	border : {
		"top": "10mm",
		"right": "15mm",
		"bottom": "0mm",
		"left": "15mm"
	},
	base : 'file://' + process.cwd() + template_folder
};

// ----------------------------
// ----------------------------
var fs 		= require('fs'),
	marked 	= require('marked'),
	pdf 	= require('html-pdf');

// ----------------------------
// Markdown Settings and Options
var renderer = new marked.Renderer();
	renderer.heading = function (text, level) {
		// var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
		return '<h' + level + '>' + text + '</h' + level + '>';
	};
	marked.setOptions(markdown_options);

// ----------------------------
var template = fs.readFileSync('.'+ template_folder + '/template.html', 'utf8');
fs.readFile(input_file_md, 'utf8', function (err,data) {
	if (err) { return console.log(err); } else {

		console.log( ' - MD file parsing... : ' + input_file_md );

		var blocks = data.split('---'); // <hr />
		var html_content = '';
		for (var i=0; i<blocks.length; i++) {
			switch (i) {
				case 0: tag = 'header' ; break;
				case (blocks.length-1) : tag = 'footer' ; break;
				default: tag = 'section' ; break;
			}
			html_content += `<${tag}>`;
			html_content += marked(blocks[i], { renderer: renderer });
			// html_content += marked(blocks[i]);
			html_content += `</${tag}>`;
		}
		var html_document = template.replace('{{body}}', html_content);
			html_document = html_document.replace( /<link rel="stylesheet" href="(.*?)" \/>/g, function(s, filename) {
								/* // to inject css on the html page
								var css = fs.readFileSync('template/' + filename, 'utf8');
								return '<style>' + css + '</style>';
								*/
								return '<link rel="stylesheet" href=".'+template_folder+'/'+filename+'" />';
							});

		// ----------------
		// Create HTML file
		fs.writeFile(output_file_html, html_document, function(err, res) {
	    	if(err) { return console.log(err); } else {
				console.log( ' - HTML file saved : ' + output_file_html );
			}
		});

		// ----------------
		// Create PDF file
		pdf.create(html_document, pdf_options).toFile(output_file_pdf, function(err, res) {
			if (err) { return console.log(err); } else {
				console.log( ' - PDF file saved : ' + output_file_pdf );
				console.log( ' - Output file: ' + res.filename );
				console.log( '' );
			}
		});
	}
});
