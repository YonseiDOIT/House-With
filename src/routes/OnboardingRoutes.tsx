import { Route } from 'react-router-dom';
import Splash from '../pages/Onboarding/Splash';
import Intro from '../pages/Onboarding/Intro';
import Screen from '../pages/Login/Screen';
import Emailinput from '../pages/Signup/Emailiput';
import Setup from '../pages/Registerprofile/Setup';
import Lifestylepattern from '../pages/Registerprofile/Lifestylepattern';
import Welcome from '../pages/Registerprofile/Welcome';

export const OnboardingRoutes = (
  <>
    <Route path="/" element={<Splash />} />
    <Route path="/intro" element={<Intro />} />
    <Route path="/login" element={<Screen />} />
    <Route path="/emailinput" element={<Emailinput />} />
    <Route path="/setup" element={<Setup />} />
    <Route path="/Lifestylepattern" element={<Lifestylepattern />} />
    <Route path="/welcome" element={<Welcome />} />
  </>
);