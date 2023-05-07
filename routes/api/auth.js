const router = require("express").Router();
const validateUserData = require('../../midelvars/userValidate');
const validateVerify = require('../../midelvars/validateVerify');
const asyncWrapper = require("../../helpers/asyncWrapper")
const authenticate = require("../../midelvars/authenticate");
const { createUser } = require("../../controlers/auth/createUser");
const { getCurrent } = require("../../controlers/auth/getCurrent");
const { logout } = require("../../controlers/auth/logout");
const { userLogin } = require("../../controlers/auth/userLogin");
const { updateSubscription } = require("../../controlers/auth/updateSubscription");
const upload = require("../../midelvars/uploadAvatar");
const updateAvatar = require("../../controlers/auth/updateAvatar");
const verifyEmail = require("../../controlers/auth/verifyEmail");
const resetVerifyMail = require("../../controlers/auth/resetVerifyMail")


router.post("/register", validateUserData, asyncWrapper(createUser));

router.get("/verify/:verificationToken", asyncWrapper(verifyEmail));

router.post("/verify", validateVerify, asyncWrapper(resetVerifyMail));

router.post("/login", validateUserData, asyncWrapper(userLogin));

router.get("/current", authenticate, asyncWrapper(getCurrent));

router.post("/logout", authenticate, asyncWrapper(logout));

router.patch("/", authenticate, asyncWrapper(updateSubscription));

router.patch("/avatars", authenticate, upload, asyncWrapper(updateAvatar));

module.exports = router;