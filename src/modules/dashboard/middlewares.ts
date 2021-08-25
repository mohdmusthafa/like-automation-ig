import express, { Express } from 'express';
import api from './api'

export default function(app: Express) {
    app.use(express.static(__dirname + '/static'));
    app.use('/api', api)
}