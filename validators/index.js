exports.createPostValidator = (req, res, next) => {
    // Başlık
    req.check("title", "Lütfen bir başlık girin").notEmpty();
    req.check("title", "Başlık en az 4 hane en fazla 20 haneden oluşmalıdır").isLength({
        min: 4,
        max: 20
    });

    // Gövde
    req.check("body", "Lütfen bir gövde metni girin").notEmpty();
    req.check("body", "Gövde metni en az 4 hane en fazla 1000 haneden oluşmalıdır").isLength({
        min: 4,
        max: 1000
    });

    // Hata 
    const errors = req.validationErrors();

    // Hata oluştuğunda ayıklama
    if (errors) {
        const firsterror = errors.map(err => err.msg)[0];
        return res.status(400).json({ error: firsterror });
    }

    // Müteakip middleware e ilerleme
    next();
}