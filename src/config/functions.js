import {
  HIGH,
  MID,
  LOW,
  RATINGS,
} from './constants';

export const getColorStatus = score => {
  if (score > 90) {
    return HIGH;
  } else if (score >= 50 && score <= 90) {
    return MID;
  } else if (score < 50) {
    return LOW;
  } else {
    return null;
  }
};

export const showAsPassed = audit => {
  switch (audit.scoreDisplayMode) {
  case 'manual':
  case 'notApplicable':
    return true;
  case 'error':
  case 'informative':
    return false;
  case 'numeric':
  case 'binary':
  default:
    return Number(audit.score) >= RATINGS.PASS.minScore;
  }
};
