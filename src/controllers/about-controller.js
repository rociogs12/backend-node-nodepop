// ABOUT CONTROLLER

export function aboutPageController(req, res, next) {
    try {
        const aboutTitle = 'Nodepop - About us'; 

        res.render('about.html', {
            title: aboutTitle
        })
    } catch (error) {
        next(error) 
    }
}