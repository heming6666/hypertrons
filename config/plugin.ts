// Copyright 2019 Xlab
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { EggPlugin } from 'egg';
import { join } from 'path';

const plugin: EggPlugin = {
  event: {
    enable: true,
    path: join(__dirname, '../app/plugin/event-manager'),
  },

  sched: {
    enable: true,
    path: join(__dirname, '../app/plugin/scheduler-manager'),
  },

  installation: {
    enable: true,
    path: join(__dirname, '../app/plugin/installation-manager'),
  },

  githubClient: {
    enable: true,
    path: join(__dirname, '../app/plugin/github-client-manager'),
  },

  githubWebhook: {
    enable: true,
    path: join(__dirname, '../app/plugin/github-webhook-manager'),
  },

  configManager: {
    enable: true,
    path: join(__dirname, '../app/plugin/config-manager'),
  },
};

export default plugin;
