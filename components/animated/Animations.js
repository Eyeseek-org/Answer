import successAnimation from '../../data/successAnimation.json';
import smallLoading from '../../data/smallLoading.json';
import errorAnimation from '../../data/errorAnimation.json';
import skeletonAnimation from '../../data/animations/skeletonAnimation.json';
// Animation configs
export const okAnim = {
  loop: false,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const loadingAnim = {
  loop: true,
  autoplay: true,
  animationData: smallLoading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const errAnim = {
  loop: false,
  autoplay: true,
  animationData: errorAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const skelAnim = {
  loop: true,
  autoplay: true,
  animationData: skeletonAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

