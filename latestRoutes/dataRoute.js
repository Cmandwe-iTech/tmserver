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
import { createMasterClass, deleteMasterClass, editMasterClass, getMasterClassByCategory, getMasterClassById, getMasterClasses } from '../latestController/masterClass/masterclassController.js';
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
import { createUpcomingBatchData, deleteUpcomingBatchDataById, getUpcomingBatchData, getUpcomingBatchDataByCategory, getUpcomingBatchDataByProgram, updateUpcomingBatchDataById } from '../latestController/upcomingBatches/upcomingBatchesController.js';
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
import { authlogin, Super_Admin_or_Admin } from '../middlware/userauth.js';
import { createBroucher, deleteBroucherById, getAllBrouchers, getBroucherByCategory, getBroucherById, updateBroucherById } from '../latestController/brocher/brocherController.js';

const latestRouter = express.Router();

const courseCategoryUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'homeCardIcon', maxCount: 1 }
]);

latestRouter.post('/add-all-course-category', authlogin, Super_Admin_or_Admin, courseCategoryUpload, createCourseCategory);
latestRouter.get('/get-all-coursecategory', getAllCourseCategory);
latestRouter.get('/get-all-coursecategory-by-category/:category', getCourseByCategory);
latestRouter.get('/get-coursecategory-by-id/:id', getCourseByCategoryById);
latestRouter.delete('/delete-coursecategory-by-id/:id', authlogin, Super_Admin_or_Admin, deleteCourseCategory);
latestRouter.put('/edit-course-category/:id', authlogin, Super_Admin_or_Admin, courseCategoryUpload, editCourseCategory);

const extensiveProgramUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'highlightsIcon', maxCount: 100 },
    { name: 'topInDemandToolsLogo', maxCount: 100 }
]);

latestRouter.post('/add-extensive-program', authlogin, Super_Admin_or_Admin, extensiveProgramUpload, createExtensiveProgram);
latestRouter.get('/get-extensive-program', getAllExtensiveProgram);
latestRouter.get('/get-all-extensive-program-by-category/:category', getExtensiveProgramByCategory);
latestRouter.get('/get-all-extensive-program-by-id/:id', getExtensiveProgramById);
latestRouter.delete('/delete-extensive-program-by-id/:id', authlogin, Super_Admin_or_Admin, deleteExtensiveProgramPage);
latestRouter.put('/update-extensive-program-by-id/:id', authlogin, Super_Admin_or_Admin, extensiveProgramUpload, updateExtensiveProgram);

const blogUpload = upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'headerBgImage', maxCount: 1 }
]);

latestRouter.post('/add-blog', authlogin, Super_Admin_or_Admin, blogUpload, createBlog);
latestRouter.get('/get-blogs', getBlogs);
latestRouter.get('/get-blog-by-id/:id', getBlogById);
latestRouter.get('/get-blog-by-category/:category', getBlogByCategory);
latestRouter.delete('/delete-blog-by-id/:id', authlogin, Super_Admin_or_Admin, deleteBlog);
latestRouter.put('/edit-blog/:id', authlogin, Super_Admin_or_Admin, blogUpload, editBlog);

const masterClassUpload = upload.fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'masterClassIcon', maxCount: 1 },
    { name: 'mentorProfile', maxCount: 1 }
]);

latestRouter.post('/add-master-class-page', authlogin, Super_Admin_or_Admin, masterClassUpload, createMasterClass);
latestRouter.get('/get-master-classes', getMasterClasses);
latestRouter.get('/get-master-class-by-id/:id', getMasterClassById);
latestRouter.get('/get-master-class-by-category/:category', getMasterClassByCategory);
latestRouter.delete('/delete-master-class-by-id/:id', deleteMasterClass);
latestRouter.put('/edit-master-class/:id', authlogin, Super_Admin_or_Admin, masterClassUpload, editMasterClass);

latestRouter.post('/add-crash-course', authlogin, Super_Admin_or_Admin, createCrashCourse);
latestRouter.get('/get-crash-courses', getCrashCourses);
latestRouter.get('/get-crash-course-by-id/:id', getCrashCourseById);
latestRouter.get('/get-crash-courses-by-category/:category', getCrashCourseByCategory);
latestRouter.delete('/delete-crash-course-by-id/:id', authlogin, Super_Admin_or_Admin, deleteCrashCourse);
latestRouter.put('/edit-crash-course/:id', authlogin, Super_Admin_or_Admin, editCrashCourse);

latestRouter.post('/add-certificate', authlogin, Super_Admin_or_Admin, upload.single('certificateImage'), createCertificateData);
latestRouter.get('/get-certificate', getCertificateData);
latestRouter.get('/get-CertificateData-by-category/:category', getCertificateDataByCategory);
latestRouter.delete('/delete-CertificateData-by-id/:id', authlogin, Super_Admin_or_Admin, deleteCertificateDataById);
latestRouter.put('/edit-CertificateData-by-id/:id', authlogin, Super_Admin_or_Admin, upload.single('certificateImage'), editCertificateDataById);


latestRouter.post('/add-collaboration', authlogin, Super_Admin_or_Admin, createCollaborationData);
latestRouter.get('/get-collaborations', getCollaborationData);
latestRouter.get('/get-collaborations-by-category/:category', getCollaborationDataByCategory);
latestRouter.delete('/delete-collaboration-by-id/:id', authlogin, Super_Admin_or_Admin, deleteCollaborationDataById);
latestRouter.put('/edit-collaboration-by-id/:id', authlogin, Super_Admin_or_Admin, editCollaborationDataById);

const galleryUpload = upload.fields([
    { name: 'eventImage', maxCount: 1 }
]);

latestRouter.post('/add-gallery', authlogin, Super_Admin_or_Admin, galleryUpload, createGalleryData);
latestRouter.get('/get-galleries', getGalleryData);
latestRouter.get('/get-galleries-by-category/:category', getGalleryDataByCategory);
latestRouter.delete('/delete-gallery-by-id/:id', authlogin, Super_Admin_or_Admin, deleteGalleryDataById);
latestRouter.put('/edit-gallery-by-id/:id', authlogin, Super_Admin_or_Admin, galleryUpload, editGalleryDataById);

latestRouter.post('/add-consulting-form', createConsultingFormData);
latestRouter.get('/get-consulting-forms', authlogin, Super_Admin_or_Admin, getConsultingFormData);
latestRouter.delete('/delete-consulting-form/:id', authlogin, Super_Admin_or_Admin, deleteConsultingFormDataById);

latestRouter.post('/add-new-contact-us-form-data', createContactUsFormData);
latestRouter.get('/get-new-contact-us-forms-data', authlogin, Super_Admin_or_Admin, getContactUsFormData);
latestRouter.delete('/delete-new-contact-us-form/:id', authlogin, Super_Admin_or_Admin, deleteContactUsFormDataById);

latestRouter.post('/add-new-contact-us-page-data', authlogin, Super_Admin_or_Admin, upload.single('buildingImg'), createContactUsData);
latestRouter.get('/get-new-contact-us-page-data', getContactUsData);
latestRouter.put('/edit-new-contact-us-page-data/:id', authlogin, Super_Admin_or_Admin, upload.single('buildingImg'), updateContactUsDataById);
latestRouter.delete('/delete-contact-us-page-data/:id', authlogin, Super_Admin_or_Admin, deleteContactUsDataById);

latestRouter.post('/add-query-data', createQueryData);
latestRouter.get('/get-query-data', authlogin, Super_Admin_or_Admin, getAllQueryData);
latestRouter.delete('/delete-query-data/:id', authlogin, Super_Admin_or_Admin, deleteQueryData);

const creatorUpload = upload.fields([
    { name: 'profilePic', maxCount: 1 }
]);
latestRouter.post('/add-creator', authlogin, Super_Admin_or_Admin, creatorUpload, createCreatorData);
latestRouter.get('/get-all-creators', getCreatorData);
latestRouter.get('/get-creators-by-category/:category', getCreatorDataByCategory);
latestRouter.delete('/delete-creator-by-id/:id', authlogin, Super_Admin_or_Admin, deleteCreatorDataById);
latestRouter.put('/edit-creator/:id', authlogin, Super_Admin_or_Admin, creatorUpload, editCreatorData);

latestRouter.post('/add-instructor-data', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'profilePic', maxCount: 1 }]), createInstructorData);
latestRouter.get('/get-all-instructors', getInstructorData);
latestRouter.get('/get-instructor-data-by-category/:category', getInstructorDataByCategory);
latestRouter.delete('/delete-instructor-data/:id', authlogin, Super_Admin_or_Admin, deleteInstructorDataById);
latestRouter.put('/edit-instructor/:id', authlogin, Super_Admin_or_Admin, creatorUpload, editInstructorData);

latestRouter.post('/add-our-alumni-data', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]), createOurAlumniData);
latestRouter.get('/get-all-our-alumni-data', getOurAlumniData);
latestRouter.get('/get-our-alumni-data-by-category/category', getOurAlumniDataByCategory);
latestRouter.delete('/delete-our-alumni-data/:id', authlogin, Super_Admin_or_Admin, deleteOurAlumniDataById);
latestRouter.put('/update-our-alumni-data/:id', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]), updateOurAlumniDataById);

latestRouter.post('/add-our-partner-data', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'companyLogo', maxCount: 1 }]), createOurPartenerData);
latestRouter.get('/get-all-our-partner-data', getOurPartenerData);
latestRouter.get('/get-our-partner-data-by-company-name', getOurPartenerDataByCompanyName);
latestRouter.delete('/delete-our-partner-data/:id', authlogin, Super_Admin_or_Admin, deleteOurPartenerDataById);
latestRouter.put('/edit-our-partner-data/:id', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'companyLogo', maxCount: 1 }]), editOurPartenerData);

latestRouter.post('/add-our-team-data', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'profilePic', maxCount: 1 }]), createOurTeamData);
latestRouter.get('/get-all-our-team-data', getOurTeamData);
latestRouter.get('/get-our-team-data-by-member-name', getOurTeamDataByMemberName);
latestRouter.delete('/delete-our-team-data/:id', authlogin, Super_Admin_or_Admin, deleteOurTeamDataById);
latestRouter.put('/edit-our-team-data/:id', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'profilePic', maxCount: 1 }]), editOurTeamData);

latestRouter.post('/add-new-practioners-data', authlogin, Super_Admin_or_Admin, upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]), createPractionersData);
latestRouter.get('/get-all-new-practioners-data', getPractionersData);
latestRouter.get('/get-new-practioners-data-by-category/:category', getPractionersDataByCategory);
latestRouter.delete('/delete-new-practioners-data/:id', authlogin, Super_Admin_or_Admin, deletePractionersDataById);
latestRouter.put('/edit-new-practioners-data/:id', authlogin, Super_Admin_or_Admin, upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]), editPractionersData);

latestRouter.post('/add-student-review-data', authlogin, Super_Admin_or_Admin, upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), createStudentReviewData);
latestRouter.get('/get-all-student-review-data', getStudentReviewData);
latestRouter.get('/get-student-review-data-by-category/:category', getStudentReviewDataByCategory);
latestRouter.delete('/delete-student-review-data/:id', authlogin, Super_Admin_or_Admin, deleteStudentReviewDataById);
latestRouter.put('/edit-student-review-data/:id', authlogin, Super_Admin_or_Admin, upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), editStudentReviewDataById);

latestRouter.post('/add-success-story-data', authlogin, Super_Admin_or_Admin, upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), createSuccessStoryData);

latestRouter.get('/get-all-success-story-data', getSuccessStoryData);
latestRouter.get('/get-success-story-data-by-category/:category', getSuccessStoryDataByCategory);
latestRouter.delete('/delete-success-story-data/:id', authlogin, Super_Admin_or_Admin, deleteSuccessStoryDataById);
latestRouter.put('/edit-success-story-data/:id', authlogin, Super_Admin_or_Admin, upload.fields([
    { name: 'profilePic', maxCount: 1 }
]), editSuccessStoryDataById);

latestRouter.post('/add-all-testimonials', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'reviewVideo', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), createTestimonialsData);
latestRouter.get('/get-all-testimonials', getTestimonialsData);
latestRouter.delete('/delete-testimonials/:id', authlogin, Super_Admin_or_Admin, deleteTestimonialsDataById);
latestRouter.get('/get-testimonials-by-category/category/:category', getTestimonialsDataByCategory);
latestRouter.put('/edit-testimonials/:id', authlogin, Super_Admin_or_Admin, upload.fields([{ name: 'reviewVideo', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]),
    updateTestimonialsData);
 
latestRouter.post('/add-upcoming-batches', authlogin, Super_Admin_or_Admin, createUpcomingBatchData);
latestRouter.get('/get-upcoming-batches', getUpcomingBatchData);
latestRouter.delete('/delete-upcoming-batches/:id', authlogin, Super_Admin_or_Admin, deleteUpcomingBatchDataById);
latestRouter.get('/get-by-category-upcoming-batches/category/:category', getUpcomingBatchDataByCategory);
latestRouter.get('/get-by-program-upcoming-batches/program/:category/:program', getUpcomingBatchDataByProgram)
latestRouter.put('/update-upcoming-batches/:id', authlogin, Super_Admin_or_Admin, updateUpcomingBatchDataById);


latestRouter.post('/add-common-faq', authlogin, Super_Admin_or_Admin, createFaqData);
latestRouter.get('/get-all-faq', getFaqData);
latestRouter.delete('/delete-faq/:id', authlogin, Super_Admin_or_Admin, deleteFaqDataById);
latestRouter.put('/edit-faq/:id', authlogin, Super_Admin_or_Admin, editFaqDataById);

latestRouter.post('/add-faq-by-category-data', authlogin, Super_Admin_or_Admin, createFaqByCategoryData);
latestRouter.get('/get-all-faq-by-category-data', getFaqByCategoryData);
latestRouter.delete('/delete-faq-by-category-data/:id', authlogin, Super_Admin_or_Admin, deleteFaqByCategoryDataById);
latestRouter.get('/get-faq-by-category-data/:category', getFaqByCategoryDataByCategory);
latestRouter.put('/edit-faq-by-category-data/:id', authlogin, Super_Admin_or_Admin, editFaqByCategoryDataById);

latestRouter.post('/add-morqueData', authlogin, Super_Admin_or_Admin, createMorqueData);
latestRouter.get('/get-morqueData', getAllMorqueData);
latestRouter.get('/get-morque-data-by-id-morqueData/:id', getMorqueDataById);
latestRouter.get('/get-morque-data-by-category-morqueData/:category', getMorqueDataByCategory);
latestRouter.put('/update-morqueData/:id', authlogin, Super_Admin_or_Admin, updateMorqueData);
latestRouter.delete('/delete-morqueData/:id', authlogin, Super_Admin_or_Admin, deleteMorqueData);

latestRouter.post('/add-hire-from-data', authlogin, Super_Admin_or_Admin, createHireFrom);
latestRouter.get('/get-hire-from', getHireFrom);
latestRouter.get('/getBy-id-hire-from/:id', getHireFromById);
latestRouter.get('/getBy-category-hire-from/:category', getHireFromByCategory);
latestRouter.put('/update-hire-from/:id', authlogin, Super_Admin_or_Admin, updateHireFrom);
latestRouter.delete('/delete-hire-from/:id', authlogin, Super_Admin_or_Admin, deleteHireFrom);

latestRouter.post('/add-technical-highlights', authlogin, Super_Admin_or_Admin, upload.single('technicalHighlightIcon'), createTechnicalHighlight);
latestRouter.get('/get-all-technical-highlights', getAllTechnicalHighlights);
latestRouter.get('/get-by-category-technical-highlights/category/:category', getTechnicalHighlightsByCategory);
latestRouter.delete('/delete-technical-highlights/:id', authlogin, Super_Admin_or_Admin, deleteTechnicalHighlight)
latestRouter.put('/update-technical-highlight/:id', authlogin, Super_Admin_or_Admin, upload.single('technicalHighlightIcon'), updateTechnicalHighlight);

latestRouter.post('/add-tools-covered', authlogin, Super_Admin_or_Admin, upload.single('ToolsCoveredicon'), createToolCovered);
latestRouter.get('/get-tools-covered', getAllToolsCovered);
latestRouter.get('/get-by-category-tools-covered/:category', getToolsCoveredByCategory);
latestRouter.put('/update-tools-covered/:id', authlogin, Super_Admin_or_Admin, upload.single('ToolsCoveredicon'), updateToolCovered);
latestRouter.delete('/delete-tools-covered/:id', authlogin, Super_Admin_or_Admin, deleteToolCovered);


latestRouter.post('/add-broucher', upload.single('brocher'), createBroucher);
latestRouter.get('/get-brouchers', getAllBrouchers);
latestRouter.get('/get-by-broucher-by-id/:id', getBroucherById);
latestRouter.get('/get-by-broucher-by-category/:category', getBroucherByCategory);
latestRouter.delete('/delete-broucher/:id', deleteBroucherById);
latestRouter.put('/update-broucher-by-id/:id', upload.single('brocher'), updateBroucherById);



export default latestRouter;