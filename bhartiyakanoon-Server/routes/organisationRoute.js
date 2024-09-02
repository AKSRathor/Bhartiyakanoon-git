const express = require("express");
const {registerOrganisation,loginOrganisation,logout,forgotPassword,resetPassword,getOrganisationDetails,updateOrganisationPassword,updateOrganisationProfile,addEmployee,removeEmployee} = require("../controllers/organisationController");
const { isAuthenticatedUser , isAuthenticatedOrganisation } = require("../middleware/auth");
const router = express.Router();

router.route("/org/register").post(registerOrganisation);
router.route("/org/login").post(loginOrganisation);
router.route("/org/password/forgot").post(forgotPassword);
router.route("/org/hire").post(isAuthenticatedOrganisation,addEmployee); 
router.route("/org/layoff").post(isAuthenticatedOrganisation,removeEmployee); 
router.route("/org/password/reset/:token").put(resetPassword);
router.route("/org/logout").get(logout);
router.route("/org/me").get(isAuthenticatedOrganisation, getOrganisationDetails);

module.exports = router;