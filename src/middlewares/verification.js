export const verifyMessage = async (req, res, next) => {
    try {
        const msg = req.cookies["access-message"]

        if (msg) {
            req.msg = msg
            res.clearCookie('access-message')
        }
        next()

    } catch (error) {
        console.log(error)
    }
}
