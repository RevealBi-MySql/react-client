import { redirect } from 'react-router-dom';
import Viewer from './viewer/viewer';
import Editor from './editor/editor';

export const routes = [
  { index: true, loader: () => redirect('viewer') },
  { path: 'viewer', element: <Viewer />, text: 'Viewer' },
  { path: 'editor', element: <Editor />, text: 'Editor' }
];
