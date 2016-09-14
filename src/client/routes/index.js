/* eslint-disable spaced-comment */
import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import RequiresAdmin from './utils/RequiresAdmin';
import RequiresAuth from './utils/RequiresAuth';

import AppHandler from '.././components/app/AppHandler';
import LandingPageHandler from '.././components/app/LandingPageHandler';
import NotFoundHandler from '.././components/shared/NotFoundHandler';

import DashboardHandler from '.././components/dashboard/DashboardHandler';
import DashboardView from '.././components/dashboard/DashboardView';
// Collections
import CollectionsIndex from '.././components/collections/CollectionsIndex';
import CollectionsShow from '.././components/collections/CollectionsShow';
// Documents
import DocumentsIndex from '.././components/documents/DocumentsIndex';
import DocumentsNew from '.././components/documents/DocumentsNew';
import DocumentsNewChooseTemplateView from '.././components/documents/DocumentsNewChooseTemplateView';
import DocumentsNewEditorView from '.././components/documents/DocumentsNewEditorView';
// Templates
import TemplatesIndex from '.././components/templates/TemplatesIndex';
import TemplatesEdit from '.././components/templates/TemplatesEdit';
// Profile Settings
import ProfileSettings from '.././components/user/ProfileSettings';
// Admin
import Admin from '../components/admin';

// This view is for testing out new components, REMOVE IN PROD
import TestView from '../components/test/TestView';

import DocumentSigning from '../views/DocumentSigning';
import Login from '../views/Login';
import Registration from '../views/Registration';

const routes = (
  <Route component={AppHandler} path='/'>
    <Redirect from='dashboard' to='dashboard/collections' />
    <Redirect from='settings' to='dashboard/profile_settings' />
    <Redirect from='profile' to='dashboard/profile_settings' />
    <IndexRoute component={LandingPageHandler} />

    {/*********** Email Signature Route ************/}
    <Route component={DocumentSigning} path='sign_document/:id/token/:signature_token' />

    {/*********** Auth Routes ************/}
    <Route component={Login} path='login' />
    <Route component={Registration} path='join' />

    {/*********** Protected Routes ************/}
    <Route path='dashboard' component={RequiresAuth(DashboardHandler)}>
      <IndexRoute component={DashboardView} />

      <Route path='collections' component={DashboardView}>
        <IndexRoute component={CollectionsIndex} />
        <Route path=':id' component={CollectionsShow} />
        <Route path=':collection_id/documents/new' component={DocumentsNew}>
          <Route path='choose_template' component={DocumentsNewChooseTemplateView} />
          <Route path=':template_id/add_signers' component={DocumentsNewEditorView} />
        </Route>
      </Route>

      <Route path='documents' component={DashboardView}>
        <IndexRoute component={DocumentsIndex} />
      </Route>

      <Route path='templates' component={DashboardView}>
        <IndexRoute component={TemplatesIndex} />
        <Route path='edit/:id' component={TemplatesEdit} />
      </Route>

      <Route path='profile_settings' component={DashboardView}>
        <IndexRoute component={ProfileSettings} />
      </Route>

      <Route path='admin' component={RequiresAdmin(DashboardView)}>
        <IndexRoute component={Admin} />
      </Route>

      <Route path='test' component={DashboardView}>
        <IndexRoute component={TestView} />
      </Route>
    </Route>

    {/*********** 404 Route ************/}
    <Route component={NotFoundHandler} path='*' />
  </Route>
);

export default routes;
/* eslint-enable spaced-comment */