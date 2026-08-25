# Curriculum vitae / resume builder written in Node.

## Resume in HTML and PDF format, both generated from Markdown by Node.JS

Exported files are created using the markup defined on the template file (themed with CSS) located on the `/template` and generated using PhantomJS via Node.

```sh
$ git clone https://github.com/alterebro/resume
$ cd resume
$ npm install 	# Install dependencies
# ...
# Modify config settings: app/main.js
# Edit markdown cv file and the template.
# ...
$ npm start   	# Builds the HTML and PDF
```

**[MIT Licensed](https://en.wikipedia.org/wiki/MIT_License)**. 
Copyright (c) 2016 Jorge Moreno ( [moro.es](https://moro.es), [@alterebro](https://x.com/alterebro) )
