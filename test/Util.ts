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

import mock, { MockApplication } from 'egg-mock';
import { Application, Agent } from 'egg';

// wait for milliseconds until ipc finish
export function waitFor(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

// simulate ipc so that agent and app can communicate with each other
export function initIpc(app: MockApplication, milliseconds: number = 10) {
  process.env.SENDMESSAGE_ONE_PROCESS = 'true';
  app.messenger.sendTo(process.pid, 'egg-pids', [ process.pid ]);
  return waitFor(milliseconds);
}

// prepare application for unit test
export async function prepareTestApplication(): Promise<{app: Application, agent: Agent}> {
  const app = mock.app({
    cache: false,
  });
  await app.ready();
  await initIpc(app);
  return {
    app,
    agent: (app as any).agent,
  };
}

export function testClear(app?: Application, agent?: Agent) {
  if (app) {
    (app.messenger as any).close();
    app.close();
  }
  if (agent) {
    (agent.messenger as any).close();
    agent.close();
  }
  mock.restore();
}
