package tmpl

import (
	"fmt"
	"html/template"
	"net/http"

	_ "github.com/lib/pq"
)

var templates *template.Template

func init() {
	templates = template.Must(template.New("t").ParseGlob("static/**/*.html"))
}

// Write template binary to ResponseWriter and inject data into the template
// is the same as t := templates.ParseFiles(temp); t,_ = t.ExecuteTemplate(w, temp, data)
func RenderTemplate(w http.ResponseWriter, r *http.Request, name string, data interface{}) {
	err := templates.ExecuteTemplate(w, name+".html", data)
	if err != nil {
		http.Error(w, fmt.Sprintf(errorTemplate, name, err), http.StatusInternalServerError)
	}
}

var errorTemplate = `<html>
<body>
<h1>Error rendering template %s</h1>
<p>%s</p>
</body>
</html>`
