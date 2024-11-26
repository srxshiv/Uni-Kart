import express from 'express' 
import multer from 'multer'

const app = express();

export const upload = multer({dest:'../server/uploads/'})