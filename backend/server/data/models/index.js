// server/data/models/index.js
import mongoose from 'mongoose';
let model = mongoose.model;

import { ServiceSchema } from './service.js';
import { UserSchema } from './user.js';

export const Service = model('service', ServiceSchema);
export const User = model('user', UserSchema);