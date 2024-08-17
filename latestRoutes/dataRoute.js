import express from 'express';
import upload from '../middlware/multer.js';

import {
    createCourseCategory,
    deleteCourseCategory,
    editCourseCategory,
    getAllCourseCategory,
    getCourseByCategory,
    getCourseByCategoryById
} from '../latestController/courseCategory/courseCategoryController.js';
import {
    createExtensiveProgram,
    deleteExtensiveProgramPage,
    getAllExtensiveProgram,
    getExtensiveProgramByCategory,
    getExtensiveProgramById,
    updateExtensiveProgram
} from '../latestController/extensiveProgram/extensiveProgramController.js';
import { createBlog, deleteBlog, editBlog, getBlogByCategory, getBlogById, getBlogs } from '../latestController/blog/blogController.js';
import { createMasterClass, deleteMasterClass, editMasterClass, getMasterClassByCategory, getMasterClassById, getMasterClasses, updateMasterClass } from '../latestController/masterClass/masterclassController.js';
import { createCrashCourse, deleteCrashCourse, editCrashCourse, getCrashCourseByCategory, getCrashCourseById, getCrashCourses } from '../latestController/crashCourse/crashCourseController.js';
import { createCertificateData, deleteCertificateDataById, editCertificateDataById, getCertificateData, getCertificateDataByCategory } from '../latestController/certificate/certificateController.js';
import { createCollaborationData, deleteCollaborationDataById, editCollaborationDataById, getCollaborationData, getCollaborationDataByCategory } from '../latestController/collaboration/collaborationController.js';
import { createGalleryData, deleteGalleryDataById, editGalleryDataById, getGalleryData, getGalleryDataByCategory } from '../latestController/gallery/galleryController.js';
import { createContactUsFormData, deleteContactUsFormDataById, getContactUsFormData } from '../latestController/contactUs/contactFormController.js';
import { createConsultingFormData, deleteConsultingFormDataById, getConsultingFormData } from '../latestController/contactUs/consultinFormController.js';
import { createCreatorData, deleteCreatorDataById, editCreatorData, getCreatorData, getCreatorDataByCategory } from '../latestController/creator/creatorController.js';
import { createInstructorData, deleteInstructorDataById, editInstructorData, getInstructorData, getInstructorDataByCategory } from '../latestController/instructor/instructorController.js';
import { createOurPartenerData, deleteOurPartenerDataById, editOurPartenerData, getOurPartenerData, getOurPartenerDataByCompanyName } from '../latestController/ourPartner/partnerController.js';
import { createOurTeamData, deleteOurTeamDataById, editOurTeamData, getOurTeamData, getOurTeamDataByMemberName } from '../latestController/ourTeam/ourTeamController.js';
import { createPractionersData, deletePractionersDataById, editPractionersData, getPractionersData, getPractionersDataByCategory } from '../latestController/practioners/practionersController.js';
import { createStudentReviewData, deleteStudentReviewDataById, editStudentReviewDataById, getStudentReviewData, getStudentReviewDataByCategory } from '../latestController/studentReview/studentReviewController.js';
import { createTestimonialsData, deleteTestimonialsDataById, getTestimonialsData, getTestimonialsDataByCategory, updateTestimonialsData } from '../latestController/testimonials/testimonialsController.js';
import { createUpcomingBatchData, deleteUpcomingBatchDataById, getUpcomingBatchData, getUpcomingBatchDataByCategory, getUpcomingBatchDataByProgram } from '../latestController/upcomingBatches/upcomingBatchesController.js';
import { createOurAlumniData, deleteOurAlumniDataById, getOurAlumniData, getOurAlumniDataByCategory, updateOurAlumniDataById } from '../latestController/ourAlumni/alumniController.js';
import { createFaqData, deleteFaqDataById, editFaqDataById, getFaqData } from '../latestController/allFaq/faqController.js';
import { createFaqByCategoryData, deleteFaqByCategoryDataById, editFaqByCategoryDataById, getFaqByCategoryData, getFaqByCategoryDataByCategory } from '../latestController/allFaq/faqByCategoryController.js';
import { createSuccessStoryData, deleteSuccessStoryDataById, editSuccessStoryDataById, getSuccessStoryData, getSuccessStoryDataByCategory } from '../latestController/successStory/successStoryController.js';
import { createContactUsData, deleteContactUsDataById, getContactUsData, updateContactUsDataById } from '../latestController/contactUs/contactUsController.js';
import { createMorqueData, deleteMorqueData, getAllMorqueData, getMorqueDataByCategory, getMorqueDataById, updateMorqueData } from '../latestController/morqueData/morqueData.js';
import { createQueryData, deleteQueryData, getAllQueryData } from '../latestController/contactUs/queryController.js';
import { createHireFrom, deleteHireFrom, getHireFrom, getHireFromByCategory, getHireFromById, updateHireFrom } from '../latestController/hireFromUs/hireFromUsBycategory.js';
import { createTechnicalHighlight, deleteTechnicalHighlight, getAllTechnicalHighlights, getTechnicalHighlightsByCategory, updateTechnicalHighlight } from '../latestController/hireFromUs/technicalHIghLights.js';
import { createToolCovered, deleteToolCovered, getAllToolsCovered, getToolsCoveredByCategory, updateToolCovered } from '../latestController/hireFromUs/toolsCovered.js';

const latestRouter = express.Router();

//course category
const courseCategoryUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'homeCardIcon', maxCount: 1 }
]);

latestRouter.post('/add-all-course-category', courseCategoryUpload, createCourseCategory);
latestRouter.get('/get-all-coursecategory', getAllCourseCategory);
latestRouter.get('/get-all-coursecategory-by-category/:category', getCourseByCategory);
latestRouter.get('/get-coursecategory-by-id/:id', getCourseByCategoryById);
latestRouter.delete('/delete-coursecategory-by-id/:id', deleteCourseCategory);
latestRouter.put('/edit-course-category/:id', courseCategoryUpload, editCourseCategory); // Edit route

//extensive program
const extensiveProgramUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'highlightsIcon', maxCount: 100 },
    { name: 'topInDemandToolsLogo', maxCount: 100 }
]);

latestRouter.post('/add-extensive-program', extensiveProgramUpload, createExtensiveProgram);
latestRouter.get('/get-extensive-program', getAllExtensiveProgram);
latestRouter.get('/get-all-extensive-program-by-category/:category', getExtensiveProgramByCategory);
latestRouter.get('/get-all-extensive-program-by-id/:id', getExtensiveProgramById);
latestRouter.delete('/delete-extensive-program-by-id/:id', deleteExtensiveProgramPage);
latestRouter.put('/update-extensive-program-by-id/:id', extensiveProgramUpload, updateExtensiveProgram);


//blog
const blogUpload = upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'headerBgImage', maxCount: 1 }
]);

latestRouter.post('/add-blog', blogUpload, createBlog);
latestRouter.get('/get-blogs', getBlogs);
latestRouter.get('/get-blog-by-id/:id', getBlogById);
latestRouter.get('/get-blog-by-category/:category', getBlogByCategory);
latestRouter.delete('/delete-blog-by-id/:id', deleteBlog);
latestRouter.put('/edit-blog/:id', blogUpload, editBlog);

//master class
const masterClassUpload = upload.fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'masterClassIcon', maxCount: 1 },
    { name: 'mentorProfile', maxCount: 1 }

]);

latestRouter.post('/add-master-class-page', masterClassUpload, createMasterClass);
latestRouter.get('/get-master-classes', getMasterClasses);
latestRouter.get('/get-master-class-by-id/:id', getMasterClassById);
latestRouter.get('/get-master-class-by-category/:category', getMasterClassByCategory);
latestRouter.delete('/delete-master-class-by-id/:id', deleteMasterClass);
// latestRouter.put('/edit-master-class/:id', masterClassUpload, editMasterClass);
latestRouter.put('/edit-master-class/:id', masterClassUpload, updateMasterClass);

latestRouter.post('/add-crash-course', createCrashCourse);
latestRouter.get('/get-crash-courses', getCrashCourses);
latestRouter.get('/get-crash-course-by-id/:id', getCrashCourseById);
latestRouter.get('/get-crash-courses-by-category/:category', getCrashCourseByCategory);
latestRouter.delete('/delete-crash-course-by-id/:id', deleteCrashCourse);
latestRouter.put('/edit-crash-course/:id', editCrashCourse);



// certificate route
latestRouter.post('/add-certificate', upload.single('certificateImage'), createCertificateData);
latestRouter.get('/get-certificate', getCertificateData);
latestRouter.get('/get-CertificateData-by-category/:category', getCertificateDataByCategory);
latestRouter.delete('/delete-CertificateData-by-id/:id', deleteCertificateDataById);
latestRouter.put('/edit-CertificateData-by-id/:id', upload.single('certificateImage'), editCertificateDataById);


latestRouter.post('/add-collaboration', createCollaborationData);
latestRouter.get('/get-collaborations', getCollaborationData);
latestRouter.get('/get-collaborations-by-category/:category', getCollaborationDataByCategory);
latestRouter.delete('/delete-collaboration-by-id/:id', deleteCollaborationDataById);
latestRouter.put('/edit-collaboration-by-id/:id', editCollaborationDataById);

const galleryUpload = upload.fields([
    { name: 'eventImage', maxCount: 1 }
]);

latestRouter.post('/add-gallery', galleryUpload, createGalleryData);
latestRouter.get('/get-galleries', getGalleryData);
latestRouter.get('/get-galleries-by-category/:category', getGalleryDataByCategory);
latestRouter.delete('/delete-gallery-by-id/:id', deleteGalleryDataById);
latestRouter.put('/edit-gallery-by-id/:id', galleryUpload, editGalleryDataById);

// consulting form
// Create a new consulting form entry
latestRouter.post('/add-consulting-form', createConsultingFormData);
latestRouter.get('/get-consulting-forms', getConsultingFormData);
latestRouter.delete('/delete-consulting-form/:id', deleteConsultingFormDataById);


latestRouter.post('/add-new-contact-us-form-data', createContactUsFormData);
latestRouter.get('/get-new-contact-us-forms-data', getContactUsFormData);
latestRouter.delete('/delete-new-contact-us-form/:id', deleteContactUsFormDataById);

latestRouter.post('/add-new-contact-us-page-data', upload.single('buildingImg'), createContactUsData);
latestRouter.get('/get-new-contact-us-page-data', getContactUsData);
latestRouter.put('/edit-new-contact-us-page-data/:id', upload.single('buildingImg'), updateContactUsDataById);
latestRouter.delete('/delete-contact-us-page-data/:id', deleteContactUsDataById);


// query Data routes
latestRouter.post('/add-query-data', createQueryData);

// Route to get all query data entries
latestRouter.get('/get-query-data', getAllQueryData);

// Route to delete a query data entry by ID
latestRouter.delete('/delete-query-data/:id', deleteQueryData);


// creator routes
const creatorUpload = upload.fields([
    { name: 'profilePic', maxCount: 1 }
]);
latestRouter.post('/add-creator', creatorUpload, createCreatorData);
latestRouter.get('/get-all-creators', getCreatorData);
latestRouter.get('/get-creators-by-category/:category', getCreatorDataByCategory);
latestRouter.delete('/delete-creator-by-id/:id', deleteCreatorDataById);
latestRouter.put('/edit-creator/:id', creatorUpload, editCreatorData);

// instructor fields
latestRouter.post('/add-instructor-data', upload.fields([{ name: 'profilePic', maxCount: 1 }]), createInstructorData);
latestRouter.get('/get-all-instructors', getInstructorData);
latestRouter.get('/get-instructor-data-by-category/:category', getInstructorDataByCategory);
latestRouter.delete('/delete-instructor-data/:id', deleteInstructorDataById);
latestRouter.put('/edit-instructor/:id', creatorUpload, editInstructorData);



// alumni routes
latestRouter.post('/add-our-alumni-data', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]), createOurAlumniData);
latestRouter.get('/get-all-our-alumni-data', getOurAlumniData);
latestRouter.get('/get-our-alumni-data-by-category/category', getOurAlumniDataByCategory);
latestRouter.delete('/delete-our-alumni-data/:id', deleteOurAlumniDataById);
latestRouter.put('/update-our-alumni-data/:id', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]), updateOurAlumniDataById);

// our partener routes
latestRouter.post('/add-our-partner-data', upload.fields([{ name: 'companyLogo', maxCount: 1 }]), createOurPartenerData);
latestRouter.get('/get-all-our-partner-data', getOurPartenerData);
latestRouter.get('/get-our-partner-data-by-company-name', getOurPartenerDataByCompanyName);
latestRouter.delete('/delete-our-partner-data/:id', deleteOurPartenerDataById);
latestRouter.put('/edit-our-partner-data/:id', upload.fields([{ name: 'companyLogo', maxCount: 1 }]), editOurPartenerData);


//  team member Route 
latestRouter.post('/add-our-team-data', upload.fields([{ name: 'profilePic', maxCount: 1 }]), createOurTeamData);
latestRouter.get('/get-all-our-team-data', getOurTeamData);
latestRouter.get('/get-our-team-data-by-member-name', getOurTeamDataByMemberName);
latestRouter.delete('/delete-our-team-data/:id', deleteOurTeamDataById);
latestRouter.put('/edit-our-team-data/:id', upload.fields([{ name: 'profilePic', maxCount: 1 }]), editOurTeamData);


// practioners data
latestRouter.post('/add-new-practioners-data', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]), createPractionersData);
latestRouter.get('/get-all-new-practioners-data', getPractionersData);
latestRouter.get('/get-new-practioners-data-by-category/:category', getPractionersDataByCategory);
latestRouter.delete('/delete-new-practioners-data/:id', deletePractionersDataById);
// Update
latestRouter.put('/edit-new-practioners-data/:id', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]), editPractionersData);

// Student Review Routes
latestRouter.post('/add-student-review-data', upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), createStudentReviewData);
latestRouter.get('/get-all-student-review-data', getStudentReviewData);
latestRouter.get('/get-student-review-data-by-category/:category', getStudentReviewDataByCategory);
latestRouter.delete('/delete-student-review-data/:id', deleteStudentReviewDataById);
latestRouter.put('/edit-student-review-data/:id', upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), editStudentReviewDataById);

// success story routes
latestRouter.post('/add-success-story-data', upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), createSuccessStoryData);

latestRouter.get('/get-all-success-story-data', getSuccessStoryData);
latestRouter.get('/get-success-story-data-by-category/:category', getSuccessStoryDataByCategory);
latestRouter.delete('/delete-success-story-data/:id', deleteSuccessStoryDataById);
latestRouter.put('/edit-success-story-data/:id', upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), editSuccessStoryDataById);


// testimonial routes
latestRouter.post('/add-all-testimonials', upload.fields([{ name: 'reviewVideo', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), createTestimonialsData);
latestRouter.get('/get-all-testimonials', getTestimonialsData);
latestRouter.delete('/delete-testimonials/:id', deleteTestimonialsDataById);
latestRouter.get('/get-testimonials-by-category/category/:category', getTestimonialsDataByCategory);
latestRouter.put('/edit-testimonials/:id', upload.fields([{ name: 'reviewVideo', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]),
    updateTestimonialsData);

// upcoming batch     
latestRouter.post('/upcoming-batches', createUpcomingBatchData);
latestRouter.get('/upcoming-batches', getUpcomingBatchData);
latestRouter.delete('/upcoming-batches/:id', deleteUpcomingBatchDataById);
latestRouter.get('/upcoming-batches/category/:category', getUpcomingBatchDataByCategory);
latestRouter.get('/upcoming-batches/program/:program', getUpcomingBatchDataByProgram)

latestRouter.post('/add-common-faq', createFaqData);
latestRouter.get('/get-all-faq', getFaqData);
latestRouter.delete('/delete-faq/:id', deleteFaqDataById);
latestRouter.put('/edit-faq/:id', editFaqDataById);

latestRouter.post('/add-faq-by-category-data', createFaqByCategoryData);
latestRouter.get('/get-all-faq-by-category-data', getFaqByCategoryData);
latestRouter.delete('/delete-faq-by-category-data/:id', deleteFaqByCategoryDataById);
latestRouter.get('/get-faq-by-category-data/:category', getFaqByCategoryDataByCategory);
latestRouter.put('/edit-faq-by-category-data/:id', editFaqByCategoryDataById);

// Define the routes
latestRouter.post('/add-morqueData', createMorqueData);
latestRouter.get('/get-morqueData', getAllMorqueData);
latestRouter.get('/get-morque-data-by-id-morqueData/:id', getMorqueDataById);
latestRouter.get('/get-morque-data-by-category-morqueData/:category', getMorqueDataByCategory);
latestRouter.put('/update-morqueData/:id', updateMorqueData);
latestRouter.delete('/delete-morqueData/:id', deleteMorqueData);

// hire from us
latestRouter.post('/add-hire-from-data', createHireFrom);
latestRouter.get('/get-hire-from', getHireFrom);
latestRouter.get('/getBy-id-hire-from/:id', getHireFromById);
latestRouter.get('/getBy-category-hire-from/:category', getHireFromByCategory);
latestRouter.put('/update-hire-from/:id', updateHireFrom);
latestRouter.delete('/delete-hire-from/:id', deleteHireFrom);

latestRouter.post('/add-technical-highlights', upload.single('technicalHighlightIcon'), createTechnicalHighlight);
latestRouter.get('/get-all-technical-highlights', getAllTechnicalHighlights);
latestRouter.get('/get-by-category-technical-highlights/category/:category', getTechnicalHighlightsByCategory);
latestRouter.delete('/delete-technical-highlights/:id', deleteTechnicalHighlight)
latestRouter.put('/update-technical-highlight/:id', upload.single('technicalHighlightIcon'), updateTechnicalHighlight);



// tools category in hire from us
latestRouter.post('/add-tools-covered', upload.single('ToolsCoveredicon'), createToolCovered);
latestRouter.get('/get-tools-covered', getAllToolsCovered);
latestRouter.get('/get-by-category-tools-covered/:category', getToolsCoveredByCategory);
latestRouter.put('/update-tools-covered/:id', upload.single('ToolsCoveredicon'), updateToolCovered);
latestRouter.delete('/delete-tools-covered/:id', deleteToolCovered);

export default latestRouter;