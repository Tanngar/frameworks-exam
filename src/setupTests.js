import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
afterEach(cleanup);

global.questionsTestData = [];