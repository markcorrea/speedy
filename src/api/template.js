import moment from 'moment'

export default {

    /* 
    Contains the template to be shown on browser. It receives a list of 
    voices and iterates on the template according to the amount of registers.
    */
    getTemplate(response) {
        let voices = response.voices
        let template = ''
        template += '<!DOCTYPE html>'
        template += '<html lang="en">'
        template += '<head>'
        template += '<meta charset="utf-8">'
        template += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'
        template += '<meta name="description" content="">'
        template += '<meta name="author" content="">'
        template += '<title>4 Col Portfolio - Start Bootstrap Template</title>'
        template += '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">'
        template += '<style type="text/css">'
        template += 'body {'
        template += 'padding-top: 54px;'
        template += '}'
        template += '@media (min-width: 992px) {'
        template += 'body {'
        template += 'padding-top: 56px;'
        template += '}'
        template += '}'
        template += '.portfolio-item {'
        template += 'margin-bottom: 30px;'
        template += '}'
        template += '.pagination {'
        template += 'margin-bottom: 30px;'
        template += '}'
        template += '.font-datetime { font-size: 12px; color: #999999; }'
        template += '.font-datetime-jumbotron { font-size: 15px; font-weight: 300; color: #999999; margin-bottom: 10px; }'
        template += '</style>'
        template += '</head>'
        template += '<body>'
        template += '<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">'
        template += '<div class="container">'
        template += '<a class="navbar-brand" href="#">&nbsp;</a>'
        template += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">'
        template += '<span class="navbar-toggler-icon"></span>'
        template += '</button>'
        template += '<div class="collapse navbar-collapse" id="navbarResponsive">'

        template += '</div>'
        template += '</div>'
        template += '</nav>'
        template += '<div class="container">'

        voices.map((voice, index) => {
            if (index < 1) {

                template += '<header class="jumbotron my-4">'
                template += '<h1 class="display-3">' + voice.author + '</h1>'
                template += '<p class="lead">' + voice.script + '</p>'
                template += '<p class="font-datetime-jumbotron"> Received at: ' + moment(voice.createdAt).format('MMM DD, HH:mm:ss a') + '</p>'
                template += '<audio controls>'
                template += '<source src="' + voice.voice + '" type="audio/mpeg">'
                template += '</audio>'
                template += '</header>'

                template += '<div class="row text-center">'
            }

            if (index > 0) {

                template += '<div class="col-lg-4 col-md-6 mb-4">'
                template += '<div class="card">'
                template += '<div class="card-body">'
                template += '<h4 class="card-title">' + voice.author + '</h4>'
                template += '<p class="card-text">' + voice.script + '</p>'
                template += '<p class="font-datetime"> Received at: ' + moment(voice.createdAt).format('MMM DD, HH:mm:ss a') + '</p>'
                template += '</div>'
                template += '<div class="card-footer">'
                template += '<audio controls>'
                template += '<source src="' + voice.voice + '" type="audio/mpeg">'
                template += '</audio>'
                template += '</div>'
                template += '</div>'
                template += '</div>'
            }
        })

        template += '</div>'
        template += '</div>'
        template += '<footer class="py-5 bg-dark">'
        template += '<div class="container">'
        template += '<p class="m-0 text-center text-white">Copyright &copy; Your Website 2018</p>'
        template += '</div>'
        template += '</footer>'
        template += '<script src="vendor/jquery/jquery.min.js"></script>'
        template += '<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>'
        template += '</body>'
        template += '</html>'

        return template
    }
}