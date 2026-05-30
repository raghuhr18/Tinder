const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthenticated = token === "xyz";
    if (isAdminAuthenticated) {
        console.log("Admin authenticated successfully");
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

const userAuth = (req, res, next) => {
    const token = "abc";
    const isUserAuthenticated = token === "abc";
    if (isUserAuthenticated) {
        console.log("User authenticated successfully");
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    adminAuth,
    userAuth
}