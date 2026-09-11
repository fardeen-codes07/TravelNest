const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../model/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const {validateReview}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));

router.get("/new",isLoggedIn,listingController.renderNew);


router.route("/:id")
.get(wrapAsync(listingController.showListing) )
.put(isLoggedIn,isOwner,validateListing,upload.single("listing[image]"),wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.distroyListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;