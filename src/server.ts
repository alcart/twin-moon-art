import 'reflect-metadata';
import {platformServer, renderModuleFactory } from '@angular/platform-server';
import {enableProdMode } from '@angular/core';
import {AppServerModuleNgFactory} from '../dist/ngfactory/src/app/app-server.module.ngfactory'
import {AppServerModule} from './app/server.module';

import {routes} from './server.routes'

import {join} from 'path'
import {readFileSync} from 'fs'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'
import * as localPasport from 'passport-local'
import * as session from 'express-session'
import * as md from 'mongodb'
let MongoClient = md.MongoClient,
      PORT = process.env.PORT || 3000,
      app = express();

enableProdMode();

app.use(bodyParser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: "Weliveforartandwemadeitforfun",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
