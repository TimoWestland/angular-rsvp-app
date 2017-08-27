import { ENV } from '../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SILENT_REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'ifkAcr9lf995gmdpcJm2sy8A0tGwtGtg',
  CLIENT_DOMAIN: 'timowestland.eu.auth0.com',
  AUDIENCE: 'http://localhost:8083/api/',
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SILENT_REDIRECT: `${ENV.BASE_URI}/silent`,
  SCOPE: 'openid profile',
  NAMESPACE: 'http://myapp.com/roles'
};
