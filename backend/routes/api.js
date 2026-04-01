const express = require('express');
const router = express.Router();
const { analyze, chat, translate, ocr, evaluate } = require('../controllers/apiController');

router.post('/analyze', analyze);
router.post('/chat', chat);
router.post('/translate', translate);
router.post('/ocr', ocr);
router.post('/admin/evaluate', evaluate);

module.exports = router;
