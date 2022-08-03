// Creates a data source that can be used with typeorm commands.

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { getDataSourceConfig } from './helpers';

const contents = dotenv.config();

const config = new ConfigService(contents);

const options = getDataSourceConfig(config);

export default new DataSource(options);
